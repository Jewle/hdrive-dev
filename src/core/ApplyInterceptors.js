import {intercepters} from "../interceptors";


export class ApplyInterceptors {

    async wrapFetch(url, req){
        try{
            req = intercepters.capture(req)
            const response  = await fetch(url,req)
            return await response.json()
        }
        catch(e){
            console.log(e)
            throw e
        }

    }
    //Если возникнет проблема мирового масштаба, то скорее всего здесь есть что найти. Мутируем xhr
    async wrapXHR_TEST(xhr){
        const test_token =intercepters.authService.token
        xhr.setRequestHeader('Authorization' , `Bearer ${test_token}`)
    }
}
