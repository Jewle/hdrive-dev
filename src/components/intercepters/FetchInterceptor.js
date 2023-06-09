import {authService} from "../start/services/auth.service";
import {Interceptor} from "../../core/Interceptor";

export class FetchInterceptor extends Interceptor{
    authService = authService
    constructor(){
        super()

    }
    capture(req){
        const clone= JSON.parse(JSON.stringify(req))
        if(this.authService.token){
            clone.headers={
                ...clone.headers,
                ...{
                    Authorization:`Bearer ${this.authService.token} `
                }}
        }
        return clone
    }

}
