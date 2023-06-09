import {API_SERVER, CLIENT_URL, PUBLIC_SERVER, SERVER_URL, STATIC_SERVER_DIR} from "../../config/main.config";

export class UrlConstructor {
    static filesUrl (type, data={}){

        const {id,token} = data
        switch (type) {
            case 'getAll':{
                return UrlConstructor.resolveQueryString(API_SERVER+'main/files',{page:data.page})
            }
            case 'delete':{
                return API_SERVER+'main/delete'
            }
            case 'upload':{
                return API_SERVER+'main/upload'
            }
            case 'download':{

                return UrlConstructor.resolveQueryString(API_SERVER+'download/single',{token,id})
            }
            case 'switchPublic':{
                return API_SERVER+'main/switchpublic'
            }
            case 'getOne':{
                return API_SERVER+'main/file'
            }
            case 'publicDownload':{
                return PUBLIC_SERVER+'download/'+id
            }
            case 'imgSrc':{
                return STATIC_SERVER_DIR
            }
            case 'viewer':{
                return API_SERVER+'main/setviewer'
            }
            case 'edit':{
                return API_SERVER+'main/edit'
            }
            case 'publicView':{
                return UrlConstructor.resolveQueryString(CLIENT_URL+'#system/item',{id:data.id})
            }
            case 'searchFiles':{
                return API_SERVER+'main/searchfiles'
            }
            case 'preview':{
                return API_SERVER+'main/preview'
            }
            case 'static':{
                return SERVER_URL+data
            }




        }
    }
    static foldersUrl(type){
        switch (type) {
            case 'getAll': {
                return API_SERVER + 'main/getfolders'
            }
            case 'moveTo':{
                return API_SERVER + 'main/movetofolder'
            }
            case 'content':{
                return API_SERVER + 'main/getfolderscontent'
            }
            case 'create':{
                return API_SERVER+'main/createfolder'
            }
            case 'rename':{
                return API_SERVER+'main/renamefolder'
            }
            case 'delete':{
                return API_SERVER+'main/deletefolder'
            }
            case 'info':{
                return API_SERVER+'main/folderinfo'
            }
        }
    }
    static authUrl(type){
        switch (type) {
            case 'login': {
                return API_SERVER + 'auth/login'
            }
            case 'register': {
                return API_SERVER + 'auth/register'
            }
            case 'isAuth':{
                return API_SERVER+'main/isauth'
            }
        }
    }
    static resolveQueryString = (url,queryParams)=>{
        const arr = []
        if (Object.keys(queryParams).length){
            url = url+'?'
            Object.keys(queryParams).forEach(key=>{
                if(!key && !queryParams[key]) return
                arr.push(key+'='+queryParams[key])
            })
        }
        const resolvedUrl = url + arr.join('&')

        return resolvedUrl
}



}
