import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { AuthStatus, PasswordAuthPayload, AuthResult, OAuthPayload, RegisterResult, WebsocketMessage, PasswordRegisterPayload } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { delay, share, map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

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

interface LoginResponse extends ApiResponse {
    token: string;
    email: string;
    displayName: string;
};

interface RegisterResponse extends LoginResponse {
    accountAlreadyInUse: boolean;
};

@Injectable()
export class AuthenticationService extends Service<AuthenticationServiceState> implements IAuthenticationService {
    constructor(@Inject('environment') environment, private http: HttpClient, private cookieService: CookieService) {
        super(initialState, environment);
    }

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
    };

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
        }
    }

    private setAuthentication = (response: LoginResponse) => {
        this.setState(state => ({
            ...state,
            status: {
                isAuthenticated: response.valid,
                displayName: response.displayName
            }
        }));

        if (response.valid) {
            this.cookieService.set('token', response.token);
            this.cookieService.set('displayName', response.displayName);
        }
    }

    private processLoginResponse = (request: Observable<LoginResponse>) => {
        request.subscribe(this.setAuthentication);
        return request.pipe(map(({ valid }) => ({ success: valid })));
    }

    SsoRedirectUrl = () => this.http.get<string>('api/auth/oauth-redirect', { responseType: 'text' as 'json' });

    Login = (payload: PasswordAuthPayload) => {
        const request = this.http.post<LoginResponse>('api/auth/email-login', payload).pipe(share());
        return this.processLoginResponse(request);
    }

    Register = (payload: PasswordRegisterPayload) => {
        const request = this.http.post<RegisterResponse>('api/auth/email-register', payload).pipe(share());
        request.subscribe(this.setAuthentication);

        return request.pipe(map(({ valid, accountAlreadyInUse }) => ({ success: valid, accountAlreadyInUse })));
    };

    OAuth = (payload: OAuthPayload) => {
        const request = this.http.post<LoginResponse>(`api/auth/assert`, {}, { params: {
            code: payload.token
        }}).pipe(share());
        return this.processLoginResponse(request);
    }

    VerifyAvailability = (identifier: string) => this.http.get<boolean>(`api/auth/email-availability/${identifier}`).pipe(share());

    Logout = () => {
        this.cookieService.delete('token');
        this.cookieService.delete('displayName');
        this.setState(state => ({ ...state, status: { isAuthenticated: false, displayName: '' }}));
    }

    websocket = new BehaviorSubject<WebsocketMessage>({ header: '', body: ''});
};