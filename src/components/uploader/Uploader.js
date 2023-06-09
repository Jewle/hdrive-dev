import {Component} from "../../core/Component";
import {$} from  "../../core/dom"

import UploaderService from "./sevices/uploaderService";
import {filesLoaded, uploadingFileSet} from "../../storage/actions";



export class Uploader extends Component{
    name='uploader'
    overlay = null
    spinner = null
    fileInput = null
    uploadingFile = null
    constructor($root,options) {
        super($root,{
            ...options,
            listeners:['click', 'change'],
            changeDetectionOfReducer:'uploadReducer',
            extractFromReducer:'uploadingFile'
        });
    }

    init() {
        this.uploaderService = new UploaderService()
        this.file = this.$root
        this.overlay = this.$root.find('#overlay')
        this.spinner = this.$root.find('#spinner')

        this.fileInput = this.$root.find('#file_input')
        this.fileInput.on('change', this.prepareFile.bind(this))

        super.init();

    }
    onChange(e){

    }

    onClick(e){

        const target = $(e.target)
        this.callUserFunction(target.data.role,target)
    }

    removeoneFunction(target){
        const {id} = target.data
        this.uploadingFile = null

        this.detectChanges(this.uploadingFile)
    }
    mainuploadFunction(target){
        this.spinner.show()
        this.overlay.show()
        const formData = new FormData()
        const progressBar = this.$root.find(`#file-item`).width(0)
        formData.append('file', this.uploadingFile)

        this.uploaderService
            .upload(formData)
            .onload(_=>{
                this.uploadingFile = null
                this.hstore.dispatch(uploadingFileSet(null))
                this.spinner.hide()
                this.overlay.hide()
                this.hstore.dispatch(filesLoaded([]))


        })
            .progress(this.uploaderService.showProgress(progressBar))
    }
    specifyFunction(target){
        this.fileInput.click()

    }
    prepareFile() {
        this.spinner.show()
        this.overlay.show()
        this.uploadingFile = this.fileInput.files[0]
        this.uploadingFile.uid = this.uid
        // this.detectChanges(this.uploadingFile)
        this.hstore.dispatch(uploadingFileSet({name:this.uploadingFile.name}))
        const progressBar = this.$root.find(`#file-item`).width(0)
        const reader = new FileReader()
        reader.readAsDataURL(this.uploadingFile)
        reader.onprogress = this.uploaderService.showProgress(progressBar)
        reader.onload = _=>{
            this.spinner.hide()
            this.overlay.hide()
        }


    }



    static className = 'uploader'
    static routable = true
}




