import {FetchCore} from "../../../core/fetch/FetchCore";
import {UrlConstructor} from "../../../core/functions/url.constructor";

export class FoldersFetchService {
    constructor(){
        this.http = new FetchCore()
    }

   async  getRootFolders(){
        return  await this.http.get(UrlConstructor.foldersUrl('getAll'))

    }
    async getFolderContent(fid){
        return await this.http.get(UrlConstructor.foldersUrl('content'),{folderid:fid})

    }
     moveFileToFolder = async (fileId,folderId,previousFolderId)=>{
        return await this.http.put(UrlConstructor.foldersUrl('moveTo'),{folderId,fileId,previousFolderId})
    }
    async getFolderInfo(folderId){
        return await this.http.get(UrlConstructor.foldersUrl('info'), {id:folderId})
    }
    async createFolder(folderName,fid=undefined){
        return  await this.http.post(UrlConstructor.foldersUrl('create'),{folderName,parentFolder:fid})

    }

    async renameFolder(id,name){
        return  await this.http.put(UrlConstructor.foldersUrl('rename'), {id,name})
    }
    async deleteFolder(id){

        return  await this.http.delete(UrlConstructor.foldersUrl('delete'), {id})
    }
}
