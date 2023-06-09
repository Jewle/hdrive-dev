import {Component} from "../../core/Component";
import {authService, AuthService} from "../start/services/auth.service";
import {$} from '../../core/dom'
import {Router} from "../../core/routing/Router";
import {observableFilesLoaded} from "../../storage/actions";
export class Menu extends Component{
name='menu'
    authService = authService
    constructor($root,options){
        super($root,{...options,
            listeners:['click'],
        })
    }

    init() {
         super.init();
    }


    onClick(e){
        const target = $(e.target)
        if(target.data.role==='logout'){
            this.authService.logOut()
            this.hstore.clearState()
            Router.redirect('hello/start')
        }

    }


    static className = 'menu'
}
