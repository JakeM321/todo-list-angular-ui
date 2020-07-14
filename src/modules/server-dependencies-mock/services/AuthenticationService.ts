import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { of, BehaviorSubject, ReplaySubject } from 'rxjs';
import { AuthStatus, PasswordAuthPayload, AuthResult, OAuthPayload, Notification } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { delay } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

export interface AuthenticationServiceState {
    status: AuthStatus;
}

const initialState: AuthenticationServiceState = {
    status: {
        isAuthenticated: false,
        displayName: ''
    }
};

@Injectable()
export class AuthenticationService extends Service<AuthenticationServiceState> implements IAuthenticationService {
    constructor(@Inject('environment') environment) {
        super(initialState, environment);
    }
    
    Initialize = () => console.log('Initialized mock authentication service');

    Status = this.pick(state => state.status);

    private setUser = (callback: any) => {
        this.setState(state => ({
            ...state,
            status: {
                isAuthenticated: true,
                displayName: 'John Smith'
            }
        }));

        return callback;
    }

    SsoRedirectUrl = () => of('http://localhost:4200/assert?code=123');

    Login = (payload: PasswordAuthPayload) => this.setUser( of<AuthResult>({ success: true }).pipe(delay(1000)) );
    Register = (payload: PasswordAuthPayload) => this.setUser( of<AuthResult>({ success: true }).pipe(delay(500)) );
    OAuth = (payload: OAuthPayload) => this.setUser( of<AuthResult>({ success: true }).pipe(delay(500)) );

    VerifyAvailability = (identifier: string) => of(true).pipe(delay(500));

    Logout = () => this.setState(state => ({ ...state, status: { isAuthenticated: false, displayName: '' }}));

    notificationFeed = new BehaviorSubject<Notification>({
        id: 1,
        subject: 'You\'re using mock mode!',
        message: 'Mock mode replaces all server dependencies with injected test data, so you can roam around and test the UI without a back-end.',
        isLink: true,
        link: 'github.com/JakeM123',
        seen: false
    });
};