export function HTML(changes) {

    return `<div id="FileUpload">
               
                <div class="wrapper" style="position:relative;">
                 <div id="overlay" style="background-color: #dbd0d0" class="overlay-forSpinner"></div>
                          <div class="upload" style="position:relative;">
                           <div id="spinner" style="position: absolute; z-index: 100; display: none"><div class="lds-default"  ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
                         
                    <p class="upload__target">
               
                        <span class="upload__button"  data-role="specify">Browse</span>
                    </p>
                           
                    
                </div>
                 <div hchange>${changes ? displayFiles(changes) : ''}</div>
                <button data-role="mainUpload" class="uploader__upload">Upload</button>
                <input type="file" id="file_input"  style="visibility: hidden">
                </div>
            </div>`
}

function setChanges(changes) {

    return ` 
        
        ${displayFiles(changes)}
        `
}

function displayFiles(file) {


        return `<div class="uploaded uploaded--one">
                    <i data-role='removeOne' data-id="${file.uid}" class="fas fa-times uploaded__cross"></i>
                    <i class="fas fa-file"></i>
                    <div class="uploading-file">
                        <div class="file__name">
                            <p>${file.name}</p>
                            
                        </div>
                        <div class="progress">
                            <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" style="width:100%"></div>
                        </div>
                    </div>
                    <div id="file-item" class="uploader__progress-bar">
                    <div class="progress"></div>
                </div>
            
        </div>`

}

function fileLoadSpinner(){
    return `<div id="spinner" style="position: absolute; z-index: 100; display: none"><div class="lds-default"  ><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div> `
}
function overLay() {
    return `<div id="overlay" style="background-color: #dbd0d0" class="overlay-forSpinner"></div>`
}
