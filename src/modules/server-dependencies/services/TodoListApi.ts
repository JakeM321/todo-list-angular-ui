import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import { of, Observable } from 'rxjs';
import { ProjectListQuery, CreateProjectPayload, CreateTaskPayload } from 'src/modules/server/Types';
import { HttpClient } from '@angular/common/http';
import { share, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoListApi implements ITodoListApi {
    constructor(private http: HttpClient) {

    }

    markNotificationsAsSeen = (notifications: number[]) => this.http.post('api/notifications/mark-as-seen', notifications).pipe(
        share(),
        map(() => true)
    );

    listProjects = (query: ProjectListQuery) => of([]);
    findProjectById = (id: string) => of({ some: false, item: undefined });

    createNewProject = (payload: CreateProjectPayload) => of({id: '1'});
    createNewTask = (payload: CreateTaskPayload) => of({success: true});
    setFavourite = (id: string, favourite: boolean) => {};

    listUpcomingTasks = () => of([]);
    listProjectTasks = (id: string) => of([]);
    listMembers = (id: string) => of([]);

    markTaskCompletion = (projectId: string, taskId: string, completed: boolean) => {};
}