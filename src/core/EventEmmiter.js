export class EventEmmiter {
    constructor(){
        this.listeners = {}
    }

    subscribe(event,fn){
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
    }
    emit(event,args){
        event.toString()
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].forEach(fn=>{
            fn(args)
        })
    }
    debounceEmit(event,args,time){
        setTimeout(()=>{
            this.emit(event,args)
        },time)
    }
    vanish(vanishData){
        vanishData.forEach((event)=>{
           delete this.listeners[event]
        })
    }

}
