export function createDigitalClock(widgetToolArea) {
    const id = widgetToolArea.parentElement.id;
    const html =  /*html*/` 
    <div class="digitalclock">
        <button data-for="${id}" title="Settings" class="tool-settings__btn digitalclock__btn--settings"></button>
        <div class="digitalclock__time"></div>
        <div class="digitalclock__date"></div>
        <div class="tool-settings__container">
            <button data-for="${id}" class="tool-settings__close-btn">X</button>
            <p>Settings</p>
            <label for="fontColor" class="tool-settings__label">Change Font Color:</label>
            <input id="fontColor" type="color" value="#000000">
            <label for="bgColor" class="tool-settings__label">Change Background Color:</label>
            <input id="bgColor" type="color" value="#e6e6e6">
            <label for="fontSize" class="tool-settings__label">Change Font Size (px):</label>
            <input id="fontSize" type="number" min="1" max="400" value="25">
        </div>
    </div>`;

    widgetToolArea.innerHTML = html;
    
    widgetToolArea.querySelector('.digitalclock__date').textContent = new Date().toLocaleDateString();
    
    const intervalID = setInterval(() => startDigitalClock(widgetToolArea, intervalID), 1000);
}


function startDigitalClock(widgetToolArea, intervalID) {
    const id = widgetToolArea.parentElement.id;
    
    if(!document.querySelector(`[id="${id}"]`)) {
        clearInterval(intervalID);
        return; 
    }

    const date = ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes() +":"+ ((new Date().getSeconds() < 10)?"0":"") + new Date().getSeconds();


    document.querySelector(`[id="${id}"]`).querySelector('.digitalclock__time').textContent = date;
}


export function handleDigitalClockSettings(input, tool) {
   
   switch(input.id) {
       case 'fontColor':
            {
            const time = tool.querySelector('.digitalclock__time');
            const date = tool.querySelector('.digitalclock__date');
            time.style.color = `${input.value}`;
            date.style.color = `${input.value}`;
            }
            break;
       case 'bgColor':
            {
            const toolArea = tool.parentElement;
            toolArea.style.backgroundColor = `${input.value}`;
            }
            break;
       case 'fontSize':
            {
            const time = tool.querySelector('.digitalclock__time');
            const date = tool.querySelector('.digitalclock__date');
            if(input.value < 400 && input.value > 0) {
              time.style.fontSize = `${input.value/10}rem`;
              date.style.fontSize = `${input.value/20}rem`;
            } else if (input.value < 1) {
              time.style.fontSize = `0.1rem`;
            } else {
              time.style.fontSize = `40rem`;
              date.style.fontSize = `20rem`;
            }
            }
            break;
   }
   input.setAttribute('value', `${input.value}`);
}