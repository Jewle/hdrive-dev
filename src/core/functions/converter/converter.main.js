export function detectListeners(str='') {
    const searchPattern = /^[a-z]{5,10}$/
    return str.search(searchPattern)

}
