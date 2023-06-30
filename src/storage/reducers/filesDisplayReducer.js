const initialState = {
    displayType:'all'
}

function filesDisplayReducer(state=initialState,action) {
    switch (action.type) {
        case 'DISPLAY_TYPE_SWITCH':{
            return{
                ...state,
                displayType :action.payload
            }
        }
        default : return state
    }
}
export default filesDisplayReducer
