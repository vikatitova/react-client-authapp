import TransportLayer from '../transport-layer.service';
import ITransportLayer from '../shared/interfaces/transport-layer.interfaces';
import { IAuthResponse } from '../shared/interfaces/common';

const transportLayer: ITransportLayer = TransportLayer.getInstance;

export const signupCustomer = async (
    email: string,
    password: string
): Promise<IAuthResponse> => {
    try {
        const { data } = await transportLayer.post('auth/signup', {
            email,
            password,
        });
        return data;
    } catch (err) {
        const { message } = err.data;
        throw new Error(message);
    }
};
