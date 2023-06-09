
import {UrlConstructor} from "./functions/url.constructor";

export class DomListener {
    constructor($root,options){
        this.$root = $root
        this.listeners = options.listeners
        this.useRouterAPI = options.useRouterAPI || false
        this.emitter = options.emitter
    }
    initDomListeners(){
        this.listeners = this.listeners || []
        this.listeners.forEach(l=>{
           if (l){
               const func = 'on'+l[0].toUpperCase()+l.substring(1,l.length)
               const self = this
               if(this[func]){
                   this.$root.on(l,this[func].bind(self))
               }
           }

        })
        // this._testListeners()
    }

    routerDirectivesResolve(){
        if (!this.useRouterAPI) return
        const routerLinks = this.$root.find('[hrouter]')
        if(!routerLinks.$el){
            this.emitter.subscribe('filesLoaded', ()=>{
                this.$root.find('[hrouter]').each(resolveLink)
            })
            return;
        }
        routerLinks.each(resolveLink)
    }

    removeEventListeners(){
     if (this.listeners){
         this.listeners.forEach(l=>{
             this.$root.off(l)
         })
     }
    }
    //like angular
    // _testListeners(){
    //     this.listeners.forEach(l=>{
    //         const type = 'on'+l[0].toUpperCase()
    //         const el = this.$root.find(`[${type}]`)
    //         if(el){
    //             this.newListeners.push({el,type:l,func:el.attr(type)})
    //         }
    //
    //     })
    // }
}

function resolveLink(el) {
    const {url,qParams}= JSON.parse(el.attr('hrouter'))
    const href = UrlConstructor.resolveQueryString(url,qParams)
    el.attr('hrouter',' ')
    el.attr('href',href)
}
