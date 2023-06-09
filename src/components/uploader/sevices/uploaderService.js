import {XhrService} from "./xhr.service";
import {UrlConstructor} from "../../../core/functions/url.constructor";

export default  class UploaderService {
    xhrService = new XhrService()

    upload(formData){
        this.xhrService.post(UrlConstructor.filesUrl('upload'), formData)
        return this
    }
    onload(cb){
        this.xhrService.onload(cb)
        return this
    }
    progress(cb){
        return this.xhrService.onprogress(cb)
    }

   showProgress(progressBarNode){
        return (event)=>{
            const percentage = event.loaded/event.total * 100
            progressBarNode.width(percentage + '%')
        }

    }
}
