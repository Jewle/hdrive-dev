import {Component} from "../../core/Component";
import {$} from "../../core/dom"
import {authService} from "./services/auth.service";
import {Router} from "../../core/routing/Router";
import {userEntered} from "../../storage/actions";

export class Start extends Component{
    login = ''
    password=''

    auth = authService

    constructor($root,options){

        super($root,{...options, listeners:['submit','click']})
        this.some =3
    }


    onClick(event){

        const target = $(event.target)
        this.callUserFunction(target.data.role,target)


    }
    logFunction(target){
            this.login = this.$root.find('[hinput=login]')
            this.password = this.$root.find('[hinput=password]')
            this.auth.login(this.login.val(),this.password.val())
                .then(e=>{
                    console.log('something went right')
                   this.hstore.dispatch(userEntered(e))
                Router.redirect(`drive/main`)
            })
                .catch(e=>{
                    console.log('something went wrong')
                    this.errorContainer.html(e.message)
                })
                .finally(_=>{
                    this.login.val('')
                    this.password.val('')
                })
    }


    init() {
        this.hstore.clearState()
        this.errorContainer = this.$root.find('div[herror]')
        authService.isAuth.then(auth=>{
            if (auth){
                Router.navigate('drive/main')
            }
        })
        super.init();

    }

    destroy() {
        return super.destroy();
    }

    static className = 'start'
    static routable=true
}
