import { Injectable, Inject } from "@angular/core";
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Notification } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { filter, share, shareReplay, distinctUntilChanged, distinct } from 'rxjs/operators';
import { ITodoListApi } from 'src/modules/server/services/ITodoListApi';

interface AppNotificationServiceState {
    notifications: Notification[]
};

const initialState: AppNotificationServiceState = {
    notifications: []
};

@Injectable()
export class AppNotificationService extends Service<AppNotificationServiceState> {
    constructor(
        @Inject('IAuthenticationService') private authenticationService: IAuthenticationService,
        @Inject('ITodoListApi') private api: ITodoListApi,
        @Inject('environment') environment: any
    ) {
        super(initialState, environment);
    }

    initialize = () => {
        this.authenticationService.notificationFeed.pipe(distinct(n => n.id)).subscribe(notification => {
            this.setState(state => ({
                ...state,
                notifications: 
                    state.notifications.map(n => n.id).includes(notification.id) 
                        ? state.notifications 
                        : [ ...state.notifications, notification ]
            }))
        });
    };

    notifications = this.pick(state => state.notifications);
    unseenCount = this.pick(state => state.notifications.filter(n => ! n.seen ).length);

    markAllAsSeen = () => {
        const unseen = this.state.value.notifications.filter(n => ! n.seen).map(n => n.id);

        this.setState(state => ({
            ...state,
            notifications: state.notifications.map(n => ({ ...n, seen: true }))
        }));

        this.api.markNotificationsAsSeen(unseen).subscribe();
    };
}