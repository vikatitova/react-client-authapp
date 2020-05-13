import ITransportLayer from '../transport.interface';
import TransportLayer from '../transport-layer.service';

const transportLayer: ITransportLayer = new TransportLayer();

export const loginCustomer = async (
    email: string,
    password: string
): Promise<string> => {
    try {
        const data = await transportLayer.post('auth/login', {
            email,
            password,
        });
        return data.data.message;
    } catch (err) {
        throw new Error(err.data.message);
        console.log(err);
    }
};
