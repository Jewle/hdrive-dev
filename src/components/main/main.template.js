
import {SERVER_URL} from "../../config/main.config";
import {UrlConstructor} from "../../core/functions/url.constructor";

let hasDivider = false
export function HTML(changes=[], loading=false) {



    return `
      
       <search-component></search-component>
       
        <div class="container" hchange>
             
           <div class="for-rect">
             ${loading? loader() : setChanges(changes)}
            </div>
        </div>
       
        
         
   `




}

function setChanges(changes) {
    return changes.map((c,i)=>{
        return `<div class="file${c.observe|| '' }" } 
                     data-role="showFile" data-id="${c._id}">
                <div class="controls">
                <p  style=" overflow:hidden; text-after-overflow: ellipsis; width:170px">${c.originalName} </p>
                 ${(c.authorName && ` <i files="id" class="fas fa-window-close fa-cross" data-id="${c._id}" data-role = 'close'></i>`) || ''}
                 </div>
                 ${fileContent(c)}
                 ${fileLoadSpinner()}  
                </div>
               

`
    }).join('')
}
//fix this shit too

function loader(){
    return `<div class='loader'><p>Loading, please wait....</p></div>`
}
function fileContent(c){
    const {type} = c
    return `
         <div class="file-content" data-name="${c.originalName}">
               <div 
               class="file-foreground" 
               data-role='showFile' 
               data-type="${c.displayType ==='observable' ? 'obs' : 'own'}" data-id="${c._id}" >
                </div> 
               <img files="img" ${c.displayType ==='observable' && 'data-observe=observable'} data-id="${c._id}" data-role='showFile' src="${c.imgSrc}" alt="" class="preview">
               ${hIf(`<audio src="${UrlConstructor.filesUrl('static', c.urlUnencoded)}" controls></audio>`, type?.split('/')[0]==='audio')}
               <p class="author-name">${(c.displayType ==='observable' && `From ${c.authorName}`) || ''}</p>
         </div>
    `
}
function hIf(data, condition) {
    if (!condition) return ''
    return data;
}

function fileLoadSpinner(){
    return `<div class="lds-default" id="fileSpinner" style="display: none"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`
}
