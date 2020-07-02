import { Observable } from 'rxjs';
import { Notification, ProjectInfo, Option, ProjectListQuery, CreateProjectPayload, CreateProjectResponse, ProjectTask } from '../Types';

export interface ITodoListApi {
    loadNotifications(): Observable<Notification[]>;
    markNotificationsAsSeen(notifications: string[]): Observable<boolean>;

    listProjects(query: ProjectListQuery): Observable<ProjectInfo[]>;
    findProjectById(id: string): Observable<Option<ProjectInfo>>;

    createNewProject(payload: CreateProjectPayload): Observable<CreateProjectResponse>;
    setFavourite(id: string, favourite: boolean);

    listUpcomingTasks(): Observable<ProjectTask[]>;
    listProjectTasks(id: string): Observable<ProjectTask[]>;

    markTaskCompletion(projectId: string, taskId: string, completed: boolean);
}