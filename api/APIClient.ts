import { APIRequestContext, APIResponse } from '@playwright/test'
import { Logger } from '../utils/logger'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface APIClientOptions {
    baseURL?: string;
    defaultHeaders?: Record<string, string>;
    authToken?: string;
    enableLogging?: boolean;
}

interface RequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, string>;
    data?: Record<string, unknown>;
}

export class APIClient {
    private logger = new Logger('APIClient');
    private baseURL: string;
    private defaultHeaders: Record<string, string>;
    private authToken?: string;
    private enableLogging: boolean;

    constructor(
        readonly request: APIRequestContext,
        options: APIClientOptions = {}
    ) {
        this.baseURL = options.baseURL || '';
        this.defaultHeaders = options.defaultHeaders || {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.authToken = options.authToken;
        this.enableLogging = options.enableLogging ?? true;
    }

    setAuthToken(token: string): void {
        this.authToken = token;
    }

    setHeader(key: string, value: string): void {
        this.defaultHeaders[key] = value;
    }

    private buildUrl(endpoint: string): string {
        if (endpoint.startsWith('http')) return endpoint;
        return this.baseURL ? `${this.baseURL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}` : endpoint;
    }

    private getHeaders(customHeaders?: Record<string, string>): Record<string, string> {
        const headers = { ...this.defaultHeaders, ...customHeaders };
        if (this.authToken) headers['Authorization'] = `Bearer ${this.authToken}`;
        return headers;
    }

    private log(method: string, url: string, data?: unknown, response?: APIResponse): void {
        if (!this.enableLogging) return;
        if (response) {
            this.logger.info(`${method} ${url} - ${response.status()} ${response.statusText()}`);
        } else {
            this.logger.info(`${method} ${url}`);
            if (data) this.logger.debug(`Request Body: ${JSON.stringify(data, null, 2)}`);
        }
    }

    private async send(method: HttpMethod, endpoint: string, options: RequestOptions = {}): Promise<APIResponse> {
        const url = this.buildUrl(endpoint);
        const headers = this.getHeaders(options.headers);

        this.log(method.toUpperCase(), url, options.data);

        const response = await this.request[method](url, { 
            headers, 
            params: options.params, 
            data: options.data 
        });

        this.log(method.toUpperCase(), url, undefined, response);
        return response;
    }

    get(endpoint: string, options?: { headers?: Record<string, string>; params?: Record<string, string> }) {
        return this.send('get', endpoint, options);
    }

    post(endpoint: string, data?: Record<string, unknown>, options?: { headers?: Record<string, string> }) {
        return this.send('post', endpoint, { ...options, data });
    }

    put(endpoint: string, data?: Record<string, unknown>, options?: { headers?: Record<string, string> }) {
        return this.send('put', endpoint, { ...options, data });
    }

    patch(endpoint: string, data?: Record<string, unknown>, options?: { headers?: Record<string, string> }) {
        return this.send('patch', endpoint, { ...options, data });
    }

    delete(endpoint: string, data?: Record<string, unknown>, options?: { headers?: Record<string, string> }) {
        return this.send('delete', endpoint, { ...options, data });
    }
}