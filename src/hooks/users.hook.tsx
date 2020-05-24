import { useState, useCallback, useEffect } from 'react';
import { ISaveUserResponse } from '../shared/interfaces/common';

type IUsers = {
    users: ISaveUserResponse[];
    addUsers(users: ISaveUserResponse[]): any;
};

export const useUsers = (): IUsers => {
    const [users, setUsers] = useState<ISaveUserResponse[]>([]);

    const addUsers = useCallback((usersList) => {
        setUsers((users) => [...users, ...usersList]);
    }, []);

    return { users, addUsers };
};
