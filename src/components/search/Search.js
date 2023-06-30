import {Component} from "../../core/Component";
import {$} from '../../core/dom'
import {fileService} from "../gservices/file.service";
import {filesLoaded, filesPending, observableFilesLoaded, switchDisplayType} from "../../storage/actions";


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
    // onChange(e){
    //     const target = $(e.target)
    //     this.callUserFunction(target.data.role,target)
    // }
    // displaytypeFunction(q){
    //     console.log(q.val())
    // }






    searchFunction(target){
        if (!this.searchQuery) return
        fileService.searchFiles(this.searchQuery).
            then(files=>{
                this.hstore.dispatch(filesLoaded(files))
        })
    }

    init() {
        const {user} = this.hstore.getTestState('userReducer')
        const {displayType} = this.hstore.getTestState('filesDisplayReducer')
        this.$root.find(`.display-type option[value=${displayType}]`).attr('selected',displayType)
        console.log(displayType)
        this.$root.find('.user-widget').append(user)
        this.useState()
        this.dropDownOptions = this.$root.find('.dpdn-options')
        this.input = this.$root.find('input')


        this.$root.find('.display-type').on('change', ({target})=>{
            const val = target.value

            this.hstore.dispatch(switchDisplayType(val))
        })


        return super.init();
    }

    static className = 'search'
    static routable = false
}


