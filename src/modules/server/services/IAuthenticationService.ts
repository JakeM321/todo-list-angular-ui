import { Observable } from 'rxjs';
import { AuthStatus, AuthResult, RegisterResult, PasswordAuthPayload, OAuthPayload, WebsocketMessage } from '../Types';

export interface IAuthenticationService {
    Status: Observable<AuthStatus>;

    Initialize();

    Login(payload: PasswordAuthPayload): Observable<AuthResult>;
    Register(payload: PasswordAuthPayload): Observable<RegisterResult>;

    OAuth(payload: OAuthPayload): Observable<AuthResult>;

    VerifyAvailability(identifier: string): Observable<boolean>;

    Logout();

    websocket: Observable<WebsocketMessage>;
}