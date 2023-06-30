export function getRouteString(rawString){

    if (!rawString || typeof(rawString) !== 'string') return
    return '#'+rawString.split('/')[0]+'/' + rawString.split('/')[1];
}

export function queryParams() {
    const raw = window.location.hash.split('?').pop()

    if(window.location.hash.split('?').length<2){
        return {}
    }
    const obj = {}
    raw.split('&').forEach(qp=>{
        const qpArray = qp.split('=')
        obj[qpArray[0]] = qpArray[1]
    })

    return obj
}

export function hash(str,getCompleteString=false){

    if (str){
        if (str[0]==='#'){
            str = str.split('#').pop()
        }

        str = getRouteString(str)
            window.location.hash = str
        return str
    }
    return getCompleteString ?  window.location.hash :  window.location.hash.split('?').shift()
}
