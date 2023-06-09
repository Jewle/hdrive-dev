const initialState = {
    uploadingFile:{}
}


export function uploadReducer(state=initialState,action) {
    switch (action.type) {
        case 'SET_UPLOADING_FILE':{
           return {
               uploadingFile: action.payload
           }
        }

        default: return state
    }
}
