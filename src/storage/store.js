import {filesReducer} from "./reducers/filesReducer";
import {uploadReducer} from "./reducers/uploadReducer";
import createStore from "../core/heux/createStore";
import {itemReducer} from "./reducers/itemReducer";
import userReducer from "./reducers/userReducer";

export const store = createStore()
    .combineReducers([
        {name:'userReducer', func:userReducer},
        {name:'filesReducer', func:filesReducer},
        {name:'uploadReducer', func:uploadReducer},
        {name:'itemReducer', func:itemReducer},

    ])

store.subscribe(state=>{
    localStorage.setItem('state',JSON.stringify(store.getTestState()))
})


