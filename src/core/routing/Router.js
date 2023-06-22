import {modules} from "../../main.modules";
import {$} from "../dom"
import {hash, queryParams} from "./functions/helpers";
import RouterEvent from "./RouterEvent";
import {UrlConstructor} from "../functions/url.constructor";

export class Router {

    previousModuleRoute = null
    optionsDto = {initialRoute:'hello/start'}
    previousRoute = ''
    prevParamsString = JSON.stringify(queryParams())
    constructor(routes , options ={}){
        this.options = options
        this.routes = routes
        this.modules = modules
        this.currentModule = null
        this.activatedRoute = 'hello/start'
        this.selector = $('#app')


    }

    init(){
        this.options.initialRoute && hash(this.options.initialRoute)
        this.handler()
       window.addEventListener('hashchange', this.handler)

    }
    static get currentRoute(){
        return hash()
    }
//this.modules = array of objects this.previousModuleRoute - strings refers to module route part
    handler = async ()=>{
       try{
           const currentParamsString = JSON.stringify(queryParams())
           this.activatedRoute = hash()
           // console.log(currentParamsString===this.prevParamsString,'Should route stay without changes',this.activatedRoute===this.previousRoute)
           if(currentParamsString!==this.prevParamsString && this.activatedRoute===this.previousRoute){

               RouterEvent.emit('qParamsChanged', {
                   params:queryParams(),
                   prevParams:JSON.parse(this.prevParamsString)
               })
               this.prevParamsString = currentParamsString

           }
           if (this.previousRoute===this.activatedRoute) return
           this.previousRoute = this.activatedRoute
           let {module,component} = this.dispatchRoutes()
           await component.guard()
           this.currentModule = this.modules[module.route]
           this.prevParamsString = JSON.stringify({data:null})
           if ( module.route!==this.previousModuleRoute){
               this.prevParamsString = JSON.stringify({data:null})
               if (this.modules[this.previousModuleRoute]){
                   this.modules[this.previousModuleRoute].remove()
               }
           }
           this.previousModuleRoute = module.route
           if (component){
               this.currentModule.pushRoute(component.route,this.options)
           }


       }
       catch (e) {
            console.warn(e)
           Router.redirect('hello/start')
       }
    }

    dispatchRoutes(){
        const module = this.routes.find(r=>r.route === this.getRouteParts()[0])
        let component = module.childRoutes.find(r=>r.route === this.getRouteParts()[1])

        if(component.redirect) {
            hash(`${module.route}/${component.redirect}`)
            return this
        }
        if(!component.guard || typeof component.guard !== 'function'){
            component.guard = _=>true
        }
        return {module,component}
    }



    getRouteParts(){
        const parts = this.activatedRoute.slice(1).split('/')
        if(parts[1]==='' || !parts[1])parts[1] = '$empty'
        return parts
    }

    manageOptions(options){
        if(Object.keys(options).length===0) return
        options = {...this.optionsDto,...options}

    }
    static redirect(route){
        hash(route)
    }

    static qParams(){
        return queryParams()
    }
    static navigate(url,qParams){
        const currentUrl = !url ? hash() : url
        const currentQueryParams = Router.qParams()
        hash(UrlConstructor.resolveQueryString(currentUrl,{...currentQueryParams,...qParams}))
    }
    static routerLink(url,qParams){
        url = url || window.location.href.split('?')[0]

        const data = {url,qParams}
        return JSON.stringify(data)
    }



}




