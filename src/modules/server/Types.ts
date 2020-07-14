import { object, number, string, boolean } from 'yup';

export interface AuthStatus {
    isAuthenticated: boolean;
    displayName: string;
}

export interface AuthResult {
    success: boolean;
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

export interface Notification {
    id: number;
    subject: string;
    message: string;
    isLink: boolean;
    link: string;
    seen: boolean;
}

export const notificationSchema = object({
    id: number().required(),
    subject: string().required(),
    message: string().required(),
    isLink: boolean().required(),
    link: string(),
    seen: boolean().required()
}).unknown();

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

export interface CreateTaskPayload {
    projectId: string;
    name: string;
    description: string;
    assignedTo: AppUser;
}

export interface CreateProjectResponse {
    id: string;
}

export interface CreateTaskResponse {
    success: boolean;
}

export interface AppUser {
    email: string;
    displayName: string;
}

export interface ProjectTaskIdentity {
    id: string;
    projectId: string;
}

export interface ProjectTask extends ProjectTaskIdentity {
    assignedTo: AppUser;
    label: string;
    description: string;
    completed: boolean;
}

export interface Option<T> {
    some: boolean;
    item: T;
}