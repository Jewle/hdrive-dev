
import {SERVER_URL} from "../../config/main.config";

export function HTML(data, loading,isError) {
    return isError ? throwError('File was not found or you have not got access to observe it') : content(data,loading)
}
function content(data,loading){
    return `
    <div hchange>
                ${!loading && data ? setChanges(data) : 'Loading... Please wait'}
    </div>`
}

function throwError(msg){
    return `'<span hchange style="color:red">${msg}</span>'   `
}

function setChanges(changes={}) {
    const imgSrc = changes.imgSrc ? SERVER_URL + changes.imgSrc : ''
    const fileName = changes ? `<span class="${changes.isPublic ? 'public-file' : 'private-file'}">${changes.isPublic ? 'Public' : 'Private'}</span>`  : ''


    const html = `
            <main class="onb-main">
  <article class="onb-product-view">
    <section class="onb-product-view--image-slider onb-image-slider">
      <!-- image slider here -->
      <img alt="bike Masi Gran Criterium" class="onb-image-slider--image" src="${imgSrc}" />
    </section>
    <aside class="onb-aside-wrapper">
      <section class="onb-product-view--details-box onb-product-details-box">
        <h2 class="onb-product-details-box--title" >
         ${changes.originalName}
        </h2>
        <div class="onb-product-details-box--info-wrapper">
          <span class="onb-product-details-box--price"><strong>${changes.size}</strong></span>
          <span class="onb-product-details-box--stock" >${fileName}</span>
        </div>
        <div class="onb-product-details-box--description">
          <h3 class="onb-product-details-box--description-title">Date: ${changes.uploadedAt}</h3>
          
          <h3 class="onb-product-details-box--description-title">Author  ${changes.authorName}</h3>
          <p class="onb-product-details-box--description-title">${changes.isOwner && 'My file'}</p>
          ${changes.isOwner && ownerActions(changes)}
          
        </div>
        <button data-role="download" class="btn btn-success">Download</button>
      
        <br> 
        
        <br>
      </section>
      
    </aside>
  </article>
</main>`
    return html
}

function ownerActions(file) {
    return `
        <div class="owner-actions">
            <div class="owner-action-container">
                <button class="owner-action btn btn-primary" data-role="viewers">Options</button>
                <br><br>
                <button data-role="delete" class="btn-danger btn">Delete</button>
            </div>  
        </div>
    `
}
