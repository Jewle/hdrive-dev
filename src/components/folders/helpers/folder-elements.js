import {$} from '../../../core/dom'
export default class FElements {
    file(id){
        return $.create('li')
            .attr('data-role','file')
            .attr('data-fid',id)

    }
    folder(id,title){
        return $.create('li', {classes:'folder droppable'})
            .attr('data-role','folder')
            .attr('data-fid',id)
            .attr('ondragover',`event.preventDefault()`)
            .html(title)
    }
   innerFolderContent(content) {
        return $.create('ul').html(content)
    }
}
