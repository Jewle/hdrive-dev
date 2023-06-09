import {Component} from "../../core/Component";
import {$} from '../../core/dom'
import {fileService} from "../gservices/file.service";
import {filesLoaded, filesPending, observableFilesLoaded} from "../../storage/actions";


export class Search extends Component{
    constructor($root,options){
        super($root,{
            listeners:['click','input'],
            ...options,
            changeDetectionOfReducer:'filesReducer',
            extractFromReducer:'filesToWatch'

        })

    }
    name='search'
    searchQuery = ''
    input=null
    user={}
    onInput({target}){
        this.searchQuery = target.value
    }
    onClick(e){
        const target = $(e.target)
        this.callUserFunction(target.data.role,target)
    }
    async showFunction(target){
        const files =  await fileService.filesICanWatch()
        this.hstore.dispatch(observableFilesLoaded(files))
        this.dropDownOptions.css('toggle', 'dpdn-active')
    }





    searchFunction(target){
        if (!this.searchQuery) return
        fileService.searchFiles(this.searchQuery).
            then(files=>{
                this.hstore.dispatch(filesLoaded(files))
        })
    }

    init() {
        const {user} = this.hstore.getTestState('userReducer')
        this.$root.find('.user-widget').append(user.name)
        this.useState()
        this.dropDownOptions = this.$root.find('.dpdn-options')
        this.input = this.$root.find('input')
        return super.init();
    }

    static className = 'search'
    static routable = false
}


