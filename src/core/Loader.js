export class Loader {
    constructor(data){

        this.components = data.components || []
    }
    init(){
        let extractComponents = []
        this.components.forEach(e=>{
                if(typeof e === 'object'){
                    extractComponents=[...extractComponents,...[e.mainComponent,e.child]]
                }
                else{
                    extractComponents.push(e)
                }
            })
        const promises = extractComponents.map(Component=>{
                return import(`../components/${Component.className}/${Component.className}.template.js`)
            })
        return Promise.all(promises).then(e=>{
                 return e.map((m,i)=>{
                     m.name=extractComponents[i].className
                     return m
                 })
        })
    }
    initRoute(Component){
        if(typeof Component==='object'){
            return {
                mainComponent:import(`../components/${Component.mainComponent.className}/${Component.mainComponent.className}.template.js`),
                child:import(`../components/${Component.child.className}/${Component.child.className}.template.js`)
            }
                }

            return import(`../components/${Component.className}/${Component.className}.template.js`)

    }


}
