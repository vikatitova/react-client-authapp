import { ISaveUserResponse } from '../shared/interfaces/common';
import ITransportLayer from '../shared/interfaces/transport-layer.interfaces';
import TransportLayer from '../transport-layer.service';

const transportLayer: ITransportLayer = TransportLayer.getInstance;

export const saveUserController = async (
    name: string,
    age: string
): Promise<ISaveUserResponse[]> => {
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

export const getUsersController = async (): Promise<ISaveUserResponse[]> => {
    try {
        const { data } = await transportLayer.get('/users');
        return data.users;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};
