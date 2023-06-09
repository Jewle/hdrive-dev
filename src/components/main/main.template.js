
import {SERVER_URL} from "../../config/main.config";
import {UrlConstructor} from "../../core/functions/url.constructor";
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
              
                 ${!c.observe ? ` <i files="id" class="fas fa-window-close fa-cross" data-id="${c._id}" data-role = 'close'></i>` : ''}
                 </div>
                 ${fileContent(c)}
                 ${fileLoadSpinner()}  
            </div>`
    }).join('')
}
//fix this shit too
function modalContainer(id) {
    return `<div class="modal">
                <div class="modal-wrapper"></div>
                <div class="modal-container">
                     <div class="modal-header">
                         Filename
                    </div>
                    
                    <div class="modal-body">
                        <img src="#" alt="">
                         <div class="des">
                    <div files="fileName" class="desc__filename"></div>
                    <div class="desc__fileprops">
                        <ul>
                            <li data-fileDesc="size" files>Size: </li>
                            <li data-fileDesc="timestamp">Uploaded:</li>
                        </ul>
                    </div>
                </div>
                    </div>
                    
                    <div class="modal-footer">
                        <button>Delete</button>
                        <button data-role="close-modal">Close</button>
                        <button class="switch-public" data-fileId="1" data-role="public" >Switch public</button>
                    </div>
                
                </div>
            </div>`
}
function loader(){
    return `<div class='loader'><p>Loading, please wait....</p></div>`
}
function fileContent(c){
    const {type} = c
    return `
         <div class="file-content" data-name="${c.originalName}">
               <div class="file-foreground" data-role='showFile' data-id="${c._id}" ></div> 
               <img files="img" ${c.observe ? 'data-observe=observable' :''} data-id="${c._id}" data-role='showFile' src="${SERVER_URL+c.imgSrc}" alt="" class="preview">
               ${hIf(`<audio src="${UrlConstructor.filesUrl('static', c.urlUnencoded)}" controls></audio>`, type?.split('/')[0]==='audio')}
               <p class="author-name">${c.observe ? `From ${c.authorName}`:''}</p>
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
