import { Injectable, Inject } from "@angular/core";
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Notification } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { filter } from 'rxjs/operators';
import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';

interface NotificationServiceState {
    notifications: Notification[]
};

const initialState: NotificationServiceState = {
    notifications: []
};

@Injectable()
export class NotificationService extends Service<NotificationServiceState> {
    constructor(
        @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
        @Inject('ITodoListApi') private api: ITodoListApi,
        @Inject('environment') environment: any
    ) {
        super(initialState, environment);
    }

    initialize = () => {
        const request = this.api.loadNotifications();
        request.subscribe(notifications => {
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

        return request;
    };

    notifications = this.pick(state => state.notifications);
    unseenCount = this.pick(state => state.notifications.filter(n => ! n.seen ).length);

    markAllAsSeen = () => {
        const unseen = this.state.value.notifications.filter(n => ! n.seen).map(n => n.id);

        this.setState(state => ({
            ...state,
            notifications: state.notifications.map(n => ({ ...n, seen: true }))
        }));

        this.api.markNotificationsAsSeen(unseen);
    };
}