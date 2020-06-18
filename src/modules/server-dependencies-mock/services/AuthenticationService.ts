import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { of } from 'rxjs';
import { AuthStatus, PasswordAuthPayload, AuthResult, OAuthPayload, RegisterResult } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { delay } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

export interface AuthenticationServiceState {
    status: AuthStatus;
}

const initialState: AuthenticationServiceState = {
    status: {
        isAuthenticated: false,
        name: {
            first: '',
            last: ''
        }
    }
};

@Injectable()
export class AuthenticationService extends Service<AuthenticationServiceState> implements IAuthenticationService {
    constructor(@Inject('environment') environment) {
        super(initialState, environment);

        console.log('AuthenticationService initialized');
    }

    Status = this.pick(state => state.status);

    private setUser = (callback: any) => {
        this.setState(state => ({
            ...state,
            status: {
                isAuthenticated: false,
                name: {
                    first: 'John',
                    last: 'Smith'
                }
            }
        }));

        return callback;
    }

    Login = (payload: PasswordAuthPayload) => this.setUser( of<AuthResult>({ success: false }).pipe(delay(1000)) );
    Register = (payload: PasswordAuthPayload) => this.setUser( of<RegisterResult>({ success: true, accountAlreadyInUse: false }).pipe(delay(500)) );

    OAuthLogin = (payload: OAuthPayload) => this.setUser( of<AuthResult>({ success: true }).pipe(delay(500)) );
    OAuthRegister = (payload: OAuthPayload) => this.setUser( of<RegisterResult>({ success: true, accountAlreadyInUse: false }).pipe(delay(500)) );

    Logout = () => this.reset();
}