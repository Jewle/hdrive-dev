


 import {UrlConstructor} from "../../../core/functions/url.constructor";
import {FetchCore} from "../../../core/fetch/FetchCore";

class AuthService  {
    get token(){
        return localStorage.getItem('token')
    }
    async login(email,password){
           return  authFetch('login', {email,password}, this.setToLs)
    }
    get isAuth(){
        const hasToken = !!this.token
        if(!hasToken){
            return Promise.reject(false)
        }
        return new FetchCore().get(UrlConstructor.authUrl('isAuth'))

    }
    logOut(){
        this.setToLs('')

    }
    setToLs(token){
        localStorage.setItem('token',token )

    }
   async register(email,password,name){
        return authFetch('register', {email,password,name}, ()=>{})
    }
}

async function authFetch(type,{email,password,name}, done){
    try{
        const result = await fetch(UrlConstructor.authUrl(type), {
            method:'POST',
            body:JSON.stringify({
                email,password,name
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json = await result.json()
        if(result.ok){
            if(json?.token){
                done(json.token)
            }
            return json.user
        }else {
            throw {status:result.status}
        }
    }
    catch (e) {
        throw e
    }

}


export  const authService = new AuthService()
