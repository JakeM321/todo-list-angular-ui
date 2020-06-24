import { Injectable, Inject } from "@angular/core";
import { TodoListApi } from 'src/modules/server-dependencies-mock/services/TodoListApi';
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Notification } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { filter } from 'rxjs/operators';

interface NotificationServiceState {
    notifications: Notification[]
};

const initialState: NotificationServiceState = {
    notifications: []
};

@Injectable()
export class NotificationService extends Service<NotificationServiceState> {
    constructor(
        @Inject('IAuthenticationSerivce') private authenticationService: IAuthenticationService,
        @Inject('ITodoListApi') private api: TodoListApi,
        @Inject('environment') environment: any
    ) {
        super(initialState, environment);
    }

    initialize = () => this.api.loadNotifications().subscribe(notifications => {
        this.setState(state => ({
            ...state,
            notifications
        }));

        this.authenticationService.websocket.pipe(
            filter(message => message.header === 'notification')
        ).subscribe(({ body }) => {
            const notification = JSON.parse(body);

            this.setState(state => ({
                ...state,
                notifications: [ ...state.notifications, notification ]
            }));
        })
    });

    notifications = this.pick(state => state.notifications);
    unreadCount = this.pick(state => state.notifications.filter(n => ! n.seen ).length);
}