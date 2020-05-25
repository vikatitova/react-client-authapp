import { createContext } from 'react';
import { IContextProps, ISaveUserResponse } from '../shared/interfaces/common';

export const AuthContext = createContext({
    token: '',
    login: (token: string | undefined, email: string): any => {},
    logout: (): any => {},
    email: '',
    setAvatar: (path: string): any => {},
    isAuthenticated: false,
    avatarSrc: '',
    users: [],
    addUsers: (users: ISaveUserResponse[]): any => {},
} as IContextProps);
