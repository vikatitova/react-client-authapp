import { useCallback, useState } from 'react';
import { IUser } from '../shared/interfaces/common';

type IUsers = {
    users: IUser[];
    clearUsers(): void;
    addUsers(users: IUser[]): void;
    deleteUser(user: IUser): void;
    editUser(user: IUser): void;
};

export const useUsers = (): IUsers => {
    const [users, setUsers] = useState<IUser[]>([]);

    const clearUsers = useCallback(() => {
        setUsers([]);
    }, []);

    const addUsers = useCallback((usersList) => {
        setUsers((users) => [...users, ...usersList]);
    }, []);

    const deleteUser = useCallback(
        (user: IUser) => {
            const userToRemove: IUser = user;
            setUsers(users.filter((user) => user.id !== userToRemove.id));
        },
        [users]
    );

    const editUser = useCallback(
        (user: IUser) => {
            const userToEdit: IUser = user;
            setUsers(
                users.map((user) =>
                    user.id === userToEdit.id ? userToEdit : user
                )
            );
        },
        [users]
    );

    return { users, addUsers, deleteUser, editUser, clearUsers };
};
