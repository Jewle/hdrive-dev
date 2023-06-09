

class RouterEvent {

    constructor(){
        this.listeners = {}

    }

    subscribe(event,fn){

        this.listeners[event] = this.listeners[event] || []
        if(!this.listeners[event].find(cb=>cb.toString()===fn.toString())){
            this.listeners[event].push(fn)
        }

        const self = this
        const callback = fn

        return {
            unsubscribe(){
                self.listeners[event] = self.listeners[event].filter(listener=>listener.toString()===callback.toString())
                // self.listeners = []
            }
        }
    }
    emit(event,args){
       setTimeout(()=>{
           if (!this.listeners[event]) return
           this.listeners[event].forEach(fn=>{
               fn(args)
           })
           return this
       },100)
    }




}

export default new RouterEvent()
