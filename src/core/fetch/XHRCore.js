import {ApplyInterceptors} from "../ApplyInterceptors";


export  class XHRCore extends ApplyInterceptors{
    constructor(props={}){
        super()
        this.props = props
        this.xhr = new XMLHttpRequest()

    }

    post(url,body){
        this.xhr.open('POST', url)
        this.wrapXHR_TEST(this.xhr)
        this.xhr.send(body)
        return this
    }
    get(){

    }

    onload(cb){
        this.xhr.onload = ()=>{
            if (this.xhr.status!==200){
                throw 'Something went wrong'

            }
            cb(this.xhr)
        }
        return this
    }

    onprogress = (cb)=>{
        this.xhr.onprogress = (e)=>{
            if (this.xhr.status!==200){
                throw 'Something went wrong'

            }
            cb(e)
        }
        return this
    }
}
