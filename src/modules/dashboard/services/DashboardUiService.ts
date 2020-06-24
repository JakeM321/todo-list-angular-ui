import { Injectable, Inject } from "@angular/core";
import { Service } from 'src/shared/Service';

export interface DashboardUiServiceState {
    notificationsOpen: boolean;
};

const initialState: DashboardUiServiceState = {
    notificationsOpen: false
};

@Injectable()
export class DashboardUiService extends Service<DashboardUiServiceState> {
    constructor(
        @Inject('environment') environment: any
    ) {
        super(initialState, environment);
    }

    notificationsOpen = this.pick(state => state.notificationsOpen);

    toggleNotifications = () => this.setState(state => ({ ...state, notificationsOpen: !(state.notificationsOpen) }));
};