import {Component} from "../../core/Component";
// import randomString from 'randomstring'
import {$} from  "../../core/dom"
import {XhrService} from "./sevices/xhr.service";
import { v4 as uuidv4 } from 'uuid';

export class Uploader extends Component{
    name='uploader'
    file
    files =[]
    constructor($root,options) {

        super($root,{...options, listeners:['click']});
        this.xhrService = new XhrService()

    }

    init() {
        this.$root.on('click', specifyFile.bind(this) )

        super.init();
    }

    //uploading
    onClick(e){
        const target = $(e.target)
        if (e.target.classList.contains('uploader__upload')){
            const formData = new FormData()
            formData.append('file', this.file)
            this.xhrService.post('http://localhost:5000/api/main/upload', formData).onload(e=>{
                this.files = []
                this.detectChanges(this.files)

            })
        }

        if (target.data.role==='remove-one'){
            if(!this.files.length) return
            this.removeOne(target.data.id)

        }
    }

    chooseFileHandler(){

    }
    removeOne = (id)=> {
        this.files = this.files.filter(f=>id!==f.uid)
        this.detectChanges(this.files)
    }

    static className = 'uploader'
    static routable = true
}


//fix progress and create multiply sending
function specifyFile(e){
    const target = $(e.target)
    const input = $('#file_input')
    if(target.data.role==='upload'){
        input.click()
        input.on('change', ()=>{
            const uniqueId = run(this.files[this.files.length-1]?.uid || 0) + 1

            this.file = input.files[0]
            this.file.uid = 'fileI'+uniqueId
            this.files.push(input.files[0])


            this.detectChanges(this.files)


            const reader = new FileReader()
            reader.readAsDataURL(input.files[0])


            reader.onprogress = (ev)=>{
                const percentage = ev.loaded/ev.total * 100
                this.$root.find(`#${uniqueId} .progress`).width(percentage + '%')


            }
        })

    }
}
