//сделать класс

export default async function selectionRect ($root,selector) {
        await new Promise((res)=>{setTimeout(()=>res(),100)})
        if (!$root && !selector) return {}


       const app = $root
       const boxes = document.querySelectorAll('.file')
        console.log(boxes)
       let onSelected = null
        let onceSelected = null
        let onStop = null
// const button = documeunt.querySelector('button')
       let currentX = 0
       let currentY = 0
       let rect = null
       let selectedElements = []
       const moving = ({clientX,clientY,pageX})=>{

           if ((clientX-currentX)<0){
               // rect.style.left = `${-10}px`
               // rect.style.left = null
               // rect.style.right = `${pageX+currentX-20}px`
           }
           const width = Math.abs(clientX - currentX)

           const height = clientY - currentY
           rect.style.width = width+'px'
           rect.style.height = height+'px'
           setTimeout(_=>{
               boxes.forEach(box=>{
                   if (!rect) return
                   const {x,y,width:targetWidth,height:targetHeight} = box.getBoundingClientRect()
                   const {x:rectX,y:rectY,width:rectWidth,height:rectHeight} = rect.getBoundingClientRect()
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
       const mouseLeaving=()=>{
        if (!rect) return
        rect.remove()
        if (onStop && typeof onStop.cb==='function'){
            onStop.cb({stop:true})
        }

        app.removeEventListener('mousemove', moving)
    }
       app.addEventListener('mouseup', ()=>{

           selectedElements = [...app.querySelectorAll('.selected')]

           if (onSelected && typeof onSelected.cb==='function'){
               const {meta} = onSelected
               onSelected.cb(selectedElements.map(se=>se.dataset.id))
           }
           if (onceSelected && typeof onceSelected.cb==='function'){
               const {meta} = onceSelected
               onceSelected.cb(selectedElements.map(se=>se.dataset.id))
               onceSelected = null
           }

           app.removeEventListener('mousemove', moving)
           app.removeEventListener('mouseleave', mouseLeaving)
           if (!rect) return
           rect.remove()


       })



       app.addEventListener('mousedown', (e)=>{
           if (onStop && typeof onStop.cb==='function'){
               onStop.cb({stop:true})
           }
           e.preventDefault()

           boxes.forEach(box=>box.classList.remove('selected'))
           currentX = e.clientX
           currentY = e.clientY
           rect = document.createElement('div')
           rect.classList.add('rect')
           rect.style.position  = 'absolute'
           rect.style.top = `${currentY-20}px`
           rect.style.left = `${currentX-20}px`
           document.body.append(rect)

           app.addEventListener('mousemove', moving)
           app.addEventListener('mouseleave', mouseLeaving )

       })

       return {
           destroy(){

           },
           onSelected(cb,delay=0){//fix
               if(delay){
                   setTimeout(_=>onSelected = cb,delay)
               }else{
                   onSelected={cb, meta:''}
               }
               return this

           },
           onceSelected(cb){
               onceSelected = {cb,meta:''}
               return this
           },
           onStop(cb){
               onStop = {cb,meta:''}
               return this
           },
           init(root,targetSelector){

           }
       }

}
