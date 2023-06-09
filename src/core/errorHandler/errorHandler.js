import {Router} from "../routing/Router";
import {authService} from "../../components/start/services/auth.service";

export default class ErrorHandler extends Error{
    static throwError(e) {
        if (e.status === 401) {
            console.log('Unauthorized')
            authService.logOut()
            Router.redirect('hello/start')
            return
        }
        authService.logOut()
        Router.redirect('hello/start')
    }
}
