import {$} from '../../../core/dom'
export function modal(options) {
    const container = $('.modal').style({display:'block'})

    container.find('.modal-header').html(options.header)
    container.find('.modal-body [data-fileDesc=size]').html('Size '+options.body?.size)
    container.find('.modal-body [data-fileDesc=timestamp]').html('Date '+options.body?.timestamp)
    container.find('.modal-body img').src(options.body?.imgSrc)
    container.find('.switch-public')
        .hclass('btn-active', options.publicParams.isPublic)
        .html(options.publicParams.message).attr('data-id', options.fileId)

    container.find('.modal-wrapper').on('click',function(){
        this.closest('.modal').style({display: 'none'})
    } )

    container.find('[data-role=close-modal]').on('click',function(){
        this.closest('.modal').style({display: 'none'})
    } )




}
