import { AxiosRequestConfig } from 'axios';

export interface IServerConfiguration {
    baseURL: string;
    timeout: number;
    headers: object;
}

export default interface ITransportLayer {
    get(url: string, config?: AxiosRequestConfig): Promise<any>;
    post(url: string, data: any, config?: any): Promise<any>;
    put(url: string, data: any, config?: any): Promise<any>;
    delete(url: string, config?: any): Promise<any>;
}
