export interface AuthStatus {
    isAuthenticated: boolean;
    displayName: string;
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

export interface WebsocketMessage {
    header: string;
    body: string;
}

export interface Notification {
    id: string;
    header: string;
    body: string;
    isLink: boolean;
    link: string;
    seen: boolean;
}

export interface ProjectInfo {
    id: string;
    title: string;
    colour: string;
    belongsToUser: boolean;
    isFavourite: boolean;
}

export interface ProjectListQuery {
    skip: number;
    take: number;
    favouritesOnly: boolean;
    belongingToUser: boolean;
    filter: string;
}

export interface CreateProjectPayload {
    title: string;
    colour: string;
}

export interface CreateProjectResponse {
    id: string;
}

export interface Option<T> {
    some: boolean;
    item: T;
}