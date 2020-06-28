import { Observable } from 'rxjs';
import { Notification, ProjectInfo, Option, ProjectListQuery, CreateProjectPayload, CreateProjectResponse } from '../Types';

export interface ITodoListApi {
    loadNotifications(): Observable<Notification[]>;
    markNotificationsAsSeen(notifications: string[]): Observable<boolean>;

    listProjects(query: ProjectListQuery): Observable<ProjectInfo[]>;
    findProjectById(id: string): Observable<Option<ProjectInfo>>;

    createNewProject(payload: CreateProjectPayload): Observable<CreateProjectResponse>;
    setFavourite(id: string, favourite: boolean);
}