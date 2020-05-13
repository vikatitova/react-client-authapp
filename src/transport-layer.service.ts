import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { IServerConfiguration } from './shared/interfaces';
import ITransportLayer from './transport.interface';

const config: IServerConfiguration = {
    baseURL: 'http://127.0.0.1:3337',
    timeout: 100000,
    headers: {},
};

export default class TransportLayer implements ITransportLayer {
    private instance: AxiosInstance;

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
