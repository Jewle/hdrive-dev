import {Component} from "../../core/Component";
import {fileService} from "../gservices/file.service";
import {Router} from "../../core/routing/Router";
import {sizeHandler} from "../../core/functions/size-handler";
import {dateHandler} from "../../core/functions/date-handler";
import {$} from '../../core/dom'
import {authService} from "../start/services/auth.service";
import {UrlConstructor} from "../../core/functions/url.constructor";
import {itemFileLoad,itemFilePending} from "../../storage/actions";
import fileModal from "../gservices/file.modal.service";
import {modalCore} from "../../core/ui/modal.core";
export class Item extends Component{
    loading=false
    isError = false
    file={}
    modal=null
    constructor($root, options){
        super($root, {
            ...options,
            changeDetectionOfReducer:'itemReducer',
            extractFromReducer:'file',
            listeners:['click']})
    }
    onClick(event){
        this.callUserFunction(event.target.dataset.role,$(event.target))
    }



    init() {
        const fileId = Router.qParams().id
        this.loading = true
        this.modal = fileModal.init(modalCore(),this.$root,'onlyViewers')
        this.detectChanges({userId:{}}, this.loading,this.isError)
        fileService.getFile(fileId)
            .then(file=>{
                file.size = sizeHandler(file.size)
                file.uploadedAt = dateHandler(file.uploadedAt)
                this.file = file
                this.hstore.dispatch(itemFileLoad({file:this.file,error:false}))
        })
            .catch(_=>{
                console.log('ERROR')
                this.hstore.dispatch(itemFileLoad({file:{data:null},error:true}))

            })

        return super.init();
    }

    downloadFunction(target){
        fileService.download(this.file._id)
            .then(()=>{
                const data  ={id:this.file._id,token:authService.token}
                const url = UrlConstructor.filesUrl('download',data)
                const a = document.createElement('a')
                a.href = url
                a.click()
                a.remove()
            })
    }

    viewersFunction(target){
        this.modal.show(this.file, 'onlyViewers')
    }
    deleteFunction(){
        const decision = confirm(`Do you want to delete ${this.file.originalName}`)
        if(!decision) return
        this.hstore.dispatch(itemFilePending())
        fileService.deleteOne(this.file._id).then(()=>{
            alert('File deleted')
            this.hstore.dispatch(itemFileLoad({file:{data:null},error:false}))
            Router.navigate('drive/main',{})
        })


    }

    destroy() {
        this.hstore.dispatch(itemFileLoad({file:{data:null},error:false}))
        return super.destroy();
    }

    static className = 'item'
    static routable = true
}
