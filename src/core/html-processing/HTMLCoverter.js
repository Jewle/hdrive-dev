export default class HTMLConverter  {
    static process(html,name){

        return (changes,...args)=>{
            const $el = document.createElement('div')
            $el.innerHTML = html(changes,...args)
            const changingElement = $el.querySelector('[hchange]')
            if(changingElement){
                changingElement.setAttribute('hchange', name)
            }
            return $el.innerHTML
        }
    }
}
