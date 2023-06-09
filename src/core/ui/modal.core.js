export function modalCore() {
    let buttons = []
    let lis = []
    let imgSrc = ''
    let modalTitle = ''
    let modalTemplate = null
    let viewers = []
    let optionHtml = ''
    let modalEvents= []
    let BodyButtons = []
    let data= {mode:'',field:''}
    let searchField = {}
    let headerButtons = []


    function viewerTemplate(viewer){
        const {name,email,canSee,_id} = viewer
        return `
          <div class="file-viewer">
            <div class="file-viewer-name">${name}</div>
            <div class="file-viewer-email">${email}</div>
            <div class="file-viewer-cansee ${canSee ? 'obs' : ''}">
                <button data-id="${_id}" data-mevent="${canSee ? 'removeViewer' : 'setViewer'}">${canSee ? '&times;' : 'OK'}</button>
            </div>
          </div> 
        `
    }
    function createButton(button) {
        if(button.hidden) return
        const dataAttrs = button.dataAttrs ? button.dataAttrs.map(dA => `data-${dA.k} = "${dA.v}" `).join('') : ''
        return `<button  ${dataAttrs} class="${button.className}">${button.title}</button>`
    }
    function createSearchField(sField){
        const dataAttrs = sField.dataAttrs ? sField.dataAttrs.map(dA => `data-${dA.k} = "${dA.v}" `).join('') : ''
        return `<input ${dataAttrs} class="${sField.className}" value="${sField.value || ''}" type="${sField.type}">`
    }

    function createLi(li) {
        if (!li) return  ''
        const dataAttrs = li.dataAttrs ? li.dataAttrs.map(dA => `data-${dA.k} = "${dA.v}" `).join('') : ''
        return `<li ${dataAttrs} class="${li.className}">${li.title}</li>`
    }
    function createOptions(option){
        return `<select>${optionHtml}</select>`
    }

    return {
        buttons(buttonsArray) {
            buttons = buttonsArray
        },
        addBodyButtons(buttonsArray){

            BodyButtons = buttonsArray
        },
        addHeaderButtons(buttonsArray){
            headerButtons = buttonsArray
        },
        addButtons(buttonsArray){
            buttons = buttons.concat(buttonsArray)
        },
        dataList(lisArray) {
            lis = lisArray
        },
        directory(htmlContent){
            optionHtml = htmlContent
            // directories = optionsArray.filter(dId=>dId!==currentDirectoryId)
        },
        imgSrc(src) {
            imgSrc = src
        },
        setData(Data){
            data = Data
        },
        showViewers(viewers,where){
            const viewersOfFileHTML = viewers.map(viewer=>viewerTemplate(viewer)).join('')
            where.innerHTML = viewersOfFileHTML
        },

        modalTitleProvide(title) {
            modalTitle = title
        },
        provideSearchField(sField){
            searchField = sField
        },

        setViewers(fviewers){
            viewers = fviewers
        },
        async init($root) {

            modalTemplate = document.createElement('div')
            modalTemplate.classList.add('modal')
            setTimeout(_=>{
                modalTemplate.style.display = "block"
            },500)
            modalTemplate.insertAdjacentHTML('beforeend', `
                <div data-modal="close" class="modal-wrapper"></div>
                <div class="modal-container">
                     <div class="modal-header">
                         <p class="modal-title"> ${modalTitle}</p>
                         ${headerButtons.map(createButton).join('')}
                    </div>
                    
                    <div class="modal-body">
                        ${imgSrc && `<img src="${imgSrc}" alt="">`}
                         <div class="des">
                    <div files="fileName" class="desc__filename"></div>
                    <div class="desc__fileprops">
                        <ul class="data-list">
                            ${lis.map(createLi).join('')}
                             ${optionHtml}
                           
                        </ul>
                    </div>
                    <div class="body-buttons">
                        ${BodyButtons.map(createButton).join('')}
                    </div>
                    ${`<div class="whocansee">
                        <p>Who can see?</p>
                        ${createSearchField(searchField)}
                        <div class="search-box">
                            
                        </div>
                    </div>` }
                    

                </div>
                    </div>
                    
                    <div class="modal-footer">
                    <button class="btn btn-warning" data-modal='close'>Close</button>
                      ${buttons.map(createButton).join('')}
                    </div>
                <div class="modal-overlay">
                    <div class="modal-overlay-content">Loading...</div>
                 </div>
                </div>`)
            $root.append(modalTemplate)

            modalTemplate.addEventListener('click', async ({target}) => {
                const overlay = modalTemplate.querySelector('.modal-overlay')
                if(target.dataset.modal==='close'){
                    this.close()
                }
                if (target.dataset.mevent){
                    const mEvent =[...buttons, ...BodyButtons,...headerButtons].find(button=>button.event === target.dataset.mevent)
                    if(!mEvent && typeof mEvent?.callback ==='function') return
                     await mEvent.callback(target,overlay,modalTemplate)
                }
            })

                modalTemplate.querySelector('input').addEventListener('input', async({target})=>{
                    searchField.callback(target.value,modalTemplate.querySelector('.search-box'))
                })

        },
        close(){
             buttons = []
             lis = [{}]
             imgSrc = ''
             modalTitle = ''
             viewers = []
             optionHtml = ''
             modalEvents= []
             BodyButtons = []
             data= {}
             searchField = {}
             headerButtons = []
             modalTemplate.style.display='none'
             modalTemplate.remove()
             modalTemplate = null
        }

    }

}
