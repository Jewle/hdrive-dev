import {FetchCore} from "../../core/fetch/FetchCore";
import {UrlConstructor} from "../../core/functions/url.constructor";
import copy from "copy-to-clipboard";
import {API_SERVER} from "../../config/main.config";
import {store} from "../../storage/store";


 class FileService {
    STREAMS = {
        getFiles:"getFiles",
        filesICanWatch:"filesICanWatch"
    }
    fetchCore = new FetchCore()
    hstore = store
    getFiles(page){
        const cachedData=this.hstore.getTestState('filesReducer')
        const useCache = page === cachedData?.page
        if (cachedData && cachedData?.files?.length>0 && useCache){
            const {files,pages} = cachedData

            return Promise.resolve({files,pages,cached:true})
        }
        page = page || 1



       return this.fetchCore.get(UrlConstructor.filesUrl('getAll', {page}))
        //    .then(async (data)=>{
        //     const observableFiles = await this.filesICanWatch()
        //     data.files = [...data.files, ...observableFiles]
        //     return data
        // })
    }
    getFile(id){
        const url = UrlConstructor.filesUrl('getOne')
        return this.fetchCore.get(url, {id})
    }
    deleteOne(id){
        return  this.fetchCore.delete(UrlConstructor.filesUrl('delete'), {id})
    }
    switchPublic(id){
       return this.fetchCore.put(UrlConstructor.filesUrl('switchPublic'),{id})
           .then(e=> {
               if (e.isPublic) {
                   copy(UrlConstructor.filesUrl('publicView', {id}))
               }
               return e
           })
    }

    chooseStream =(cb)=>{

        return cb.call(this)
    }

    searchViewers(val,fileId){
        return this.fetchCore.post(API_SERVER+`main/searchviewers`, {val,fileId})
    }

    filesICanWatch(){
        const {filesToWatch:cachedData}=this.hstore.getTestState('filesReducer')
        if (cachedData.length>0){
            return Promise.resolve(cachedData)
        }
        return this.fetchCore.get(API_SERVER+'main/getfilestowatch')
            .then((data)=>{return {
                files:data,
                type:'observable'
            }})
    }

    searchFiles(query){
        if (!query) return  Promise.resolve()
        return this.fetchCore.post(UrlConstructor.filesUrl('searchFiles'),{query})
    }

    editFile(fileId,newTitle){
        return this.fetchCore.put(UrlConstructor.filesUrl('edit'),{fileId,newTitle})
    }
    download(fileId){
        return this.fetchCore.get(UrlConstructor.filesUrl('publicDownload',{id:fileId}))
    }
    preview(fileId){
        return this.fetchCore.get(UrlConstructor.filesUrl('preview'), {id:fileId})
    }



    setViewer(fileId, viewerId){
        return this.fetchCore.put(UrlConstructor.filesUrl('viewer'), {fileId,viewerId})
    }
    removeViewer(fileId,viewerId){
        return this.fetchCore.post(API_SERVER+'main/removeviewer', {fileId,viewerId})
    }
}

export const fileService = new FileService()
