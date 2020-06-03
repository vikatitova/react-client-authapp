export enum AuthPageName {
    LOGIN = '/login',
    SIGNUP = '/signup',
}

export interface IAuthResponse {
    message: string;
    email: string;
    path?: string;
    token?: string | undefined;
}

export interface IRouteProps {
    component: any;
    isAuthenticated: boolean;
    path: string;
    exact: any;
}

export interface IUser {
    name: string;
    age: string;
    id: string;
}

export interface IContextProps {
    token: string | undefined;
    email: string;
    isAuthenticated: boolean;
    avatarSrc: string;
    users: IUser[];
    login(token: string | undefined, email: string): void;
    logout(): void;
    setAvatar(path: string): void;
    addUsers(users: IUser[]): void;
    deleteUser(user: any): void;
    editUser(user: any): void;
    clearUsers(): void;
}
