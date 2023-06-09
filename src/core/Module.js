import {Loader} from "./Loader";
import {Drive} from "../components/drive/Drive";
import HTMLConverter from "./html-processing/HTMLCoverter";

export class Module {
    constructor(options){
        this.isComponentsLoaded = false
        this.mainComponent = null
        this.routableComponents = []
        this.components = []
        options.components.forEach(component=>{
            if(component.render===false) return
            const current = typeof component === 'object' ? component.mainComponent : component

            const currentArray = current.routable ? this.routableComponents : this.components
            currentArray.push(component)
        })
        this.loader = new Loader({components:this.components})


    }
//holy fuckig shit
    //if components are loaded then resolve with true otherwise return promise which loads static components

   async prepareComponents(){
          if (this.isComponentsLoaded) { return Promise.resolve()}
          const data = await  this.loader.init()
          this.components = this.components.map(c=>{
              if(typeof c ==='object'){
                  this.setHTMLTemplate(c.mainComponent,this.getTemplateObject(data,c.mainComponent))
                  this.setHTMLTemplate(c.child,this.getTemplateObject(data,c.child))
                  return c
              }
              this.setHTMLTemplate(c,this.getTemplateObject(data,c))
              return c
          })
          this.mainComponent = new Drive({components:this.components,selector:'#app'}).initComponents()
          this.isComponentsLoaded = true
    }
    getTemplateObject(data,{className}){

        return data.find(item=>item.name===className)
    }
    setHTMLTemplate(c, template){
        c.prototype.toHTML = HTMLConverter.process(template.HTML,c.className)
        return c
    }
    async pushRoute(route){
        await this.prepareComponents()
        let Component = this.routableComponents.find(e=>{
            const target = typeof e ==='object' ? e.mainComponent : e
            return target.className === route
        })

        if(typeof Component==='object'){
            const data = this.loader.initRoute(Component)
            const mainComponent = this.setHTMLTemplate(Component.mainComponent,await data.mainComponent)
            const child = this.setHTMLTemplate(Component.child,await data.child)
            this.mainComponent.pushRoute({mainComponent,child})
            return
        }

       if (Component){
           const data = await this.loader.initRoute(Component)
           Component = this.setHTMLTemplate(Component, data)
           this.mainComponent.pushRoute(Component)
       }
    }


    remove(){
        this.isComponentsLoaded = false
        if (this.mainComponent){
            this.mainComponent.changeRoute()
        }
    }
}
