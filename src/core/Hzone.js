import {DomListener} from "./DomListener";

export default class Hzone extends DomListener{
    constructor($root,options){
        super($root,options)
        console.log(this['some'])
        const previousState = {
            counter:this.counter
        }
        const oldEventListener = EventTarget.prototype.addEventListener
        EventTarget.prototype.addEventListener = function(...args){
                console.log(previousState)
                if(previousState.counter!==this.counter){
                    console.log('counter has changed')
                    previousState.counter = this.counter
                }
              oldEventListener.apply(this,args)
        }
    }
}
