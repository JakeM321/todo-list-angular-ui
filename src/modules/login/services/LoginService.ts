import { Injectable, Inject } from "@angular/core";
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Service } from 'src/shared/Service';
import { Router } from '@angular/router';

type Screen = 'login' | 'register' | 'register-details';

interface LoginServiceState {
    screen: Screen,
    loading: boolean,
    loginError: boolean,
    validatingEmail: boolean,
    emailValid: boolean
};

const initialState: LoginServiceState = {
    screen: 'login',
    loading: false,
    loginError: false,
    validatingEmail: false,
    emailValid: false
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
    navigate = (screen: Screen) => this.setState(state => ({
        ...state,
        screen
    }));

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

    validateEmail = (email: string) => {
        const validation = this.authenticationService.VerifyAvailability(email);
        this.setState(state => ({ ...state, validatingEmail: true, emailValid: false }));

        validation.subscribe(result => this.setState(state => ({
            ...state,
            validatingEmail: false,
            emailValid: result
        })));

        return validation;
    }
}