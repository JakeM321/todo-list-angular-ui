import { Observable } from 'rxjs';
import { Notification, ProjectInfo, Option } from '../Types';

export interface ProjectListQuery {
    skip: number;
    take: number;
    favouritesOnly: boolean;
    belongingToUser: boolean;
    filter: string;
};

export interface ITodoListApi {
    loadNotifications(): Observable<Notification[]>;
    markNotificationsAsSeen(notifications: string[]): Observable<boolean>;

    listProjects(query: ProjectListQuery): Observable<ProjectInfo[]>;
    findProjectById(id: string): Observable<Option<ProjectInfo>>;
};