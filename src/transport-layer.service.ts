import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from './shared/utils';
import ITransportLayer from './shared/interfaces/transport-layer.interfaces';

export default class TransportLayer implements ITransportLayer {
    private instance: AxiosInstance;
    private static _instance: TransportLayer;

    constructor() {
        this.instance = axios.create(config);

        this.instance.interceptors.request.use(function (
            requestConfig: AxiosRequestConfig
        ) {
            const cookie: string = 'This is cookie';
            if (cookie) {
                requestConfig.headers.Authorization = `Bearer ${cookie}`;
            }
            return requestConfig;
        });

        this.instance.interceptors.response.use(
            (response) => response,
            (data) => {
                const err: any = data.response;
                return new Promise((resolve, reject) => {
                    if (err && err.status === 401) {
                        console.log(
                            'Your session has been expired. Please, login again'
                        );
                    }
                    reject(err);
                });
            }
        );
    }

    static get getInstance(): TransportLayer {
        TransportLayer._instance =
            TransportLayer._instance || new TransportLayer();
        return TransportLayer._instance;
    }

    get(url: string, config?: any): Promise<any> {
        return this.instance.get(url, config);
    }

    post(url: string, data: any, config?: any): Promise<any> {
        return this.instance.post(url, data, config);
    }

    put(url: string, data: any, config?: any): Promise<any> {
        return this.instance.put(url, data, config);
    }

    delete(url: string, config?: any): Promise<any> {
        return this.instance.delete(url, config);
    }
}
