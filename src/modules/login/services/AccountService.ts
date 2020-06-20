import { Injectable, Inject } from "@angular/core";
import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { Service } from 'src/shared/Service';
import { Router } from '@angular/router';
import { AuthResult, RegisterResult } from 'src/modules/server/Types';

type Screen = 'login' | 'register';

interface AccountServiceState {
    screen: Screen,
    loading: boolean,
    loginError: boolean,
    validatingEmail: boolean,
    emailValid: boolean
};

const initialState: AccountServiceState = {
    screen: 'login',
    loading: false,
    loginError: false,
    validatingEmail: false,
    emailValid: false
};

@Injectable()
export class AccountService extends Service<AccountServiceState> {
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

    private submit = (action, process) => payload => {
        this.setState(state => ({
            ...state,
            loading: true
        }));

        action(payload).subscribe((result: AuthResult) => {
            this.setState(state => ({ ...state, loading: false }));
            process(result);

            if (result.success) {
                this.router.navigate(['/dashboard']);
            }
        });
    };

    login = this.submit(
        this.authenticationService.Login,
        (result: AuthResult) => {
            this.setState(state => ({
                ...state,
                loginError: !result.success
            }));
        }
    );

    register = this.submit(
        this.authenticationService.Register,
        (result: RegisterResult) => {}
    );

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
    };

    resetEmailValidation = () => this.setState(state => ({ ...state, emailValid: false}));
}