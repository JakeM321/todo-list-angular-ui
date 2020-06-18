import { Observable } from 'rxjs';
import { AuthStatus, AuthResult, RegisterResult, PasswordAuthPayload, OAuthPayload } from '../Types';

export interface IAuthenticationService {
    Status: Observable<AuthStatus>;

    Login(payload: PasswordAuthPayload): Observable<AuthResult>;
    Register(payload: PasswordAuthPayload): Observable<RegisterResult>;

    OAuthLogin(payload: OAuthPayload): Observable<AuthResult>;
    OAuthRegister(payload: OAuthPayload): Observable<RegisterResult>;

    Logout();
}