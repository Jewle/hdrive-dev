

class DomExplorer {
    $el=null
    constructor(_element) {
        if(_element instanceof DomExplorer){
            this.$el = _element.$el
            return
        }
        typeof _element === 'string' ? this.$el = [...document.querySelectorAll(_element)] : this.$el = _element
        if (this.$el?.length < 2) {
            this.$el = this.$el[0]
        }
    }

    html(content) {
        if (content===undefined){
            return this.$el.innerHTML
        }
            this.$el.innerHTML = content
            return this
    }
    text(content){
        if (content===undefined){
            return this.$el.textContent
        }
        this.$el.textContent= content
        return this
    }

    clientRect(){
        return this.$el.getBoundingClientRect()
    }

    append(node) {
        if(!this.$el) return

        if (node instanceof DomExplorer) {

            this.$el.append(node.$el)
            return this
        }
        if (typeof node ==='string'){
            this.$el.innerHTML+=node
            return this
        }
        this.$el.append(node)
        return this
    }
    prepend(node){
        this.$el.prepend(node.$el)
        return this

    }

    get children() {
        return this.$el.children
    }

    get data() {
        return this.$el.dataset
    }

    on(event, cb) {
        this.$el.addEventListener(event, cb.bind(this))
        return this
    }

    off(event, cb) {
        this.$el.removeEventListener(event, cb)
        return this
    }

    click() {
        this.$el.click()
    }
    appendAfter(el,targetElement){
        targetElement.after(el)
        return this
    }

    val(str){
        if (!this.$el.tagName ==='INPUT') return this

        if (str===undefined){
            return this.$el.value
        }else {
            return this.$el.value = str
        }
    }

    disableSubmit(){

        // if (this.$el.tagName!=='FORM') return this

        this.$el.onsubmit = e=>e.preventDefault()
    }
    each(fn){
        // if (!this.$el && !this.$el.length){
        //     fn($(this.$el))
        //     return this
        // }
        //
        // this.$el.forEach((el)=>fn($(el)))
        return  this
    }

    get files() {
        if (this.$el.tagName === 'INPUT') {
            return this.$el.files
        }
    }

    style(styles) {
        Object.keys(styles).forEach(s => {
            this.$el.style[s] = styles[s]
        })
        return this
    }

    width(width) {
        this.$el.style.width = width
        return this
    }

    find(selector) {
        return $(this.$el.querySelectorAll(selector))
    }
    findOne(selector){
        return $(this.$el.querySelector(selector))
    }
    findChangingElement(){
        const isNested = !!this.$el.closest('[nested]')
    }
    get isElementGotten(){
        return this.$el !== 'undefined'
    }
    src(src) {

        if (this.$el.tagName === 'IMG') {
            if (src){
                this.$el.setAttribute('src', src)
                return this
            }
            return  this.$el.getAttribute('src')

        }
        return null
    }
    clear(){
        this.$el.innerHTML = ''
        this.$el.remove()
        return null
    }
    attr(k,v){
        if (!v){
            return this.$el.getAttribute(k)
        }
        this.$el.setAttribute(k,v)
        return this
    }

    takeOne(num=0){
        if(this.$el?.length>0 && this.$el[num]){
            return $(this.$el[num])
        }
    }

    closest(selector){
        return $(this.$el.closest(selector))
    }
    css(action,title){
        const classList = this.$el.classList
        switch (action) {
            case 'add':{classList.add(title); break}
            case 'toggle':{classList.toggle(title); break}
            case 'remove':{classList.remove(title); break }
            case 'contains': { return  classList.contains(title); break}
            default : {classList.add(title)}
        }
        return this
    }
    hclass(className, condition){
        if (condition){
            this.css('toggle', className)
        }
        return this
    }

    hide(){
        this.$el.style.display = 'none'
        return this
    }
    show(){
        this.$el.style.display = 'block'
        return this
    }
    remove(){
        this.$el.remove()
        return true
    }

}




$.create = (tag,meta={})=>{
    const {classes,data} = meta
    const nativeElement = document.createElement(tag)

    if(classes){
        nativeElement.setAttribute('class',classes)
    }
    if(data){
        Object.keys(data).forEach(key=>{
            nativeElement.setAttribute(`data-${key}`,data[key])
        })


    }
    return new DomExplorer(nativeElement)
}

export  function $(selector) {
    return new DomExplorer(selector)
}

