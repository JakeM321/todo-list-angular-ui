import { Observable } from 'rxjs';
import { ProjectInfo, Option, ProjectListQuery, CreateProjectPayload, CreateProjectResponse, ProjectTask, AppUser, CreateTaskPayload, CreateTaskResponse } from '../Types';

export interface ITodoListApi {
    markNotificationsAsSeen(notifications: number[]): Observable<boolean>;

    listProjects(query: ProjectListQuery): Observable<ProjectInfo[]>;
    findProjectById(id: string): Observable<Option<ProjectInfo>>;

    createNewProject(payload: CreateProjectPayload): Observable<CreateProjectResponse>;
    createNewTask(payload: CreateTaskPayload): Observable<CreateTaskResponse>;
    setFavourite(id: string, favourite: boolean);

    listUpcomingTasks(): Observable<ProjectTask[]>;
    listProjectTasks(id: string): Observable<ProjectTask[]>;
    listMembers(id: string): Observable<AppUser[]>;

    markTaskCompletion(projectId: string, taskId: string, completed: boolean);
}