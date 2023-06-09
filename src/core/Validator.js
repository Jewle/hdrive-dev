export class Validator {
    static email(val){

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const status = re.test(String(val).toLowerCase())
        return {status, message: status ? 'Correct':'Incorrect email'}
    }

    static password(val){

        const status = val.length>4 && val.length<9
        return {status, message: status?'Correct':'Incorrect password length'}
    }

    static onlyLowerCase(val){
        const status = val[0]!=='p'
        return {status, message: status? 'Correct':'Another incorrect password.Shit'}
    }
}
