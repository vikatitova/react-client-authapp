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

export const getUsersController = async (): Promise<IUser[]> => {
    try {
        const { data } = await transportLayer.get('/users');
        return data.users;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};

export const getUserController = async (user: IUser): Promise<IUser> => {
    try {
        const { id } = user;
        const { data } = await transportLayer.get(`/users/${id}`);
        return data;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};

export const deleteUserController = async (user: any): Promise<any> => {
    try {
        const { id } = user;
        await transportLayer.delete(`/users/${id}`);
        return user;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};

export const editUserController = async (user: any): Promise<IUser> => {
    try {
        const { data } = await transportLayer.put(`/users`, { ...user });
        return data;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};
