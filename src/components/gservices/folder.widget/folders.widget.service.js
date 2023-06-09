
import {FoldersFetchService} from "../../folders/services/folders-fetch.service";
import {HTML} from "./folder.widget.template";
export class FoldersWidgetService {
    folderService = new FoldersFetchService()
    folders = ''
   async init(selector){
        const $element = document.querySelector(selector)
        this.folders = await this.folderService.getRootFolders()
        const html = HTML(this.folders.html)
        $element.innerHTML = html
    }
}
