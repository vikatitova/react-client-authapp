import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from './shared/utils';
import ITransportLayer from './shared/interfaces/transport-layer.interfaces';
import { STORAGE_NAME } from './shared/constants';

export default class TransportLayer implements ITransportLayer {
    private instance: AxiosInstance;
    private static _instance: TransportLayer;

    constructor() {
        this.instance = axios.create(config);

        this.instance.interceptors.request.use(function (
            requestConfig: AxiosRequestConfig
        ) {
            const storageItem: any = localStorage.getItem(STORAGE_NAME);
            if (storageItem) {
                const { token } = JSON.parse(storageItem);
                if (token) {
                    requestConfig.headers.Authorization = `Bearer ${token}`;
                }
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
                    localStorage.removeItem(STORAGE_NAME);
                    window.location.replace('/login');
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
