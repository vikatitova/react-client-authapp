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
    login(token: string | undefined, email: string): any;
    logout(): any;
    email: string;
    setAvatar(path: string): any;
    isAuthenticated: boolean;
    avatarSrc: string;
    users: IUser[];
    addUsers(users: IUser[]): any;
    deleteUser(user: any): any;
    editUser(user: any): any;
}
