import { createContext } from 'react';
import { IContextProps, IUser } from '../shared/interfaces/common';

export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    avatarSrc: '',
    users: [],
    email: '',
    login: (token: string | undefined, email: string): void => {},
    logout: (): void => {},
    setAvatar: (path: string): void => {},
    addUsers: (users: IUser[]): void => {},
    deleteUser: (user: any): void => {},
    editUser: (user: any): void => {},
    clearUsers: (): void => {},
} as IContextProps);
