import {Component} from "../../core/Component";
import {$} from '../../core/dom'



export class Paginator extends Component{
    constructor($root,options){
        super($root,{
            ...options,
            listeners:['click'],
            useRouterAPI:true
        })

    }

    onClick(ev){
        const target = $(ev.target)
        this.callUserFunction(target.data.role,target)
    }


    init() {
        this.emitter.subscribe('hidePaginator', _=>this.$root.hide())
        this.emitter.subscribe('filesLoaded',(pages)=>{
            if(pages<2) return
            this.$root.show()
            this.detectChanges(pages)
        })
        return super.init();
    }

    destroy() {
        return super.destroy();
    }


    static className = 'paginator'
    static render = true
}
