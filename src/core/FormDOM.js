import {$} from './dom.js'
export class FormDOM {
    formView = $('form[hform]')
    inputs = []
    constructor(){
        if (!this.formView.isElementGotten){
            throw 'No form element'
        }
        this.formView.disableSubmit()
    }

    getInputs(name){
       return this.formView.find(`input[hinput=${name}]`)
    }
    getErrorContainers(name){
        return this.formView.find(`div[herror=${name}]`)
    }
    extractValue(inputName){
       const candidate = this.provideInput(inputName) || {}
       return candidate.$el.val()
    }
    provideInput(inputName){
        return this.inputs.find(i=>i.name===inputName)
    }
    mapInputs(fn){
        return this.inputs.map(fn)
    }
}
