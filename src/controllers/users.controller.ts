import { IUser } from '../shared/interfaces/common';
import ITransportLayer from '../shared/interfaces/transport-layer.interfaces';
import TransportLayer from '../transport-layer.service';

const transportLayer: ITransportLayer = TransportLayer.getInstance;

export const saveUserController = async (
    name: string,
    age: string
): Promise<IUser[]> => {
    try {
        const { data } = await transportLayer.post('/users', {
            name,
            age,
        });
        return [data];
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};

export const getUsersController = async (query: {
    activePaginationNumber: number;
    usersPerPage: number;
}): Promise<{
    users: IUser[];
    usersCount: number;
}> => {
    try {
        const { activePaginationNumber: pageNumber, usersPerPage } = query;
        const { data } = await transportLayer.get('/users', {
            params: {
                pageNumber,
                usersPerPage,
            },
        });
        return {
            users: data.users,
            usersCount: data.usersCount,
        };
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};

export const getUserController = async ({
    id,
}: {
    id: string;
}): Promise<IUser> => {
    try {
        const { data }: { data: IUser } = await transportLayer.get(
            `/users/${id}`
        );
        return data;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};

export const deleteUserController = async ({
    id,
}: {
    id: string;
}): Promise<IUser> => {
    try {
        const { data }: { data: IUser } = await transportLayer.delete(
            `/users/${id}`
        );
        return data;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};

export const editUserController = async (user: IUser): Promise<IUser> => {
    try {
        const { data }: { data: IUser } = await transportLayer.put(`/users`, {
            ...user,
        });
        return data;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};
