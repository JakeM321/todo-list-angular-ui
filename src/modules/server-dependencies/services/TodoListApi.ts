import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';
import { of, Observable } from 'rxjs';
import { ProjectListQuery, CreateProjectPayload, CreateTaskPayload, ProjectInfo, CreateProjectResponse, Option, ProjectTask, CreateTaskResponse, AppUser } from 'src/modules/server/Types';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    listProjects = (query: ProjectListQuery) => this.http.get<ProjectInfo[]>(`api/projects/list`, { params: new HttpParams({
      fromObject: query as unknown as { [param: string]: string }
    })}).pipe(
        share()
    );

    findProjectById = (id: string) => this.http.get<Option<ProjectInfo>>(`api/projects/info?projectId=${id}`).pipe(share());

    createNewProject = (payload: CreateProjectPayload) => this.http.post<CreateProjectResponse>('api/projects/new', payload).pipe(
        share()
    );

    createNewTask = (payload: CreateTaskPayload) => this.http.post<CreateTaskResponse>(`api/projects/tasks/create?projectId=${payload.projectId}`, payload).pipe(
        share(),
        map(response => ({ success: true }))
    );

    setFavourite = (id: string, favourite: boolean) => this.http.patch(`api/projects/set-favourite?projectId=${id}`, { favourite }).subscribe();

    listUpcomingTasks = () => of([]);
    listProjectTasks = (id: string) => this.http.get<ProjectTask[]>(`api/projects/tasks`, { params: new HttpParams({
        fromObject: {
            projectId: id,
            skip: '0',
            take: '50'
        }
    })}).pipe(share());

    listMembers = (id: string) => this.http.get<AppUser[]>(`api/projects/members?projectId=${id}`).pipe(share());

    markTaskCompletion = (projectId: string, taskId: string, completed: boolean) => {};
}