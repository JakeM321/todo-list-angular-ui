import { Observable } from 'rxjs';
import { Notification } from '../Types';

export interface ITodoListApi {
    loadNotifications(): Observable<Notification[]>;
    markNotificationsAsSeen(notifications: string[]): Observable<boolean>;
};