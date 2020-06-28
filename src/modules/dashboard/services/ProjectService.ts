import { ProjectInfo, CreateProjectPayload } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { Inject, Injectable } from '@angular/core';
import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import _ from 'lodash';

interface ProjectServiceState {
    projects: ProjectInfo[],
    favourites: any,
    creating: boolean,
    selected: {
        attempted: boolean,
        some: boolean,
        loading: boolean,
        project: ProjectInfo
    }
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
        }
    }
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
        this.api.findProjectById(id).subscribe(result => this.setState(state => ({
            ...state,
            selected: {
                attempted: true,
                loading: false,
                some: result.some,
                project: result.item
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
    selected = this.pick(state => state.selected);
};