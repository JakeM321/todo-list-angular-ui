import { Injectable, Inject } from "@angular/core";
import { Service } from 'src/shared/Service';

export interface DashboardUiServiceState {
    notificationsOpen: boolean;
    userMenuOpen: boolean;
    sideMenuOpen: boolean;
};

const initialState: DashboardUiServiceState = {
    notificationsOpen: false,
    userMenuOpen: false,
    sideMenuOpen: true
};

@Injectable()
export class DashboardUiService extends Service<DashboardUiServiceState> {
    constructor(
        @Inject('environment') environment: any
    ) {
        super(initialState, environment);
    }

    notificationsOpen = this.pick(state => state.notificationsOpen);
    toggleNotifications = () => this.setState(state => ({ ...state, notificationsOpen: !state.notificationsOpen }));

    userMenuOpen = this.pick(state => state.userMenuOpen);
    toggleUserMenu = () => this.setState(state => ({ ...state, userMenuOpen: !state.userMenuOpen }));

    sideMenuOpen = this.pick(state => state.sideMenuOpen);
    toggleSideMenu = () => this.setState(state => ({ ...state, sideMenuOpen: !state.sideMenuOpen }));
};