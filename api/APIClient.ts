import { APIRequestContext,APIResponse } from '@playwright/test'

export class APIClient {
    constructor(readonly request : APIRequestContext){

    }

    get(endpoint:string):Promise<APIResponse>
    {
       return this.request.get(endpoint);
    }

    post(endpoint:string,data?:Record<string,unknown>):Promise<APIResponse>
    {
        return this.request.post(endpoint,{data})
    }
    put(endpoint:string,data?:Record<string,unknown>):Promise<APIResponse>
    {
        return this.request.put(endpoint,{data})
    }
    delete(endpoint:string,data?:Record<string,unknown>):Promise<APIResponse>{
        return this.request.delete(endpoint,data);
    }
}