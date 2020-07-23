import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { of, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { AuthStatus, PasswordAuthPayload, AuthResult, OAuthPayload, PasswordRegisterPayload, notificationSchema } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { delay, share, map, shareReplay } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { SignalRManager } from '../utils/SignalRManager';
import { Notification } from 'src/modules/server/Types';
import { object, number } from 'yup';

export interface AuthenticationServiceState {
    status: AuthStatus;
}

const initialState: AuthenticationServiceState = {
    status: {
        isAuthenticated: false,
        displayName: ''
    }
};

interface ApiResponse {
    valid: boolean;
};

interface AuthResponse extends ApiResponse {
    token: string;
    email: string;
    displayName: string;
};

@Injectable()
export class AuthenticationService extends Service<AuthenticationServiceState> implements IAuthenticationService {
    constructor(@Inject('environment') private environment, private http: HttpClient, private cookieService: CookieService) {
        super(initialState, environment);
    }

    private notificationHub: SignalRManager<Notification>;
    notificationFeed = new ReplaySubject<Notification>(1);

    Status = this.pick(state => state.status);

    Initialize = () => {
        const loggedIn = this.cookieService.check('token') && this.cookieService.check('displayName');
        if (loggedIn) {
            this.setState(state => ({
                ...state,
                status: {
                    isAuthenticated: true,
                    displayName: this.cookieService.get('displayName')
                }
            }));

            this.connectNotifications();
        }
    };

    private connectNotifications = () => {
        if (this.notificationHub === undefined) {
            this.notificationHub = new SignalRManager<Notification>(this.environment, this.cookieService);
            this.notificationHub.initialize('notification', notificationSchema);

            this.notificationHub.feed.pipe(shareReplay()).subscribe(value => {
                this.notificationFeed.next(value);
            });
        }
    };

    private requestAuth = (requestBuilder: () => Observable<AuthResponse>) => {
        const request = requestBuilder();
        request.subscribe(response => {
            this.setState(state => ({
                ...state,
                status: {
                    isAuthenticated: response.valid,
                    displayName: response.displayName
                }
            }));

            if (response.valid === true) {
                this.cookieService.set('token', response.token);
                this.cookieService.set('displayName', response.displayName);
    
                this.connectNotifications();
            }
        });

        return request.pipe(map(response => ({ success: response.valid })));
    };

    SsoRedirectUrl = () => this.http.get<string>('api/auth/oauth-redirect', { responseType: 'text' as 'json' });

    Login = (payload: PasswordAuthPayload) => this.requestAuth(() => this.http.post<AuthResponse>('api/auth/email-login', payload).pipe(share()));
    Register = (payload: PasswordRegisterPayload) => this.requestAuth(() => this.http.post<AuthResponse>('api/auth/email-register', payload).pipe(share()));
    
    OAuth = (payload: OAuthPayload) => this.requestAuth(() => this.http.post<AuthResponse>(`api/auth/assert`, {}, { params: {
        code: payload.token
    }}).pipe(share()));

    VerifyAvailability = (identifier: string) => this.http.get<boolean>(`api/auth/email-availability/${identifier}`).pipe(share());

    Logout = () => {
        this.cookieService.delete('token');
        this.cookieService.delete('displayName');

        if (this.notificationHub !== undefined) {
            this.notificationHub.quit();
            this.notificationHub = undefined;
        }

        this.setState(state => ({ ...state, status: { isAuthenticated: false, displayName: '' }}));
    };
};