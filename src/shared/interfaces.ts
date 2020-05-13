export enum AuthPageName {
    LOGIN = '/login',
    SIGNUP = '/signup',
}

export interface IServerConfiguration {
    baseURL: string;
    timeout: number;
    headers: object;
}
