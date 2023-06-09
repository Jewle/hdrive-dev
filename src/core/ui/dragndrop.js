//deep shit you need to fix it
export function initDrag(ball,$root,dragEnd){
    let currentDroppable = null;



        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;
        let droppableBelow
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
        ball.style.background = 'green'
        ball.style.padding = '5px;'

        document.body.append(ball);

        moveAt(ball, event.pageX, event.pageY,shiftX,shiftY);



        function onMouseMove(event) {
            moveAt(ball, event.pageX, event.pageY,shiftX,shiftY);

            ball.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            ball.hidden = false;

            if (!elemBelow) return;

           droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) {
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    enterDroppable(currentDroppable);

                }
            }
        }

        document.addEventListener('mousemove', onMouseMove);

        ball.onmouseup = function() {
            ball.style.position = 'static'
            ball.style.background = 'none'
            ball.style.padding = '0px;'

            if(droppableBelow){
                dragEnd(droppableBelow)
                droppableBelow.style.background=''
            }


            document.removeEventListener('mousemove', onMouseMove);
            ball.onmouseup = null;


    };
    reset(ball)

}



function moveAt(ball,pageX, pageY,shiftX,shiftY) {

    ball.style.left = pageX - shiftX + 'px';
    ball.style.top = pageY - shiftY + 'px';
}



function enterDroppable(elem) {
    elem.style.background = 'pink';
}

function leaveDroppable(elem) {
    elem.style.background = '';
}

function reset(ball) {
    ball.ondragstart = function () {
        return false;
    }
}


export class Hdrag{
    currentDroppable = null
    constructor(event, target){
        this.event = event
        this.target = target
        this.dragCB = ()=>{}
    }


    dragEnd = (cb)=>{
        this.dragCB = cb
    }

    enterDroppable(elem){
        elem.style.background = '';
    }
    leaveDroppable(elem) {
        elem.style.background = '';
    }
    reset(ball) {
        ball.ondragstart = function () {
            return false;
        }
    }
    moveAt(ball,pageX, pageY,shiftX,shiftY) {

        ball.style.left = pageX - shiftX + 'px';
        ball.style.top = pageY - shiftY + 'px';
    }

    init($root){
        this.dragndrop(this.target,$root,this.dragCB,this.currentDroppable=null,this.enterDroppable,this.leaveDroppable,this.moveAt,this.reset)
    }

    dragndrop(ball,$root,cb,currentDroppable=null,enterDroppable,leaveDroppable,moveAt,reset){

        let shiftX = this.event.clientX - ball.getBoundingClientRect().left;
        let shiftY = this.event.clientY - ball.getBoundingClientRect().top;
        let droppableBelow
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
        ball.style.background = 'green'
        ball.style.padding = '5px;'

        document.body.append(ball);

        moveAt(ball, this.event.pageX, this.event.pageY,shiftX,shiftY);



        function onMouseMove(event) {
            moveAt(ball, event.pageX, event.pageY,shiftX,shiftY);

            ball.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            ball.hidden = false;

            if (!elemBelow) return;

            droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) {
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    enterDroppable(currentDroppable);

                }
            }
        }

        document.addEventListener('mousemove', onMouseMove);

        ball.onmouseup = function() {
            ball.style.position = 'static'
            ball.style.background = 'none'
            ball.style.padding = '0px;'

            if(droppableBelow){
                cb(droppableBelow)
                console.log(ball.remove)
                ball.remove()
                droppableBelow.style.background=''
            }

            $root.find('.directory-list').append(ball)
            document.removeEventListener('mousemove', onMouseMove);
            ball.onmouseup = null;
        };

    };
}
