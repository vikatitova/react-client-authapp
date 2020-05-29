import { createContext } from 'react';
import { IContextProps, IUser } from '../shared/interfaces/common';

export const AuthContext = createContext({
    token: '',
    login: (token: string | undefined, email: string): any => {},
    logout: (): any => {},
    email: '',
    setAvatar: (path: string): any => {},
    isAuthenticated: false,
    avatarSrc: '',
    users: [],
    addUsers: (users: IUser[]): any => {},
    deleteUser: (user: any): any => {},
    editUser: (user: any): any => {},
} as IContextProps);
