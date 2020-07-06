import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Notification, ProjectInfo, CreateProjectPayload, ProjectListQuery, CreateProjectResponse, ProjectTask, AppUser, CreateTaskPayload, CreateTaskResponse } from 'src/modules/server/Types';
import _ from 'lodash';
import { delay, map } from 'rxjs/operators';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { testProjects, getProjectLookup, TaskLookup, tasks, MemberLookup, members, toPositiveOption, uuidv4, commonUsers, flatten } from './MockData';

@Injectable()
export class TodoListApi implements ITodoListApi {
    constructor(
        @Inject('IAuthenticationService') private authenticationService: IAuthenticationService
    ) {
        this.authenticationService.Status.subscribe(status => { this.user = status.displayName ; console.log('User', status.displayName); });
    }

    private user = '';

    private projectCache = new BehaviorSubject<{projects: ProjectInfo[], lookup: any}>({
        projects: testProjects,
        lookup: getProjectLookup(testProjects)
    });

    private taskCache = new BehaviorSubject<TaskLookup>(tasks);
    private memberCache = new BehaviorSubject<MemberLookup>(members);

    listProjectTasks = (id: string) => of(_.get(this.taskCache.value, id, []));
    listUpcomingTasks = () => of(
        flatten(this.taskCache.value).filter((task: ProjectTask) => 
            task.assignedTo.displayName === this.user
        )
    );

    markTaskCompletion = (projectId: string, taskId: string, completed: boolean) => this.taskCache.next({
        ...this.taskCache.value,
        [ projectId ]: this.taskCache.value[projectId].map(task => {
            if (task.id === taskId) {
                return {  ...task, completed };
            } else {
                return task;
            }
        })
    });

    loadNotifications = (): Observable<Notification[]> => of([{
        id: '1',
        header: 'You\'re using mock mode!',
        body: 'Mock mode replaces all server dependencies with injected test data, so you can roam around and test the UI without a back-end.',
        isLink: true,
        link: 'github.com/JakeM123',
        seen: false
    }]);

    markNotificationsAsSeen = (ids: string[]) => of(true);

    listProjects = (query: ProjectListQuery) => of(
        this.projectCache.value.projects.filter(project => {
            const passesUserFilter = (query.belongingToUser && project.belongsToUser) || !query.belongingToUser;
            const passesFavouritesFilter = (query.favouritesOnly && project.isFavourite) || !query.favouritesOnly;
            const passesQueryString = (query.filter !== '' && project.title.includes(query.filter)) || query.filter === '';

            return passesUserFilter && passesFavouritesFilter && passesQueryString;
        }).splice(query.skip, query.take)
    );

    findProjectById = (id: string) => of(
        _.has(this.projectCache.value.lookup, id) ? toPositiveOption(this.projectCache.value.lookup[id]) : { some: false, item: null }
    ).pipe(delay(500));

    createNewProject = (payload: CreateProjectPayload): Observable<CreateProjectResponse> => {
        const id = uuidv4();

        const project: ProjectInfo = {
            ...payload,
            id,
            belongsToUser: true,
            isFavourite: false
        };

        this.projectCache.next({
            projects: [ ...this.projectCache.value.projects, project ],
            lookup: getProjectLookup([ ...this.projectCache.value.projects, project ])
        });

        this.memberCache.next({
            ...this.memberCache.value,
            [id]: commonUsers
        });

        return of({ id }).pipe(delay(500));
    };

    createNewTask = (payload: CreateTaskPayload): Observable<CreateTaskResponse> => {
        const task: ProjectTask = {
            ...payload,
            id: uuidv4(),
            label: payload.name,
            completed: false
        };

        console.log('New task', task);

        this.taskCache.next({
            ...this.taskCache.value,
            [payload.projectId]: [
                task,
                ...this.taskCache.value[payload.projectId]
            ]
        });

        return of({success: true});
    }

    setFavourite = (id: string, favourite: boolean) => this.projectCache.next({
        ...this.projectCache.value,
        projects: this.projectCache.value.projects.map(p => ({ ...p, isFavourite: p.id === id ? favourite : p.isFavourite }))
    });

    listMembers = (id: string) => of(
        _.get(this.memberCache.value, id, [])
    );
};