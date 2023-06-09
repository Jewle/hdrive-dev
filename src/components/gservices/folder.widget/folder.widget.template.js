export function HTML(changes){
    return `
    <div class="box" style="position: relative" >
    <ul class="directory-list" hchange>
            ${changes ? setChanges(changes) : folderSpinner()}
           
            
    </ul>
    <div class="overlay-forSpinner"></div>
     ${openFolderSpinner()} 
</div>`
}

function setChanges(changes) {
    return `
        ${changes}
    `
}

function folderSpinner(){
    return `<div style="text-align: center"> <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>`
}
function openFolderSpinner() {
    return `
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); z-index: 10">
            <div class="lds-hourglass" style="display: none"></div>
        </div>
    `
}
