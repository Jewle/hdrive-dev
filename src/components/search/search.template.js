import {UrlConstructor} from "../../core/functions/url.constructor";

export function HTML(changes=[]) {
    return `<div class="toolbar">
            <div class="user-widget">
               <i class="fa-solid fa-user-robot"></i>
            </div>
            <input type="text" class="toolbar__search toolbar-item">
             <button class="btn btn-success toolbar-item" data-role="search">Search</button>
             <select  value="all" name="" id="" class="display-type">
                <option  value="all">All</option>
                <option  value="own">Own</option>
                <option  value="obs">From Others</option>
             </select>
           
        </div>`
}


