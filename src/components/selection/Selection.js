import {Component} from "../../core/Component";
import {$} from "../../core/dom";
import {fileDeleteMany} from "../../storage/actions";

export class Selection extends Component{

    fileIdsToDelete = []
    constructor($root,props) {
        super($root,{
            ...props,
            listeners:['click']});

    }

    onClick({target}){

        this.callUserFunction(target.dataset.role, $(target))
    }
    deleteFunction(target){
        const decision = window.confirm(`Are you sure to delete ${this.fileIdsToDelete.length} selected files`)
        this.hstore.dispatch(fileDeleteMany({ids:this.fileIdsToDelete}))
        this.$root.hide()
    }


    init(){
        this.emitter.subscribe('showSelection', se=>{
            if (se.length>0){
                this.$root.show()
                this.fileIdsToDelete = se
                this.detectChanges(this.fileIdsToDelete.length)
            }
        })
        this.emitter.subscribe('hideSelection',_=>this.$root.hide())
        return super.init()

    }
    name='search'
    static className = 'selection'
    static routable = false
}
