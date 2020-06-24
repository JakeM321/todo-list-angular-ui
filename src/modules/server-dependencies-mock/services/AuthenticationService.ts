import { IAuthenticationService } from 'src/modules/server/services/IAuthenticationService';
import { of, BehaviorSubject } from 'rxjs';
import { AuthStatus, PasswordAuthPayload, AuthResult, OAuthPayload, RegisterResult, WebsocketMessage } from 'src/modules/server/Types';
import { Service } from 'src/shared/Service';
import { delay } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';

export interface AuthenticationServiceState {
    status: AuthStatus;
}

const initialState: AuthenticationServiceState = {
    status: {
        isAuthenticated: true,
        name: {
            first: 'John',
            last: 'Smith'
        }
    }
};

@Injectable()
export class AuthenticationService extends Service<AuthenticationServiceState> implements IAuthenticationService {
    constructor(@Inject('environment') environment) {
        super(initialState, environment);

        console.log('AuthenticationService initialized');

        window['pushWebsocketMessage'] = (payload: {header: string, body: string}) => this.websocket.next(payload);
        window['pushNotification'] = ({ id, header, body }) => this.websocket.next({
            header: 'notification',
            body: JSON.stringify({
                id,
                header,
                body,
                isLink: false,
                link: '',
                seen: false
            })
        });

        console.log('Use pushWebsocketMessage({ header, body }) to inject websocket messages.');
        console.log('Notifications can be pushed with: pushNotification({ header: \'\', body: \'\'})');
    }

    Status = this.pick(state => state.status);

    private setUser = (callback: any) => {
        this.setState(state => ({
            ...state,
            status: {
                isAuthenticated: true,
                name: {
                    first: 'John',
                    last: 'Smith'
                }
            }
        }));

        return callback;
    }

    Login = (payload: PasswordAuthPayload) => this.setUser( of<AuthResult>({ success: true }).pipe(delay(1000)) );
    Register = (payload: PasswordAuthPayload) => this.setUser( of<RegisterResult>({ success: true, accountAlreadyInUse: false }).pipe(delay(500)) );

    OAuth = (payload: OAuthPayload) => this.setUser( of<AuthResult>({ success: true }).pipe(delay(500)) );

    VerifyAvailability = (identifier: string) => of(true).pipe(delay(500));

    Logout = () => this.reset();

    websocket = new BehaviorSubject<WebsocketMessage>({ header: '', body: ''});
};