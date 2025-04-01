import { toolNamespace } from './workspace';

export function createStopWatch(widgetToolArea) {
    const id = widgetToolArea.parentElement.id;
    
    const html =  /*html*/` 
        <div class="stopwatch">
            <button data-for="${id}" title="Settings" class="tool-settings__btn stopwatch__btn--settings"></button>
            <p class="stopwatch__content">00:00:00</p>
            <div class="stopwatch__controls">
                <button data-for="${id}" class="stopwatch__btn stopwatch__btn--start">Start</button>
                <button data-for="${id}" class="stopwatch__btn stopwatch__btn--reset">Reset</button>
                <div>
                    <input data-for="${id}" type="checkbox" id="milliseconds">
                    <label class="stopwatch__controls__label" for="milliseconds">Milliseconds</label>
                </div>
            </div>
            <div class="tool-settings__container">
                <button data-for="${id}" class="tool-settings__close-btn">X</button>
                <p>Settings</p>
                <label for="fontColor" class="tool-settings__label">Change Font Color:</label>
                <input id="fontColor" type="color" value="#000000">
                <label for="bgColor" class="tool-settings__label">Change Background Color:</label>
                <input id="bgColor" type="color" value="#e6e6e6">
                <label for="fontSize" class="tool-settings__label">Change Font Size (px):</label>
                <input id="fontSize" type="number" min="1" max="350" value="25">
            </div>
        </div>
        `;

    widgetToolArea.innerHTML = html;

    toolNamespace[id] = {
        millCheck: false,
        intervalID: null,
        millis: 0,
        secs: 0,
        mins: 0,
        hours: 0,
    };

}

export function handleStopWatchButtons(e, btnClass) {
    const btn = e.target;
    const id = btn.dataset.for;
    const widget = document.querySelector(`[id="${id}"]`);
    const tool = toolNamespace[id];

    if(btnClass.contains('stopwatch__btn--start')) {
        if(btn.textContent === 'Stop') {
            clearInterval(tool.intervalID);
            btn.textContent = 'Resume';
            widget.querySelector('.stopwatch__btn--reset').disabled = false;
        } else if (btn.textContent === 'Resume') {
            const intID = setInterval(() => startStopWatch(widget, intID), 10);
            tool.intervalID = intID; 
            
            btn.textContent = 'Stop';
            widget.querySelector('.stopwatch__btn--reset').disabled = true;
        } else {
            const intID = setInterval(() => startStopWatch(widget, intID), 10);
            tool.intervalID = intID; 

            btn.textContent = 'Stop';
            widget.querySelector('.stopwatch__btn--reset').disabled = true;
        }
    }

    if(btnClass.contains('stopwatch__btn--reset')) {
      tool.millis =
      tool.secs =
      tool.mins =
      tool.hours = 0;

      widget.querySelector('.stopwatch__content').textContent = `00:00:00${tool.millCheck ? ':00': ''}`;
      widget.querySelector('.stopwatch__btn--start').textContent = `Start`;
    }
}

export function handleStopWatchInput(input) {
    const id = input.dataset.for;

    if(input.type === 'checkbox') {
        toolNamespace[id].millCheck = !toolNamespace[id].millCheck;
        if(toolNamespace[id].millCheck) {
            input.setAttribute('checked', 'true');
        } else {
            input.setAttribute('checked', 'false');
        }
        return;
    }
}

function startStopWatch(widget, intervalID) {
    const id = widget.id;
    const tool = toolNamespace[id];

    if(!document.querySelector(`[id="${id}"]`) || !tool) {
        clearInterval(intervalID);
        return; 
    }
    
    tool.millis++;

    if(tool.millis > 99) {
        tool.secs++;
        tool.millis = 0;
    }

    if(tool.secs > 59) {
        tool.mins++;
        tool.secs = 0;
    }
    
    if(tool.mins > 59) {
        tool.hours++;
        tool.mins = 0;
    }

    document.querySelector(`[id="${id}"]`).querySelector('.stopwatch__content').textContent = `${tool.hours < 10 ? '0' : ''}${tool.hours}:${tool.mins < 10 ? '0' : ''}${tool.mins}:${tool.secs < 10 ? '0' : ''}${tool.secs}${tool.millCheck ? `:${tool.millis < 10 ? '0' : ''}${tool.millis}` : ''}`;
}


export function handleStopWatchSettings(input, tool) {
    const content = tool.querySelector('.stopwatch__content');
    switch(input.id) {
        case 'fontColor':
             const label = tool.querySelector('.stopwatch__controls__label');
             content.style.color = `${input.value}`;
             label.style.color = `${input.value}`;
             break;
        case 'bgColor':
             const toolArea = tool.parentElement;
             toolArea.style.backgroundColor = `${input.value}`;
             break;
        case 'fontSize':
             if(input.value < 350 && input.value > 0) {
                content.style.fontSize = `${input.value/10}rem`;
             } else if (input.value < 1) {
                content.style.fontSize = `0.1rem`;
             } else {
                content.style.fontSize = `35rem`;
             }
             break;
    }
    input.setAttribute('value', `${input.value}`);
}

