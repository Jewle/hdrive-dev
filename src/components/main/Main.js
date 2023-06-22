import {Component} from "../../core/Component";
import {$} from '../../core/dom'
import {authService} from "../start/services/auth.service";
import {fileService} from "../gservices/file.service";
import {modalCore} from "../../core/ui/modal.core";
import fileModal from "../gservices/file.modal.service";
import ErrorHandler from "../../core/errorHandler/errorHandler";
import {Router} from "../../core/routing/Router";
import RouterEvent from "../../core/routing/RouterEvent";
import {fileDelete, fileEdit, filesLoaded, filesPending} from "../../storage/actions";
import selectionRect from "../../core/ui/selection-rect/selection-rect";
export class Main extends Component{
    name = 'main'
    modal = null
    isLoaded = false
    routerSub=null
    constructor($root,options){
        super($root,{
            ...options,
            listeners:['click','keyup'],
                changeDetectionOfReducer:'filesReducer',
                extractFromReducer:'files'
            },
            )
        this.auth = authService
    }
    onClick(event){
        const target = $(event.target)
        this.callUserFunction(target.data.role, target, ['close-modal','my'])
    }
    init() {
        console.log('Main')
        this.routerSub = RouterEvent.subscribe('qParamsChanged', ({params,prevParams})=>{
            const {page,type} = params
            const {page:prevPage} = prevParams
            console.log(type,page)
           this.hstore.dispatch(filesPending({page}))
           fileService.chooseStream(()=>{
               return type==='observable' ? fileService.filesICanWatch() : fileService.getFiles(page,this.hstore.getState(),false)
           })
               .then(this.mainFetch.bind(this))
            //     .catch(ErrorHandler.throwError)

            // getFiles(page,this.hstore.getState(),false)
            //     .then(this.mainFetch.bind(this))
            //     .catch(ErrorHandler.throwError)
        })
        const {page} = Router.qParams()
        this.hstore.dispatch(filesPending({page}))
        fileModal.onDelete = (fileId)=>{
            this.hstore.dispatch(fileDelete({fileId}))
        }
        fileModal.onEdit = (fileId,newTitle)=>{
            this.hstore.dispatch(fileEdit({fileId,newTitle}))
        }
        this.modal=fileModal.init(modalCore(), this.$root)
        // selectionRect(this.$root.$el,'.file')
        fileService.getFiles((page || 1))
            .then(this.mainFetch.bind(this))
            .catch(ErrorHandler.throwError)
         super.init();
    }
    destroy() {
        this.emitter.emit('hidePaginator',true)
        this.emitter.emit('hideSelection',true)
        this.routerSub.unsubscribe()
        return super.destroy();
    }
    onStateChanged() {

    }

    closeFunction(target){
        const decision = confirm('Do you really want to delete file forever?')
        if(decision){
            fileService.deleteOne(target.data?.id)
                .then(()=>this.hstore.dispatch({fileId:target.data?.id}))
        }
    }
    async showfileFunction(target){
        console.log(target)
        super.removeEventListeners()
        const fileContent = target.closest('.file-content').hide()
        const fileSpinner = target.closest('.file').find('#fileSpinner').show()
        await this.modal.show(target.data.id)

        fileContent.show()
        fileSpinner.hide()
    }
    mainFetch({files,pages}) {

        this.isLoaded = true
        this.emitter.debounceEmit('filesLoaded', pages,500)
        let {page} = Router.qParams()
        page = page || '1'
        this.hstore.dispatch(filesLoaded({files,pages,page}))

    }
    static routable = true
    static className = 'main'
}
