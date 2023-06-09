import {$} from './dom.js'
import {FormState} from "./FormState";
export class Form extends FormState{
    isValid  = false
    constructor(options={}){
        super()
        this.options = options

    }
    init(settings){
        if (Object.keys(settings).length===0) throw 'No settings provided'
        const fields = settings.fields

        this.inputs = fields.map(({name,validators,initialState})=>{
            validators = validators || []
            const input = this.getInputs(name)
            const errorContainer$ = this.getErrorContainers(name)
            if (initialState){
                input.val(initialState)
            }
            return {
                $el:input,name, validators}

        })

        this.setState(state=>{
            const newState = JSON.parse(JSON.stringify(state))
            newState.data = this.inputs
            return newState

        })
    }



    submit(){
       const values =  this.mapInputs(({name})=>{
            const val = this.extractValue(name)
            return {val,name}
        })
        this.setState(state=>{
            const newState = JSON.parse(JSON.stringify(state))
            newState.data.forEach(item=>{
               newState[data]
           })
        })



    }

    resolveValidators(inputObj){
        inputObj.validators.forEach(item=>{
            item.errors= item.errors || []
            const funcResult = inputObj.validators[item]
            item.errors
        })
    }


    errorHandler(){
        this.clearErrors()
        Object.keys(this.anotherFormState.data).forEach(item=>{
            const field =  this.anotherFormState.data[item] || {}
            const value = field.value
            const validators = field.validators
            if(!validators)return

            validators.forEach(V=>{
                const result = V(value)
                if(result.status){
                    this.anotherFormState.status = 'ok'
                    return
                }


                this.anotherFormState.status = 'no'
                field.errors.push(result.message)
            })
        })
        this.popErrors()
    }

    popErrors(){
        Object.keys(this.anotherFormState.data).forEach(item=>{
            const {name,errors} = this.get(item)
            const $currentErrorContainer = this.inputs.find(i=>i.name===name).errorContainer.$el
            $currentErrorContainer.html(errors[0])

        })
    }


    get(fieldName){
        const field = this.anotherFormState.data[fieldName]
        if(!field) return

        return {name:field.name, errors:field.errors}
    }

    clearErrors(){
        Object.keys(this.anotherFormState.data).
        forEach(item=>this.anotherFormState.data[item].errors=[])
        this.inputs.forEach(i=>i.errorContainer.$el.html(''))
        return
    }

    }


