import { Observable } from 'rxjs';
import { AuthStatus, AuthResult, RegisterResult, PasswordAuthPayload, OAuthPayload } from '../Types';

export interface IAuthenticationService {
    Status: Observable<AuthStatus>;

    Login(payload: PasswordAuthPayload): Observable<AuthResult>;
    Register(payload: PasswordAuthPayload): Observable<RegisterResult>;

    OAuth(payload: OAuthPayload): Observable<AuthResult>;

    VerifyAvailability(identifier: string): Observable<boolean>;

    Logout();
}