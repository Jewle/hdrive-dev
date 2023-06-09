import {FormDOM} from "./FormDOM";


export class FormState extends FormDOM{
    anotherFormState = {data:{}, status:'ok'}
    setState(input){
        if (typeof(input)==='function' ){
            this.anotherFormState = input(this.anotherFormState)
        }
        if (typeof(input) === 'object'){
            this.anotherFormState = {...this.anotherFormState, ...input}
        }
    }
}
