import { Observable } from 'rxjs';
import { AuthStatus, AuthResult, PasswordAuthPayload, OAuthPayload, Notification } from '../Types';

export interface IAuthenticationService {
    Status: Observable<AuthStatus>;

    Initialize();

    SsoRedirectUrl(): Observable<string>;

    Login(payload: PasswordAuthPayload): Observable<AuthResult>;
    Register(payload: PasswordAuthPayload): Observable<AuthResult>;
    OAuth(payload: OAuthPayload): Observable<AuthResult>;

    VerifyAvailability(identifier: string): Observable<boolean>;

    Logout();

    notificationFeed: Observable<Notification>;
}