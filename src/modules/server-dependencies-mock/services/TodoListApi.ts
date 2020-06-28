import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Notification, ProjectInfo, CreateProjectPayload, ProjectListQuery, CreateProjectResponse } from 'src/modules/server/Types';
import _ from 'lodash';
import { delay, map } from 'rxjs/operators';

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

@Injectable()
export class TodoListApi implements ITodoListApi {
    private cache = new BehaviorSubject<{projects: ProjectInfo[], lookup: any}>({
        projects: testProjects,
        lookup: getProjectLookup(testProjects)
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
        this.cache.value.projects.filter(project => {
            const passesUserFilter = (query.belongingToUser && project.belongsToUser) || !query.belongingToUser;
            const passesFavouritesFilter = (query.favouritesOnly && project.isFavourite) || !query.favouritesOnly;
            const passesQueryString = (query.filter !== '' && project.title.includes(query.filter)) || query.filter === '';

            return passesUserFilter && passesFavouritesFilter && passesQueryString;
        }).splice(query.skip, query.take)
    );

    findProjectById = (id: string) => of(
        _.has(this.cache.value.lookup, id) ? toPositiveOption(this.cache.value.lookup[id]) : { some: false, item: null }
    ).pipe(delay(500));

    createNewProject = (payload: CreateProjectPayload): Observable<CreateProjectResponse> => {
        const id = uuidv4();

        const project: ProjectInfo = {
            ...payload,
            id,
            belongsToUser: true,
            isFavourite: false
        };

        this.cache.next({
            projects: [ ...this.cache.value.projects, project ],
            lookup: getProjectLookup([ ...this.cache.value.projects, project ])
        });

        return of({ id }).pipe(delay(500));
    };

    setFavourite = (id: string, favourite: boolean) => this.cache.next({
        ...this.cache.value,
        projects: this.cache.value.projects.map(p => ({ ...p, isFavourite: p.id === id ? favourite : p.isFavourite }))
    });
};