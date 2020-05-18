import { useState, useCallback, useEffect } from 'react';
import { STORAGE_NAME } from '../shared/constants';

export const useAuth = () => {
    const [token, setToken] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [avatarSrc, setAvatarSrc] = useState<string>('');

    const login: any = useCallback((token: string, email: string) => {
        setToken(token);
        setEmail(email);

        localStorage.setItem(
            STORAGE_NAME,
            JSON.stringify({
                token,
                email,
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken('');
        localStorage.removeItem(STORAGE_NAME);
    }, []);

    const setAvatar: any = useCallback((path: string) => {
        setAvatarSrc(path);

        const storageItem: any = localStorage.getItem(STORAGE_NAME);
        const data = JSON.parse(storageItem);
        data.avatarSrc = path;

        localStorage.setItem(
            STORAGE_NAME,
            JSON.stringify({
                ...data,
            })
        );
    }, []);

    useEffect(() => {
        const storageItem: any = localStorage.getItem(STORAGE_NAME);
        const data = JSON.parse(storageItem);
        if (data && data.token && data.email) {
            login(data.token, data.email);
        }
        if (data && data.avatarSrc) {
            setAvatar(data.avatarSrc);
        }
    }, [login, setAvatar]);

    return { login, logout, token, email, avatarSrc, setAvatar };
};
