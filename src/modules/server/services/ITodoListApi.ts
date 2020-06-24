import { Observable } from 'rxjs';
import { Notification } from '../Types';

export interface ITodoListApi {
    loadNotifications(): Observable<Notification[]>;
    markNotificationsAsRead(notifications: string[]): Observable<boolean>;
};