import TransportLayer from '../transport-layer.service';
import ITransportLayer from '../shared/interfaces/transport-layer.interfaces';

const transportLayer: ITransportLayer = TransportLayer.getInstance;

export const saveCustomerAvatar = async (files: any): Promise<string> => {
    try {
        const { data } = await transportLayer.post('/avatar', files);
        return data.path;
    } catch (err) {
        throw new Error(err);
    }
};
