import { createContext } from 'react';

export const AuthContext = createContext({
    token: '',
    login: (token: string | undefined, email: string): any => {},
    logout: (): any => {},
    email: '',
    setAvatar: (path: string): any => {},
    isAuthenticated: false,
    avatarSrc: '',
});
