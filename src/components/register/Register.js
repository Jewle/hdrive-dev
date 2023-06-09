import {Component} from "../../core/Component";
import {Router} from "../../core/routing/Router";
import {authService} from "../start/services/auth.service";
import {$} from "../../core/dom";

export default class Register extends Component{
    constructor($root,options){
        super($root,{...options,listeners:['click']})
    }
    init() {
        return super.init();
    }

    onClick(event){

        const target = $(event.target)
        this.callUserFunction(target.data.role,target)


    }
    auth = authService

    static className = 'register'
    static routable=true

    regFunction(target){
        this.login = this.$root.find('[hinput=login]')
        this.password = this.$root.find('[hinput=password]')
        this.auth.register(this.login.val(),this.password.val(),'John').then(e=>{
            Router.redirect('hello/start')
        })
            .catch(e=>{
                this.errorContainer.html(e.msg)
            })
            .finally(_=>{
                this.password.val('')
            })
    }
}
