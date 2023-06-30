const initialState = {
    files: [],
    filesToWatch: [],
    loading:true,
    page:null,
    pages:null,
    // displayType:'own'

}


export function filesReducer(state=initialState,action) {
    switch (action.type) {
        case 'FILES_LOADED':{
            const {files,pages,page,type} = action.payload
            return {
                ...state,
                files,
                pages,
                page,
                loading: false,
                type
            }
        }

        case 'FILE_EDITED':{
            const {fileId,newTitle} = action.payload
            const clonedFiles =state.files.map(file=>({...file}))
            const editedFile = clonedFiles.find(file=>file._id===fileId)
            editedFile ? editedFile.originalName = newTitle : false
            return {
                ...state,
                files:clonedFiles

            }
        }
        case 'FILE_DELETED':{
            const {fileId} = action.payload
            const files = state.files.filter(file=>file._id!==fileId)
            return {
                ...state,
                files
            }
        }
        case 'FILE_UPLOAD':{
            return {
                ...state,
                files:[]
            }
        }
        case 'OBSERVABLE_FILES_LOADED':{
            return {
                ...state,
                filesToWatch:action.payload
            }

        }
        case 'FILES_PENDING':{
            const {page} = action.payload
            const shouldRefresh = state.page!==page
            const files=shouldRefresh ? [] : state.files
            // console.log(shouldRefresh)
            return {
                ...state,
                files,
                loading: true
            }
        }
        case 'FILES_REMOVE_MANY':{
            const {ids} = action.payload
            let clonedFiles = state.files.map(file=>({...file}))
            ids.forEach(id=>{
                clonedFiles=clonedFiles.filter(cfile=>cfile._id!==id)
            })
            return {
                ...state,
                files:clonedFiles
            }
        }
        // case 'FILES_SWITCH_DISPLAYTYPE':{
        //     console.log(action.payload)
        //     return {
        //         ...state,
        //         displayType:action.payload
        //     }
        // }

        default: return state

    }
}
