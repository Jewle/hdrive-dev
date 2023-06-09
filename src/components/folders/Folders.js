import {Component} from "../../core/Component";
import {FoldersFetchService} from "./services/folders-fetch.service";
import {$} from "../../core/dom";
import {modalCore} from "../../core/ui/modal.core";
import fileModal from "../gservices/file.modal.service";
import {MenuService} from "../gservices/menu.widget/menu.service";
import ErrorHandler from "../../core/errorHandler/errorHandler";
import ContextMenuService from "./services/context-menu.service";
import FElements from "./helpers/folder-elements";
export class Folders extends Component{
    openFolders = []
    fileModal = null
    file={}
    overlay = null
    spinner = null
    menu={}
    name="folders"
    constructor($root, options){
        super($root, {
            ...options,
            listeners:['click','contextmenu','dragstart','drop','dragend']});

        this.folderService = new FoldersFetchService()
    }
    static className = 'folders'
    async onContextmenu(e){
        const $target = $(e.target)
        e.preventDefault()
        this.menuService.run($target)


    }
    onClick(event){
        event.stopPropagation()
        this.menu.off()
        const target = $(event.target)
        this.callUserFunction(target.data.role,target)
        }
     onDragstart(e){
        const fileElement  = $(e.target).style({opacity:'0.3'})
        this.file = {
            fid:fileElement.data.fid,
            folderId:fileElement.data.folderid,
            remove(){
                fileElement.remove()
            },
            $el:fileElement
        }
     }
     onDragEnd(e){
         $(e.target).style({opacity:'1'})
     }
     async onDrop(e){
         const $element = $(e.target)
         if($element.data.role==='folder'){
             if (window.confirm('Do you really want to move file in folder')){
                 await this.folderService.moveFileToFolder(this.file.fid,$element.data.fid,this.file.folderId)
                 const isOpenFolder = !!this.openFolders.find(e=>e.id===$element.data.fid)
                 if(isOpenFolder){
                     $element.find('ul').append(this.file.$el)
                     return
                 }
                 this.file.remove()
             }
         }
     }
    rootfolderFunction(target){
        const name = prompt(`You are creating folder. Please provide the title`)
        this.folderService.createFolder(name).then(({id})=>{
            alert('Folder has been successfully created')
            this.$root.find('.directory-list').prepend(new FElements().folder(id,name))
        })
    }
    async folderFunction(target){
        const currentFolder = this.openFolders.find(e=>e.id===target.data.fid)
        if (currentFolder && !currentFolder?.isEmpty){
           return target.css('toggle', 'active')
        }
        if(currentFolder){
            return
        }
        this.spinner.show()
        this.overlay.show()

        const cnt =  await this.folderService.getFolderContent(target.data.fid)

        this.spinner.hide()
        this.overlay.hide()

        if(!!cnt.html ){
            target.append(new FElements().innerFolderContent(cnt.html)).css('toggle', 'active')

        }
        this.openFolders.push({id:target.data.fid, isEmpty:!cnt.html})
    }
    destroy() {
        this.menu.destroy()
        this.openFolders = []
        this.modal = null
        this.overlay = null
        this.spinner = null
        this.menu={}
        return super.destroy();
    }
    init() {
        this.spinner = this.$root.find('.lds-hourglass')
        this.overlay = this.$root.find('.overlay-forSpinner')
        this.menu = new MenuService('.hmenu')
        fileModal.onEdit = (fileId,newTitle)=>{
            this.$root.find(`[data-fid=${fileId}]`).html(newTitle)
        }
        this.fileModal = fileModal.init(modalCore(), this.$root)
        this.menuService = new ContextMenuService(this.menu,{
            spinner:this.spinner,
            overlay:this.overlay,
            openFolders:[...this.openFolders],
            fileModal:this.fileModal
        })
        this.fetching()
        super.init();
    }
    fetching(){
        this.openFolders = []
        this.detectChanges('')
        return  this.folderService.getRootFolders().then(f=>{
            this.detectChanges(f.html)
        }).catch(ErrorHandler.throwError)
    }
    static routable = true
    static className= 'folders'
}
