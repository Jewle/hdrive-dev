import {$} from '../../../core/dom'
export class MenuService {
    $el = {}
    callBacks = []
    targetElement = {}

    constructor(selector){
        if (!selector) return
        this.$el = $(selector)

        if(this.$el){
            this.$el.on('click', this._handler)
        }


    }
    init(){

        const rect = this.targetElement.clientRect()

        this.$el.style({top:rect.top+10+'px', left:rect.left+10+'px', position:'absolute'})
        this.$el.show().style({opacity:1})
        return this
    }
    attach(target){
        this.targetElement = $(target)
        return this
    }
    off(){
        this.$el.style({opacity:0})
        setTimeout(()=>{this.$el.hide()}, 500)
    }
    destroy(){
        this.$el.hide()
        this.$el.html('')
        this.targetElement = {}
    }

    content(data){
        let {optionsArray, labelsArray} = data
        optionsArray = optionsArray || []
        labelsArray = labelsArray || []
        this.$el.html('')
        this.callBacks = []
        optionsArray = optionsArray.map(o=>{
             this.callBacks.push({role:o.role, cb:o.cb})
             return this._createOption(o)

        })
        labelsArray = labelsArray.map(label=>{
                return `<p>${label.text}</p>`
            })
        this.$el.html(optionsArray.join('')+labelsArray.join(''))
        return this
    }
    addOption = (o)=>{
        this.$el.html('')
        this.callBacks = []
        this.callBacks.push({role:o.role, cb:o.cb})
        this.$el.append(this._createOption(o))
        return this
    }

    _createOption(o){
        return `<p data-menuRole = ${o.role}>${o.title}</p>`

    }

    _handler = (e)=> {
        const target = $(e.target)
        const currentCB = this._getCb(target.data.menurole)
        currentCB.cb(target)
    }

    _getCb(role){
        return  this.callBacks.find(e => e.role === role)
    }

}
