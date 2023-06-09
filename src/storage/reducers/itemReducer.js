const initialState = {
    file:{},
    error:false,
    loading:false
}


export function itemReducer(state=initialState,action) {
    switch (action.type) {
        case 'FILE_PENDING':{
            return {
                ...state,
                loading:true
            }
        }
        case 'LOAD_FILE':{
            const {error,file} = action.payload
            return {
                file,
                error,
                loading: false
            }
        }

        default: return state
    }
}
