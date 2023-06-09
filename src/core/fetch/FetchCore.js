
import {ApplyInterceptors} from "../ApplyInterceptors";

import {requestConstructor} from "./helpers/request-constructor";
import {UrlConstructor} from "../functions/url.constructor";


export class FetchCore extends ApplyInterceptors{


    async get(url,queryParams={}){
        url = this._applyQueryString(url,queryParams)
        return this.wrapFetch(url,requestConstructor('application/json', {}, 'get'))
    }

    async post(url,body,contentType = 'application/json'){
        if(!Object.keys(body).length){ throw 'Fuck you didnt provide body'}
        return this.wrapFetch(url, requestConstructor(contentType,body,'post'))

    }

   async put(url,body,contentType = 'application/json'){
       if(!Object.keys(body).length){ throw 'Fuck you didnt provide body';}
       return this.wrapFetch(url, requestConstructor(contentType,body,'put'))

    }
    async delete(url,body,contentType = 'application/json'){
        if(!Object.keys(body).length){ throw 'Fuck you didnt provide body'}
        return this.wrapFetch(url, requestConstructor(contentType,body,'delete'))
    }

    _applyQueryString = UrlConstructor.resolveQueryString

}
