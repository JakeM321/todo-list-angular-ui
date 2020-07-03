import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Notification, ProjectInfo, CreateProjectPayload, ProjectListQuery, CreateProjectResponse, ProjectTask, AppUser } from 'src/modules/server/Types';
import _ from 'lodash';
import { delay, map } from 'rxjs/operators';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';

const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

const colours = [
    'rgb(211, 13, 211)',
    'rgb(7, 182, 123)',
    'rgb(3, 180, 171)'
];

const getColour = (index: number) => colours[index % colours.length];

const testProjects: ProjectInfo[] = [{
    id: '1',
    title: 'Project 1',
    belongsToUser: true,
    isFavourite: true
}, {
    id: '2',
    title: 'Project 2',
    belongsToUser: true,
    isFavourite: false
}, {
    id: '3',
    title: 'Project 3',
    belongsToUser: false,
    isFavourite: false
}, {
    id: '4',
    title: 'Project 4',
    belongsToUser: false,
    isFavourite: false
}].map((item, index) => ({ ...item, colour: getColour(index) }));

const getProjectLookup = projects => projects.reduce((acc, next) => ({ ...acc, [next.id]: next }), {});
const toPositiveOption = item => ({ some: true, item });

type TaskLookup = { [id: string]: ProjectTask[] };

const tasks: TaskLookup = {
    '1': [{
        id: '1',
        projectId: '1',
        assignedTo: { email: 'john.smith@gmail.com', displayName: 'John Smith' },
        label: 'Task 1',
        description: 'First task',
        completed: false
    }, {
        id: '2',
        projectId: '1',
        assignedTo: { email: 'john.smith@gmail.com', displayName: 'John Smith' },
        label: 'Task 2',
        description: 'Second task',
        completed: false
    }, {
        id: '3',
        projectId: '1',
        assignedTo: { email: 'a.smith@gmail.com', displayName: 'Andrew' },
        label: 'Task 3',
        description: 'Third task',
        completed: false
    }, {
        id: '4',
        projectId: '1',
        assignedTo: { email: 'b.smith@gmail.com', displayName: 'Bill' },
        label: 'Task 4',
        description: 'Another task',
        completed: true
    }],
    '2': [{
        id: '5',
        projectId: '2',
        assignedTo: { email: 'j.smith@gmail.com', displayName: 'James' },
        label: 'Task 5',
        description: 'First task',
        completed: false
    }, {
        id: '6',
        projectId: '2',
        assignedTo: { email: 'j.smith@gmail.com', displayName: 'Josh' },
        label: 'Task 6',
        description: 'Second task',
        completed: false
    }, {
        id: '7',
        projectId: '2',
        assignedTo: { email: 'a.smith@gmail.com', displayName: 'Andrew' },
        label: 'Task 7',
        description: 'Third task',
        completed: false
    }, {
        id: '8',
        projectId: '2',
        assignedTo: { email: 'b.smith@gmail.com', displayName: 'Bob' },
        label: 'Task 8',
        description: 'Another task',
        completed: true
    }],
    '3': [],
    '4': []
};

const flatten = (lookup: TaskLookup): ProjectTask[] => Object.keys(lookup).reduce((acc, next) => [ ...acc, ...lookup[next] ] , []);

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
    }, {
        id: '2',
        header: 'Injecting websocket messages',
        body: 'Did you know that while running this UI in mock mode, you can push notifications to the UI by mocking websocket messages? Open the developer console to find out more!',
        isLink: false,
        link: '',
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

        return of({ id }).pipe(delay(500));
    };

    setFavourite = (id: string, favourite: boolean) => this.projectCache.next({
        ...this.projectCache.value,
        projects: this.projectCache.value.projects.map(p => ({ ...p, isFavourite: p.id === id ? favourite : p.isFavourite }))
    });
};