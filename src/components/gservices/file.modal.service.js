import {SERVER_URL} from "../../config/main.config";
import {fileService} from "./file.service";
import {Router} from "../../core/routing/Router";
import {UrlConstructor} from "../../core/functions/url.constructor";
import {authService} from "../start/services/auth.service";
import {sizeHandler} from "../../core/functions/size-handler";
import {dateHandler} from "../../core/functions/date-handler";

 class FileModal{
    modalObject = {}
    $root = {}
    // modes={
    //
    // }
    mode='preview'
     constructor(){
        this.modes={
            normal:this._normalMode,
            onlyViewers:this._onlyViewersMode,
            preview:this._previewMode
        }
     }
     onDelete = new Function()
     onEdit = new Function()

     init(modalObject,root,mode='normal'){
         this.modalObject = modalObject
         this.mode = mode
         this.$root = root
         return this
     }

      switchPublic = (fileId)=>{
         return (target,spinner)=>{
             spinner.style.display = 'block'
             fileService.switchPublic(fileId)
                 .then(e=>{
                     if(e.msg){
                         alert(e.msg)
                         e.isPublic ? target.innerHTML = 'Make Private': target.innerHTML = "Make Public"
                         spinner.style.display='none'
                     }
                 })
         }


     }



     delete(fileid, title){
        return (_,spinner)=> {
            spinner.style.display='block'
            fileService.deleteOne(fileid)
                .then(e => {
                    alert(`File ${title} has been deleted`)
                    spinner.style.display='none'
                    if (typeof this.onDelete === 'function') {
                        this.onDelete(fileid)
                    }
                    this.modalObject.close()
                })
                .catch(_ => alert('Some errors occur'))
        }
     }

     _applyViewer(fileId){
        return (target,spinner)=> {
            spinner.style.display='block'
            const viewerId = target.dataset.id
            target.parentNode.classList.add('obs')
            target.innerHTML = '&times;'
            target.setAttribute('data-mevent','removeViewer')
            return  fileService.setViewer(fileId, viewerId).then(_=>{
                alert('Now this user can see the file')
                spinner.style.display='none'
            })
        }
     }
     _removerViewer(fileId){
        return (target,spinner)=>{
            spinner.style.display='block'
            const viewerId = target.dataset.id
            target.parentNode.classList.remove('obs')
            target.innerHTML = 'OK'
            target.setAttribute('data-mevent','setViewer')
            return  fileService.removeViewer(fileId, viewerId).then(_=>{
                alert('Now this user cannot see the file')
                spinner.style.display='none'
            })
        }
     }
     _download(id){

        const data  ={id,token:authService.token}
        const url = UrlConstructor.filesUrl('download',data)
        const a = document.createElement('a')
        a.href = url
        a.click()
        a.remove()
     }

     _searchUsers(fileId){
        return (value,searchBox)=>{
            if(!value) {searchBox.innerHTML = ''; return }
           const timerId =  setTimeout(async _=>{
                let users = await fileService.searchViewers(value,fileId)
                this.modalObject.showViewers(users,searchBox)

            },500)
        }

     }

     _newTab(fileId){
       return  ()=> {
           Router.redirect(`system/item?id=${fileId}`)
       }
     }
     _editFile(fileId){
        let isEditing = false
        let input = null
        let titleRef = null
        let btn = null
        return (target,overlay)=>{
             input = !input ? document.createElement('input') : input
            if (isEditing){
                overlay.style.display = 'block'
                return fileService.editFile(fileId,input.value)
                    .then(_=>{
                        overlay.style.display = 'none'
                        titleRef ?  titleRef.innerHTML = input.value : false
                        this.onEdit(fileId,input.value)
                    })
            }
            isEditing = true


            titleRef = target.closest('.modal-header').querySelector('.modal-title')
            btn = target.closest('.modal-header').querySelector('.btn')
            const oldTitle = titleRef.innerHTML

            input.classList.add('invisible-input')
            input.value = oldTitle
            titleRef.innerHTML=''
            titleRef.append(input)
            input.focus()
            btn.innerHTML='Save'

            input.addEventListener('blur', function listener(){
                   titleRef.innerHTML = oldTitle
                   btn.innerHTML ='Edit'
                   setTimeout(_=>isEditing = false,500)
               })


        }
     }
     _preview(fileId) {
        return (target,overlay,modalTemplate)=>{
            overlay.style.display = 'block'
            const modalBody= modalTemplate.querySelector('.modal-body .des')

            const img = document.createElement('img')
            fileService.preview(fileId).then(({uri:data})=>{
                img.src = data
                img.classList.add('preview-img')
                modalBody.prepend(img)
                overlay.style.display='none'
            })
                .catch(errorData=>{

                })

        }
     }


     _normalMode = async (fileId)=>{
         const currentFile =await fileService.getFile(fileId)
         this.modalObject.buttons([
             {title:'delete', event:'delete', className:"delete btn btn-danger", dataAttrs:[{k:'mevent',v:'delete'}], callback:this.delete(fileId, currentFile.originalName)},
             {title: currentFile.isPublic ? 'Make private' : 'Make public',callback:this.switchPublic(fileId), event:'switchPublic', className:"switch btn btn-primary", dataAttrs:[{k:'mevent',v:'switchPublic'},{k:'id', v:currentFile._id}]},
             {title:'download', event:'download', className:'download btn btn-success', callback:()=>{this._download(fileId)}, dataAttrs:[{k:'mevent',v:'download'}, {k:'id', v:currentFile._id}]},
             {title:'', hidden:true, event:'setViewer', className:'', callback:this._applyViewer(fileId), dataAttrs:[{}]},
             {title:'', hidden:true, event:'removeViewer', className:'', callback:this._removerViewer(fileId), dataAttrs:[{}]}
         ])
         this.modalObject.setData({fileId, mode:'normal'})
         this.modalObject.dataList([
             {title: 'Size: '+sizeHandler(currentFile.size), className:''},
             {title:`Date: ${dateHandler(currentFile.uploadedAt)}`,className: ''}
         ])
         this.modalObject.addBodyButtons([
             {title:'Open in new tab', event:'tab', className:'file-viewer btn btn-primary', callback:this._newTab(fileId), dataAttrs:[{k:'mevent',v:'tab'}]},

         ])
         this.modalObject.imgSrc(SERVER_URL+currentFile.imgSrc)
         this.modalObject.modalTitleProvide(currentFile.originalName)
         this.modalObject.provideSearchField({type:'text', className:'search-users', callback:this._searchUsers(fileId)})
         this.modalObject.addHeaderButtons([
             {title:'Edit', event:'edit', className:"btn btn-primary", dataAttrs:[{k:'mevent',v:'edit'}], callback:this._editFile(fileId)}
         ])
         this.modalObject.init(this.$root.$el)
     }
     _onlyViewersMode = async (file)=>{

         this.modalObject.modalTitleProvide(file.originalName)
         this.modalObject.buttons([
             {title:'', hidden:true, event:'setViewer', className:'', callback:this._applyViewer(file._id), dataAttrs:[{}]},
             {title:'', hidden:true, event:'removeViewer', className:'', callback:this._removerViewer(file._id), dataAttrs:[{}]},
         ])

         if (file.type==='docx' || file.type==='doc' || file.type.search('document')!==-1){
             this.modalObject.addButtons(
               [  {title:'Preview',
                     hidden:false,
                     event:'preview',
                     className:'btn btn-primary',
                     callback:this._preview(file._id),
                     dataAttrs:[{k:'mevent',v:'preview'}]
                 }]
             )
         }
         this.modalObject.provideSearchField({type:'text', className:'search-users', callback:this._searchUsers(file._d)})
         this.modalObject.init(this.$root.$el)
 }
     _previewMode = async (fileId)=>{
        console.log('preview')
         const currentFile =await fileService.getFile(fileId)
         this.modalObject.buttons([
             {
                 title:'download',
                 event:'download',
                 className:'download btn btn-success',
                 callback:()=>{this._download(fileId)},
                 dataAttrs:[
                     {k:'mevent',v:'download'},
                     {k:'id', v:currentFile._id}]},
         ])
         this.modalObject.setData({fileId, mode:'preview'})
         this.modalObject.dataList([
             {title:'Size: '+sizeHandler(currentFile.size), className:'file-modal-size'},
             {title:`Date: ${dateHandler(currentFile.uploadedAt)}`,className: 'file-modal-date'}
         ])
         this.modalObject.addBodyButtons([
             {title:'Open in new tab', event:'tab', className:'file-viewer btn btn-primary', callback:this._newTab(fileId), dataAttrs:[{k:'mevent',v:'tab'}]},

         ])
         this.modalObject.imgSrc(SERVER_URL+currentFile.imgSrc)
         this.modalObject.modalTitleProvide(currentFile.originalName)
         this.modalObject.init(this.$root.$el)
     }

     async show(data,qmode='normal'){
         await this.modes[qmode](data)
     }



 }

export default new FileModal()
