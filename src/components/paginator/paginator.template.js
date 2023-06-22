import {Router} from "../../core/routing/Router";
import {UrlConstructor} from "../../core/functions/url.constructor";

export function HTML(pages=0,isLoading,token) {
    return `<div hchange="${token}" class="pagination:container" display="none">
  
  
       ${setChanges(pages)} 
       <a href="${UrlConstructor.resolveQueryString(Router.currentRoute,{type:'observable'})}">OF</a>
  


<svg class="hide">
  <symbol id="left" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></symbol>
  <symbol id="right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></symbol>
</svg>`
}

function setChanges(pages) {
    return new Array(pages).fill('')
        .map(numberFrame).join('')
}

function numberFrame(_,number){

    const qParamsObject = {}
    number!==0 ? qParamsObject.page = number+1 : false
    // return `<a hrouter=${Router.routerLink('', qParamsObject)}>
    //
    //        </a>`
    return `<a 
                href="${UrlConstructor.resolveQueryString(Router.currentRoute,qParamsObject)}">
                <div data-num="${number+1}" class="pagination:number active">
                       ${number+1}
                </div>
            </a>`
}


// <div class="pagination:number arrow">
//     <svg width="18" height="18">
//     <use xlink:href="#left" />
//     </svg>
//     <span class="arrow:text">Previous</span>
//     </div>
//     <div class="pagination:number arrow">
//     <span class="arrow:text">Next</span>
//     <svg width="18" height="18">
//     <use xlink:href="#right" />
//     </svg>
//
//     </div>
//     </div>
