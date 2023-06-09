// const localStorageState = localStorage.getItem('state') || '{"userReducer":{"user":{"name":"Artem"}},"filesReducer":{"files":[{"imgSrc":"files\\\\1626903587841orig.jpg","_id":"60f8942352f20b13802c3992","originalName":"коммутатор","type":"image/jpeg","urlUnencoded":"files\\\\1626903587841orig.jpg"},{"imgSrc":"files\\\\1650407415643IMG0001_8660781.JPG","_id":"625f37f7db02ab0f5435779c","originalName":"IMG0001_8660781.JPG","type":"image/jpeg","urlUnencoded":"files\\\\1650407415643IMG0001_8660781.JPG"},{"imgSrc":"files\\\\1650407422473IMG0019_8660875.JPG","_id":"625f37fedb02ab0f5435779f","originalName":"IMG0019_8660875.JPG","type":"image/jpeg","urlUnencoded":"files\\\\1650407422473IMG0019_8660875.JPG"},{"imgSrc":"files/placeholders/default.png","_id":"629fda9d56ce6f173c4b2340","originalName":"Chernovik_2.docx","type":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","urlUnencoded":"files\\\\1654643357362Chernovik_2.docx"},{"imgSrc":"files\\\\1654885066126som.webp","_id":"62a38acad361100a20f6f431","originalName":"som.webp","type":"image/webp","urlUnencoded":"files\\\\1654885066126som.webp"},{"imgSrc":"files/placeholders/default.png","_id":"625f377adb02ab0f54357799","originalName":" modemtest.exe","type":"application/x-msdownload","urlUnencoded":"files\\\\1650407281233modemtest (1).exe"}],"filesToWatch":[],"loading":false,"page":"1","pages":4},"uploadReducer":{"uploadingFile":{}},"itemReducer":{"file":{},"error":false,"loading":false}}'
// const {userReducer:userState} = JSON.parse(localStorageState)
//

const initialState = {
    user: {}
}



export default function userReducer(state=initialState,action) {
    switch (action.type) {
        case 'USER_ENTERED':{
            return {
                user:action.payload
            }
        }
        case 'USER_LEFT':{
            user:{}
        }

        default: return state
    }

}
