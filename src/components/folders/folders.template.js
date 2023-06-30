export function HTML(changes='',isLoaded) {

    return `<h2>Directory List</h2>

<div class="box" style="position: relative" >
    <button class="new-folder" data-role="rootfolder">+</button>
    <button data-role="refreshbutton" class="refresh-button">
         <i data-role="refreshbutton" class="fa-solid fa-arrows-rotate"></i>
    </button>
    <ul  class="directory-list droppable" hchange>
            
            ${changes ? setChanges(changes) : folderSpinner()}
           
            
    </ul>
    <div class="overlay-forSpinner"></div>
     ${openFolderSpinner()} 
</div>
   <div class="hmenu"></div>
`
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


