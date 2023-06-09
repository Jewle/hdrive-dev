import {UrlConstructor} from "../../core/functions/url.constructor";

export function HTML(changes=[],isLoading,token) {
    console.log(changes)
    return `<div class="menu" hchange="${token}" >
        <label for="toggle-menu">Show/Hide</label>
        <input type="checkbox" id="toggle-menu" class="menu-toggler">
        <ul class="menu__box">
            <li><a href="#drive/main">Main</a></li>
            <li><a href="#drive/uploader">Upload</a></li>
            <li><a href="#drive/folders">Folders</a></li>
            <li data-role="logout" style="align-self: flex-end">Logout</li>
            
        </ul>
        <div class="files-to-watch" hchange>
         
            <ul>
                ${setChanges(changes)}
            </ul>
        </div>
        
        <paginator-component></paginator-component>
    </div>`
}

function setChanges(files) {
    return files.map(fileItem)
}

function fileItem(file) {
    return `<li>
                <a href="${UrlConstructor.filesUrl('publicView',{id:file._id})}">
                    ${file.originalName}
                </a>
            </li>`
}
