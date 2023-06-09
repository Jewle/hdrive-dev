export default function createStore(reducer) {
    let state = {}
    let testState = {}
    let prevTestState = {}
    let reducerChangeListeners = {}
    let prevState = {}
    let listeners = []
    let reducers = [reducer]
    let propertyChangeListeners = []
    return {
        subscribe(callBack){
            listeners.push(callBack)

            return {
                unsubscribe() {
                    listeners.filter(listener=>listener!==callback)
                }
            }

        },
        onReducerStateChanged(reducerName,cb){
            reducerChangeListeners[reducerName] = reducerChangeListeners[reducerName]||[]
            reducerChangeListeners[reducerName].push(cb)
            return {
                unsub(){
                    reducerChangeListeners[reducerName].filter(listener=>listener.toString()!==cb.toString())
                }
            }
        },
        onPropertyChange(prop,cb){

            propertyChangeListeners.push({
                cb,
                prop
            })

            return {
                unsubscribe() {
                    propertyChangeListeners.filter(listener=>listener.prop!==prop)
                }
            }
        },


        dispatch:(action)=>{
            prevState = state || {}
            prevTestState = JSON.parse(JSON.stringify(testState)) || {}
            reducers.forEach(reducer=>{
                const {name,func} = reducer
                testState[name] =func(testState[reducer.name],action)
                // state = reducer(state,action)
            })



            propertyChangeListeners.forEach(propertyChanging)
            Object.keys(reducerChangeListeners).forEach(listenerKey=>{
                 reducerChangeListeners[listenerKey].forEach(listener=>{
                     reducerStateChanged(listenerKey,listener)
                 })
            })

            if(listeners.length>0){
                listeners.forEach(listener=>{
                    if (typeof listener === 'function'){
                        listener(testState)
                    }
                })
            }

        },

        getTestState(item=''){

            if(item) return testState[item]

            return testState
        },
        combineReducers(reducersObject){
            reducers = reducersObject
            return this

        },
        getState(){
            return state
        },
        clearState(){
            state = {}
            testState ={}
            return true
        },
        selector(item){
            return state[item]
        },
        dev(){
            console.log(reducerChangeListeners,listeners)
        }


    }

   function propertyChanging(data){
        if (!state) return




        const stateItem = JSON.stringify(state[data.prop])
        const prevStateItem = JSON.stringify(prevState[data.prop])

        if(stateItem!==prevStateItem){

            data.cb(state[data.prop])
        }
    }

    function reducerStateChanged(reducerName,cb){
        if (!testState) return
        const reducerState = JSON.stringify(testState[reducerName])
        const reducerPrevState = JSON.stringify(prevTestState[reducerName])
        if(reducerState!==reducerPrevState){
            cb(testState[reducerName])
        }
    }
}
