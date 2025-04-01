import interact from 'interactjs';
import toolIds from './toolids';
import { createModal, deleteModal }  from './wsModal';
import { handleStickyNoteButtons, handleStickyNoteSettings } from './stickynote';
import { handleDigitalClockSettings } from './digitalclock';
import { handleAnalogClockSettings } from './analogclock';
import { handleStopWatchButtons, handleStopWatchInput, handleStopWatchSettings } from './stopwatch';

const workspace = document.querySelector('.workspace');
const stack = document.querySelector('.stack');
const sidebar = document.querySelector('.workspace__sidebar');
const sidebarBtn = document.querySelector('.workspace__navbtn');
const toolSelect = document.querySelector('.tools-select__container');
const items = toolSelect.querySelectorAll('.tools-select__item');
let lastWidgetSelected;
const toolNamespace = {
  '1': {
    
  } 
};


interact('.widget')
 .resizable({
  edges: { left: true, right: true, bottom: true, top: false },

  ignoreFrom: 'button',

  listeners: {
    move (event) {
      var target = event.target
      var x = (parseFloat(target.getAttribute('data-x')) || 0);
      var y = (parseFloat(target.getAttribute('data-y')) || 0);

      target.style.width = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
        'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  },
  modifiers: [

    interact.modifiers.restrictEdges({
      outer: 'parent',
    }),

    interact.modifiers.restrictSize({
      min: { width: 100, height: 50 }
    })
  ],

  inertia: true
})
.draggable({
  inertia: true,

  ignoreFrom: '.tool-area, button',

   modifiers: [
     interact.modifiers.restrictRect({
       restriction: 'parent',
       endOnly: true
     })
   ],

  listeners: {
    move: dragMoveListener,
  },
  cursorChecker: (action, interactable, element, interacting) => {
      switch (action.axis) {
        case 'x': return 'ew-resize'
        case 'y': return 'ns-resize'
      }
    }
});

interact('.min-w')
  .draggable({
     inertia: true,

     modifiers: [
       interact.modifiers.restrictRect({
         restriction: 'parent',
         endOnly: true
      })
     ],

      ignoreFrom: 'button',

      listeners: {
        move: dragMoveListener,
      },
      cursorChecker: (action, interactable, element, interacting) => {
        return null;
      }
   });

interact('.pre-widget')
  .draggable({
     inertia: true,
     //keep the element within the area of it's parent
     modifiers: [
       interact.modifiers.restrictRect({
         restriction: workspace,
         endOnly: true
       })
     ],
 
     listeners: {
       move: dragMoveListener,
 
     },
     cursorChecker: (action, interactable, element, interacting) => {
         switch (action.axis) {
           case 'x': return 'ew-resize'
           case 'y': return 'ns-resize'
           default: return interacting ? 'grabbing' : 'default'
         }
       }
   });

interact('.workspace')
  .dropzone({
      accept: '.pre-widget',
      overlap: 1,
      ondrop: function(event) {
      
        const diffX = workspace.offsetLeft - stack.offsetLeft;
        const diffY = workspace.offsetTop - stack.offsetTop;

        const initX = event.relatedTarget.getAttribute('data-x');
        const initY = event.relatedTarget.getAttribute('data-y');

        event.relatedTarget.style.transform = `translate(${initX - diffX}px, ${initY - diffY}px)`;
        
        workspace.append(event.relatedTarget);

        event.relatedTarget.setAttribute('data-x', initX - diffX);
        event.relatedTarget.setAttribute('data-y', initY - diffY);

        event.relatedTarget.classList.remove('pre-widget');
        
        createWidget(event.relatedTarget);
        

        const refillDiv = document.createElement('div');
        refillDiv.setAttribute('class', 'pre-widget');
        refillDiv.setAttribute('tabindex', '0');
        stack.append(refillDiv);
        
      interact('.widget')
        .resizable({
          edges: { left: true, right: true, bottom: true, top: false },
      
          listeners: {
            move (event) {
              var target = event.target
              var x = (parseFloat(target.getAttribute('data-x')) || 0);
              var y = (parseFloat(target.getAttribute('data-y')) || 0);
      
              target.style.width = event.rect.width + 'px';
              target.style.height = event.rect.height + 'px';
      
              // translate when resizing from top or left edges
              x += event.deltaRect.left;
              y += event.deltaRect.top;
      
              target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)';
      
              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
            }
          },
          modifiers: [

            interact.modifiers.restrictEdges({
              outer: 'parent',
            }),

            interact.modifiers.restrictSize({
              min: { width: 100, height: 50 }
            })
          ],
      
          inertia: true
        })
        .draggable({
          inertia: true,
           modifiers: [
             interact.modifiers.restrictRect({
               restriction: 'parent',
               endOnly: true
             })
           ],

          listeners: {
            move: dragMoveListener,
          },
          cursorChecker: (action, interactable, element, interacting) => {
              switch (action.axis) {
                case 'x': return 'ew-resize'
                case 'y': return 'ns-resize'
              }
            }
        });

      }
   });

function dragMoveListener(event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}


function createWidget(divToFill) {
    const id = Date.now();

    divToFill.setAttribute('data-state','windowed');
    divToFill.setAttribute('draggable','false');
    divToFill.setAttribute('id', `${id}`);

    const widgetHtml = /*html*/`
      <div class="nav-btns">
        <button class="nav-btns__delete"></button>
        <button class="nav-btns__fullscreen"></button>
        <button class="nav-btns__minimize"></button>
      </div>
      <div class="tool-area">
        <div class="add__container">
          <button data-for="${id}" class="add__btn">
            <span data-for="${id}" class="add__btn__span">+</span>
          </button>
        </div>
      </div>
    `;

    divToFill.innerHTML = widgetHtml;
    divToFill.classList.add('widget');

    const minWidgetHtml = /*html*/`
        <div class="min-w" data-forWidget="${id}" tabindex="0">
            <div class="nav-btns">
                <button class="nav-btns__delete"></button>
                <button class="nav-btns__minimize"></button>
            </div>
        </div> 
    `;
    
    workspace.innerHTML += minWidgetHtml;
}


function handleDelete(e) {

  const delWidget = e.target.parentElement.parentElement;

  if(delWidget.classList.contains('widget')) {

    delWidget.classList.add('toHide');  
    workspace.removeChild(document.querySelector(`[data-forWidget="${delWidget.id}"]`));
    delete toolNamespace[delWidget.id];
    
  } else if(delWidget.classList.contains('min-w')) {
    
    delWidget.classList.remove('toOpen');
    workspace.removeChild(document.querySelector(`[id='${delWidget.dataset.forwidget}']`));
    delete toolNamespace[delWidget.dataset.forwidget];
  }
  setTimeout(() => workspace.removeChild(delWidget), 500);
  
}


function handleFullscreen(e) {
  const fsWidget = e.target.parentElement.parentElement;

  if(fsWidget.dataset.state === 'windowed') {
  
    fsWidget.setAttribute('data-prevX', fsWidget.dataset.x);
    fsWidget.setAttribute('data-prevY', fsWidget.dataset.y);
    fsWidget.setAttribute('data-prevH', fsWidget.offsetHeight);
    fsWidget.setAttribute('data-prevW', fsWidget.offsetWidth);

    fsWidget.style.transform = `translate(-20px, -20px)`;
  
    fsWidget.style.height = '100%';
    fsWidget.style.width = '100%';
  
    fsWidget.setAttribute('data-x', -20);
    fsWidget.setAttribute('data-y', -20);
  
    fsWidget.focus();

    fsWidget.dataset.state = 'fullscreen';

  } else if(fsWidget.dataset.state === 'fullscreen') {
      const prevX = parseFloat(fsWidget.getAttribute('data-prevX'));
      const prevY = parseFloat(fsWidget.getAttribute('data-prevY'));
      const prevH = parseFloat(fsWidget.getAttribute('data-prevH'));
      const prevW = parseFloat(fsWidget.getAttribute('data-prevW'));

      fsWidget.style.height = `${prevH}px`;
      fsWidget.style.width = `${prevW}px`;

      fsWidget.style.transform = `translate(${prevX}px, ${prevY}px)`;
    
      fsWidget.setAttribute('data-x', prevX);
      fsWidget.setAttribute('data-y', prevY);
    
      fsWidget.focus();

      fsWidget.dataset.state = 'windowed';
  }


}

function handleMinimize(e) {
  const element = e.target.parentElement.parentElement;
  const elementHeight = element.offsetHeight;

  if(element.classList.contains('widget')) {
    const minWidget = document.querySelector(`[data-forwidget="${element.id}"]`);

    const elementX = parseFloat(element.getAttribute('data-x')) + 20;
    const elementY = parseFloat(element.getAttribute('data-y')) + 20 + elementHeight - minWidget.offsetHeight;

    minWidget.style.transform = `translate(${elementX}px, ${elementY}px)`;

    minWidget.setAttribute('data-x', elementX);
    minWidget.setAttribute('data-y', elementY);

    element.classList.add('toHide');
    minWidget.classList.add('toOpen');


  } else if(element.classList.contains('min-w')) {
    const widget = document.querySelector(`[id='${element.dataset.forwidget}']`);

    element.classList.remove('toOpen');
    widget.classList.remove('toHide');
  }

}

function displayTools() {
  document.querySelector('.ws-modal').append(toolSelect);
  setTimeout(function() { 
    toolSelect.style.opacity = '1';
    toolSelect.style.visibility = 'visible';
   }, 300);
}


workspace.addEventListener('click', function(e) {
  const btnClass = e.target.classList;

  if(btnClass.contains('nav-btns__delete')) handleDelete(e);
  if(btnClass.contains('nav-btns__fullscreen')) handleFullscreen(e);
  if(btnClass.contains('nav-btns__minimize')) handleMinimize(e);
});


sidebarBtn.addEventListener('click', function() {
  sidebar.classList.toggle('sidebar-open');
});


document.addEventListener('click', function(e) {
  const btnClass = e.target.classList;

  if(btnClass.contains('add__btn') || btnClass.contains('add__btn__span')) { 
    if(btnClass.contains('.ws-modal')) return;
    lastWidgetSelected = document.querySelector(`[id="${e.target.dataset.for}"]`);
    createModal();
    displayTools();
  }

  if(btnClass.contains('ws-modal__btn')) {
     deleteModal(); 
  }

  if(btnClass.contains('ws-modal__backdrop')) {
     deleteModal(); 
  }  

  if(btnClass.contains('stickynote__btn')) {
    handleStickyNoteButtons(e, btnClass);
  }

  
  if(btnClass.contains('stopwatch__btn')) {
    handleStopWatchButtons(e, btnClass);
  }

  if(btnClass.contains('tool-settings__btn') || btnClass.contains('tool-settings__close-btn')) {
    const widget = document.querySelector(`[id="${e.target.dataset.for}"]`);
    const settingsContainer = widget.querySelector('.tool-settings__container');

    settingsContainer.classList.toggle('openSettings');
  }

});

document.addEventListener('input', function(e) {
  const input = e.target;

  if(input.type === 'textarea') return;
  if(input.classList.contains('stack__checkbox')) return;

  const tool = input.parentElement.parentElement;

  if(tool.parentElement.classList.contains('stopwatch')) {
    handleStopWatchInput(input, tool);
  }

  if(tool.classList.contains('stickynote')) {
    handleStickyNoteSettings(input, tool);
  }

  if(tool.classList.contains('digitalclock')) {
    handleDigitalClockSettings(input, tool);
  }

  if(tool.classList.contains('analogclock')) {
    handleAnalogClockSettings(input, tool);
  }

  if(tool.classList.contains('stopwatch')) {
    handleStopWatchSettings(input, tool);
  }

});

document.addEventListener('change', function(e) {
  if(e.target.type === 'textarea') {
    e.target.textContent = e.target.value;
  };
});

items.forEach(item => item.addEventListener('click', function() {
  deleteModal();
  lastWidgetSelected.querySelector('.tool-area').removeChild(lastWidgetSelected.querySelector('.add__container'));
  const func = toolIds[item.id];
  func(lastWidgetSelected.querySelector('.tool-area'));
}));


export { toolSelect, toolNamespace }