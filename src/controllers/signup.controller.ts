import TransportLayer from '../transport-layer.service';
import ITransportLayer from '../shared/interfaces/transport-layer.interfaces';
const transportLayer: ITransportLayer = TransportLayer.getInstance;

export const signupCustomer = async (
    email: string,
    password: string
): Promise<string> => {
    try {
        const data = await transportLayer.post('auth/signup', {
            email,
            password,
        });
        return data.data.message;
    } catch (err) {
        throw new Error(err.data.message);
        console.log(err);
    }
};
