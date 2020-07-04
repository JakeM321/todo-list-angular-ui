import { ProjectInfo, CreateProjectPayload, ProjectTask, ProjectTaskIdentity, AppUser } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { Inject, Injectable } from '@angular/core';
import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import _ from 'lodash';
import { combineLatest } from 'rxjs';

interface TaskCache {
    records: ProjectTask[],
    completed: { [id: string]: boolean }
};

const getTaskCache = (tasks: ProjectTask[]): TaskCache => ({
    records: tasks,
    completed: tasks.reduce((acc, next) => ({ ...acc, [next.id]: next.completed }), {})
});

const readTaskCache = (cache: TaskCache): ProjectTask[] => cache.records.map(record => ({
    ...record,
    completed: _.get(cache.completed, record.id, record.completed)
}));

const updateTaskCache = (cache: TaskCache, updates: { [id: string]: boolean }): TaskCache => ({
    ...cache,
    completed: {
        ...cache.completed,
        ...updates
    }
});

interface ProjectServiceState {
    projects: ProjectInfo[],
    favourites: any,
    creating: boolean,
    selected: {
        attempted: boolean,
        some: boolean,
        loading: boolean,
        project: ProjectInfo,
        tasks: TaskCache,
        members: AppUser[]
    },
    upcomingTasks: TaskCache
};

const initialState: ProjectServiceState = {
    projects: [],
    favourites: {},
    creating: false,
    selected: {
        attempted: false,
        some: false,
        loading: false,
        project: {
            id: '',
            title: '',
            colour: '',
            belongsToUser: false,
            isFavourite: false
        },
        tasks: getTaskCache([]),
        members: []
    },
    upcomingTasks: getTaskCache([])
};

@Injectable({
    providedIn: 'root'
})
export class ProjectService extends Service<ProjectServiceState> {
    constructor(
        @Inject('environment') environment: any,
        @Inject('ITodoListApi') private api: ITodoListApi
    ) {
        super(initialState, environment);
    }

    loadPreviewList = () => {
        const request = this.api.listProjects({
            skip: 0,
            take: 20,
            filter: '',
            belongingToUser: false,
            favouritesOnly: false
        });

        request.subscribe(projects => this.setState(state => ({
            ...state,
            projects,
            favourites: projects.reduce((acc, next) => ({ ...acc, [next.id]: next.isFavourite }), {})
        })));
    };

    loadUpcomingTasks = () => {
        const request = this.api.listUpcomingTasks();
        request.subscribe(response => this.setState(state => ({
            ...state,
            upcomingTasks: getTaskCache(response)
        })));
    };

    projects = this.pick(state => state.projects.map(project => ({ ...project, isFavourite: state.favourites[project.id] })));

    toggleFavourite = (id: string) => {
        this.api.setFavourite(id, ! this.state.value.favourites[id]);

        this.setState(state => ({
            ...state,
            favourites: { ...state.favourites, [id]: !state.favourites[id] }
        }));
    };

    openProject = (id: string) => {
        this.setState(state => ({ ...state, selected: { ...state.selected, loading: true }}));
        const projectReq = this.api.findProjectById(id)
        const taskReq = this.api.listProjectTasks(id);
        const membersReq = this.api.listMembers(id);

        combineLatest(projectReq, taskReq, membersReq).subscribe(([project, tasks, members]) => this.setState(state => ({
            ...state,
            selected: {
                attempted: true,
                loading: false,
                some: project.some,
                project: project.item,
                tasks: getTaskCache(tasks),
                members
            }
        })));
    };

    createNewProject = (payload: CreateProjectPayload) => {
        this.setState(state => ({ ...state, creating: true }));
        const request = this.api.createNewProject(payload);
        request.subscribe(() => this.setState(state => ({ ...state, creating: false })));
        return request;
    };

    creating = this.pick(state => state.creating);
    selected = this.pick(state => ({
        ...state.selected,
        tasks: readTaskCache(state.selected.tasks)
    }));

    markTaskCompletion = (isFromUpcomingTasks: boolean, task: ProjectTaskIdentity) => {
        const { id, projectId } = task;
        const cacheToUse = isFromUpcomingTasks ? this.state.value.upcomingTasks.completed :  this.state.value.selected.tasks.completed;
        const toggleValue = ! cacheToUse[id];

        this.api.markTaskCompletion(projectId, id, toggleValue);

        const withCacheUpdate = (source: any, key: string, shouldUpdate: boolean) => shouldUpdate ? ({
            [key]: updateTaskCache(source[key], { [id]: toggleValue })
        }) : {};

        this.setState(state => ({
            ...state,
            ...withCacheUpdate(state, 'upcomingTasks', isFromUpcomingTasks),
            selected: {
                ...state.selected,
                ...withCacheUpdate(state.selected, 'tasks', ! isFromUpcomingTasks)
            }
        }));
    };

    upcomingTasks = this.pick(state => readTaskCache(state.upcomingTasks));

    members = this.pick(state => state.selected.members);
};