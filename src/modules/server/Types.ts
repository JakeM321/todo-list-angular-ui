export interface AuthStatus {
    isAuthenticated: boolean;
    name: {
        first: string;
        last: string;
    }
}

export interface AuthResult {
    success: boolean;
}

export interface RegisterResult extends AuthResult {
    accountAlreadyInUse: boolean;
}

export interface PasswordAuthPayload {
    email: string;
    password: string;
}

export interface PasswordRegisterPayload extends PasswordAuthPayload {
    displayName: string;
}

export interface OAuthPayload {
    token: string;
}