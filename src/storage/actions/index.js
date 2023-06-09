function fileDeleteMany(payload) {
    return{
        type:'FILES_REMOVE_MANY',
        payload
    }
}

function fileDelete(payload) {
    return{
        type:'FILE_DELETED',
        payload
    }
}

function filesLoaded(payload){
    return {
        type:'FILES_LOADED',
        payload
    }
}

function fileEdit(payload){
    return {
        type:'FILE_EDITED',
        payload
    }
}
function observableFilesLoaded(payload){
    return {
        type:'OBSERVABLE_FILES_LOADED',
        payload
    }
}
function filesPending(payload){
    return{
        type:'FILES_PENDING',
        payload
    }
}

function uploadingFileSet(payload) {
    return {
        type:'SET_UPLOADING_FILE',
        payload
    }
}
function itemFileLoad(payload) {
    return{
        type:'LOAD_FILE',
        payload
    }
}

function itemFilePending() {
    return{
        type:'FILE_PENDING',
    }
}
function userEntered(payload) {
    return {
        type:'USER_ENTERED',
        payload
    }
}

function userLeft() {
    return {
        type:'USER_LEFT'
    }
}

export {
    filesLoaded,
    fileEdit,
    fileDelete,
    fileDeleteMany,
    observableFilesLoaded,
    filesPending,
    uploadingFileSet,
    itemFileLoad,
    itemFilePending,
    userEntered,
    userLeft,


}
