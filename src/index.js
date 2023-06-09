
import './template/main.css'

import {Router} from "./core/routing/Router";
import {authService} from "./components/start/services/auth.service";

const routes = [
    {route:'drive',childRoutes:[
        {route:'$empty',redirect:'uploader'},
            {route:'main',guard, additionalComponents:['paginator']},
        {route: 'folders',guard},
        {route:'uploader',guard},
    ], guard},
    {route:'hello',childRoutes:[
     {route:'register'},
            {route:'start'}
]   },
    {route:'system', childRoutes:[
            {route:'item'}
        ]}
]




new Router(routes,{initialRoute: 'drive/main'}).init()








function guard() {
return authService.isAuth
}
function unGuard(){
    return authService.isAuth
}
