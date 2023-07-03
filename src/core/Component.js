

import {DomListener} from "./DomListener";
import SelectionLayer from "./SelectionLayer";


export class Component extends SelectionLayer {
    storeSubscribe = null
    constructor($root,options) {
        super($root,options)
        this.changeDetection = options.changeDetection
        this.changeDetectionOfReducer = options.changeDetectionOfReducer
        this.extractFromReducer=options.extractFromReducer
        this.hstore = options.store
    }
    children = []
  toHTML(){

    }
     init(){
        // this.destroy()
        if (this.changeDetectionOfReducer){
            this.hstore.onReducerStateChanged(this.changeDetectionOfReducer,stateItem=>{
                const field = stateItem[this.extractFromReducer]
                const {loading,error} = stateItem
                this.detectChanges(field,loading,error)
                this.onStateChanged()
            })
        }
        this.initDomListeners()
         this.routerDirectivesResolve()
        return this
    }

    callUserFunction(role,target, excpetions =[]){
        if(!role || excpetions.includes(role)) return
        const functionName = role.trim().toLowerCase()+'Function'
        const func = this[functionName]
        if(!func) throw `No function with name ${functionName}`
        if (typeof(func)!=='function') throw `${functionName} is not a function`
        this[functionName].call(this, target)

    }

    detectChanges(changes,...args){
        const componentClassName = this.constructor.className
        const html = this.toHTML(changes,...args)
        const tempNode = document.createElement('div')
        tempNode.insertAdjacentHTML('beforeend',html)
        const changingTempNode = tempNode.querySelector('[hchange]')
        const changedElement =  this.$root.findOne(`[hchange=${componentClassName}]`)



        if(changedElement.$el){
            changedElement.html(changingTempNode.innerHTML)
        }
        tempNode.remove()
    }
    destroy(){
        if (this.storeSubscribe){
            this.storeSubscribe.unsubscribe()
        }
        this.removeEventListeners()
       setTimeout(_=> this.$root.clear(),200)
        // this.emitter.listeners=[]
        if(this.children.length!==0){
            this.children.forEach(comp=>comp.destroy())
            this.children=[]
        }
        this.$root.style({
            'opacity':'0',
            'transition':'0.7s'
        })
        return this
    }

    useState(){

        this.detectChanges(this.hstore.selector(this.changeDetection),true)
    }
    onStateChanged(){
        // throw Error('You have to implement this method in your component')
    }



    static routable = false
}
