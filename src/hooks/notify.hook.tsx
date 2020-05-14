import { useState, useCallback } from 'react';

type INotify = {
    message: string;
    type: string;
    addNotification(message: string, type: string): void;
};

export const useNotify = (): INotify => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');

    const addNotification = useCallback((message: string, type: string) => {
        setMessage(message);
        setType(type);
    }, []);

    return { message, type, addNotification };
};
