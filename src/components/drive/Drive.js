import {$} from '../../core/dom'
import {EventEmmiter} from "../../core/EventEmmiter";
import {fileService} from "../gservices/file.service";

import {store} from '../../storage/store'
export class Drive {
    constructor(initial={}){

        this.components = initial.components || []
        this.selector = $(initial.selector)
        this.routlet = null
        this.options = {
            ...initial.options,
            emitter:new EventEmmiter(),
            store
        }
        this.currentRouteComponent = null

    }

    prepareComponent(Component){

        if(!Component || typeof Component !=='function') return {component:{init:()=>{}},domElement:{}}
        const $root = $.create('div', {classes:Component.className})
        const component = new Component($root, this.options)

        return {component,domElement:$root.html(component.toHTML())}
    }

   root(){
        this.selector.html('')
       this.components =  this.components.flatMap( Component=>{
           let main = null
           let child = null

           if(typeof Component === 'object') {

               main = this.prepareComponent(Component.mainComponent)
               child = this.prepareComponent(Component.child)

               main.component.children.push(child.component)
               const childDomElement = main.domElement.find(`${Component.child.className}-component`).attr('nested','true')

               childDomElement.append(child.domElement)
               this.selector.append(main.domElement)

           }

           const componentObject = this.prepareComponent(Component)
           componentObject.domElement.$el ? this.selector.append(componentObject.domElement) : ''
           return  main && child ? [componentObject.component,main.component,child.component] : componentObject.component

        })


       this.routlet =$.create('router-outlet', {classes:'router'})
       this.selector.append(this.routlet)
       return this.selector


    }

    initComponents(){

       this.root()
        this.components.forEach(c=>c.init())
        return this

    }

    pushRoute(Component){

        this.destroyRoute()
        let main = null
        let child = null

        if (typeof Component==='object' && Component.render!==false){
            main = this.prepareComponent(Component.mainComponent)
            child = this.prepareComponent(Component.child)
            const childDomElement = main.domElement.find(`${Component.child.className}-component`).attr('nested', 'true')
            childDomElement.append(child.domElement)
            this.routlet.append(main.domElement)
            this.currentRouteComponent = main.component
            main.component.init()
            child.component.init()
            main.component.children.push(child.component)
            // console.log('ssearch supposed to be initialized. Here is the' , child.component,main.component)
            return
        }
        const componentObject = this.prepareComponent(Component)
        this.currentRouteComponent = componentObject.component
        this.routlet.append(componentObject.domElement)
        componentObject.component.init()



    }

    destroyRoute(){

       if (this.currentRouteComponent){

           this.currentRouteComponent.destroy()
           this.currentRouteComponent = null
       }
    }
    destroyComponents(){

       if (this.components ){

        if(this.currentRouteComponent)  this.currentRouteComponent.destroy()
           this.currentRouteComponent = null

           this.components.forEach(c=>{
               if(c.destroy) c.destroy()
           })
           this.components = null
           this.routlet.clear()
       }
    }

    changeRoute(){
        this.destroyComponents()
    }


}


