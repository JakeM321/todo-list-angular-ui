import { Injectable, Inject } from "@angular/core";
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Service } from 'src/shared/Service';
import { Router } from '@angular/router';

interface LoginServiceState {
    screen: 'login' | 'register' | 'register-details',
    loading: boolean,
    loginError: boolean
};

const initialState: LoginServiceState = {
    screen: 'login',
    loading: false,
    loginError: false
};

export interface LoginPayload {
    email: string,
    password: string
};

@Injectable()
export class LoginService extends Service<LoginServiceState> {
    constructor(
        @Inject('environment') environment,
        private router: Router,
        @Inject('IAuthenticationService') private authenticationService: IAuthenticationService
    ) {
        super(initialState, environment);
    }

    screen = this.pick(state => state.screen);

    login = (payload: LoginPayload) => {
        this.setState(state => ({
            ...state,
            loading: true
        }));

        this.authenticationService.Login({ ...payload }).subscribe(result => {
            this.setState(state => ({
                ...state,
                loading: false,
                loginError: !result.success
            }));

            if (result.success) {
                this.router.navigate(['/dashboard']);
            }
        })
    };

    loginError = this.pick(state => state.loginError);
}