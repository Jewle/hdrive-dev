import {DomListener} from "./DomListener";

export default class SelectionLayer extends DomListener{
    _$element = null
    constructor($root,options){
        super($root,options)
        this.app = null
        this.boxes = document.querySelectorAll('.file')
        this.onSelected = null
        this.onceSelected = null
        this.onStop = null
        this.currentX = 0
        this.currentY = 0
        this.rect = null
        this.selectedElements = []
    }

    attach($el){

       $el && (this.app = $el)

    }


    _mouseLeaving=()=>{
        if (!this.rect) return
        this.rect.remove()
        if (this.onSelectionEnded && typeof this.onSelectionEnded==='function'){
            this.onSelectionEnded({stop:true})
        }

        this.app.off('mousemove', this._moving)
    }

    onSelectionEnded(){

    }

    selectionInit() {
       const _moving = ({clientX,clientY,pageX})=>{
            console.log('moving')
            if ((clientX-this.currentX)<0){
                // rect.style.left = `${-10}px`
                // rect.style.left = null
                // rect.style.right = `${pageX+currentX-20}px`
            }
            const width = Math.abs(clientX - this.currentX)

            const height = clientY - this.currentY
            this.rect.style.width = width+'px'
            this.rect.style.height = height+'px'
            setTimeout(_=>{
                this.boxes.forEach(box=>{
                    if (!this.rect) return
                    const {x,y,width:targetWidth,height:targetHeight} = box.getBoundingClientRect()
                    const {x:rectX,y:rectY,width:rectWidth,height:rectHeight} = this.rect.getBoundingClientRect()
                    const condition = x>rectX &&rectY<y && rectX+rectWidth>x+targetWidth && rectHeight+rectY>y+targetHeight
                    if(condition){
                        box.classList.add('selected')
                    }
                    else{
                        box.classList.remove('selected')

                    }
                })
            },100)
        }

        this.app.on('mouseup', () => {

            this.selectedElements = this.app.find('.selected').$el

            if (this.onSelected && typeof this.onSelected === 'function') {

                this.onSelected(this.selectedElements.map(se => se.dataset.id))
            }
            if (this.onceSelected && typeof this.onceSelected === 'function') {

                this.onceSelected(this.selectedElements.map(se => se.dataset.id))
                this.onceSelected = null
            }
            console.log('mouseup')
            this.app.off('mousemove', _moving)

            this.app.off('mouseleave', this._mouseLeaving)
            if (!this.rect) return
            this.rect.remove()

        })


        this.app.on('mousedown', (e)=>{
            if (this.onStop && typeof this.onStop==='function'){
                this.onStop({stop:true})
            }
            e.preventDefault()

            this.boxes.forEach(box=>box.classList.remove('selected'))
            this.currentX = e.clientX
            this.currentY = e.clientY
            this.rect = document.createElement('div')
            this.rect.classList.add('rect')
            this.rect.style.position  = 'absolute'
            this.rect.style.top = `${this.currentY-20}px`
            this.rect.style.left = `${this.currentX-20}px`
            document.body.append(this.rect)

            this.app.on('mousemove', _moving)
            this.app.on('mouseleave', this._mouseLeaving )

        })
    }



}
