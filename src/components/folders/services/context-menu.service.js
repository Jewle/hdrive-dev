import {FoldersFetchService} from "./folders-fetch.service";
import {fileService} from "../../gservices/file.service";
import FElements from "../helpers/folder-elements";

export default class ContextMenuService  {
    folderService = new FoldersFetchService()
    fElements = new FElements()
    constructor(menu,{spinner,overlay,fileModal,openFolders}){
        this.openFolders = openFolders
        this.menu = menu
        this.spinner = spinner
        this.overlay = overlay
        this.fileModal = fileModal

    }
    run(target,params={files:'N'}){
        this.menu.attach(target)
        if(target.data.role==='folder'){
            this.menu.content({
                optionsArray:[{
                    role:'delete',
                    cb :_=>this.deleteFolder(target),
                    title:'Delete'
                },
                    {
                        role:'rename',
                        cb:_=>this.renameFolder(target),
                        title:'Rename'
                    },
                    {
                        role: 'childFolder',
                        cb:_=>this.childFolder(target),
                        title:'Create Folder'
                    },
                    {
                        role: 'folderInfo',
                        cb:(menuItem)=>this.folderInfo(target, menuItem),
                        title:'Get info'
                    }
                ],

            }).init()
            return
        }
        if(target.data.role==='file') {
            this.menu.content({
                optionsArray: [
                    {role:'show', title:'show', cb:_=>this.showFile(target)},
                    {role:'remove', title: 'remove', cb:_=>this.deleteFile(target)},
                    {role:'edit', title:'edit', cb:_=>this.editFile(target)}
                ],

            }).init()



        }
    }
     deleteFolder = (target)=>{
        const {fid} = target.data
        const dec = confirm('Are you sure?')
        dec && this.folderService.deleteFolder(fid)
         target.remove()
    }
     showFile = async (target)=>{
        const {fid} = target.data
        this.spinner.show()
        this.overlay.show()
        this.fileModal.show(fid,'normal')
        this.overlay.hide()
        this.spinner.hide()
    }
     renameFolder = (target)=>{
        const name = prompt('Provide new folders title',target.data.title)
        const id = target.data.fid
        if(!id || !name) return

        this.folderService.renameFolder(id,name)
            .then(_=>{
                alert('Success')
                target.find('.folder-title').html(name)
                target.attr('title', name)
            })
            .catch(e=>console.log(e))
    }
     deleteFile =(target)=> {
        const {fid:id} = target.data
        confirm('Are you sure?') && !fileService.deleteOne(id).then(({msg})=>{
            alert(`File ${msg.fileName} deleted`)
        })
         target.remove()
    }
     childFolder = (target) =>{
        const {fid} = target.data
        const name = prompt(`You are creating folder in ${target.data.title}. Please provide the title`)
        this.folderService.createFolder(name,fid).then(res=>{
            alert('Folder has been successfully created')
            const isClosed = this.openFolders.includes(fid)
            !isClosed && target.find('ul').prepend(this.fElements.folder(res.id,name))
            this.openFolders = this.openFolders.filter(f=>f!==fid)


        })
    }
     editFile = (target)=>{
        const newTitle = prompt('Provide new title for this file')
        const {fid} = target.data
         fileService.editFile(fid,newTitle).then(res=>{
             alert(res.msg)
         })
     }
     folderInfo = async (target, menuItem)=>{
         const {fid} = target.data

         const info = await this.folderService.getFolderInfo(fid)
         alert(`Files: ${info.files}\n Size:${info.size}`)
     }

}
