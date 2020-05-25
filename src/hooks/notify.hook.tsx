import { useState, useCallback } from 'react';

type INotify = {
    message: string;
    type: string;
    addNotification(message: string, type: string): void;
    show: boolean;
    setShow(show: boolean): void;
};

export const useNotify = (): INotify => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [show, setShow] = useState<boolean>(false);

    const addNotification = useCallback((message: string, type: string) => {
        setMessage(message);
        setType(type);
        setShow(true);
    }, []);

    return { message, type, addNotification, show, setShow };
};
