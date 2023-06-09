import {UrlConstructor} from "../../core/functions/url.constructor";

export function HTML(changes=[]) {
    return `<div class="toolbar">
            <div class="user-widget">
               <i class="fa-solid fa-user-robot"></i>
            </div>
            <input type="text" class="toolbar__search toolbar-item">
             <button class="btn btn-success toolbar-item" data-role="search">Search</button>
            <div class="toolbar__view-container toolbar-item" >
                <div class="dpdn-btn show-files">
                    <label data-role="show" for="check">Files from others</label>
                </div>
                <div class="dpdn-options toolbar-item" hchange >
                    ${changes.map(fileToWatch).join('')}
                </div>
            </div>
        </div>`
}

function fileToWatch(file={}) {
    return `<div class="dpdn-item">
       <a href="${UrlConstructor.filesUrl('publicView',{id:file._id})}">${file.originalName}</a>
</div>`
}
