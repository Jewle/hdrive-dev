import {XHRCore} from "../../../core/fetch/XHRCore";

export class XhrService {
    constructor() {
        this.xhrCore = new XHRCore()
    }

    post(url, body) {
        return this.xhrCore.post(url, body)
    }
    onload(cb){
        return this.xhrCore.onload(cb)
    }

    get onprogress(){
        return this.xhrCore.onprogress
    }
}
