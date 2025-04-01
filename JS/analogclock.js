
export function createAnalogClock(widgetToolArea) {
    const id = widgetToolArea.parentElement.id;

    const html =  /*html*/` 
        <div class="analogclock">
            <div class="analogclock__face">
                <button data-for="${id}" title="Settings" class="tool-settings__btn analogclock__btn--settings"></button>
                <div class="analogclock__hour"></div>
                <div class="analogclock__min"></div>
                <div class="analogclock__sec"></div>
            </div>
            <div class="tool-settings__container">
                <button data-for="${id}" class="tool-settings__close-btn">X</button>
                <p>Settings</p>
                <label for="borderColor" class="tool-settings__label">Change Border Color:</label>
                <input id="borderColor" type="color" value="#000000">
                <label for="size" class="tool-settings__label">Change Clock Size:</label>
                <input id="size" type="number" min="100" max="500" value="100">
            </div>
        </div>
    `;

    widgetToolArea.innerHTML = html;

    const intervalID = setInterval(() => startAnalogClock(widgetToolArea), 1000);
}


function startAnalogClock(widgetToolArea, intervalID) {
    const id = widgetToolArea.parentElement.id;
    
    if(!document.querySelector(`[id="${id}"]`)) {
        clearInterval(intervalID);
        return; 
    }

    const deg = 6;
    const hourHand = document.querySelector(`[id="${id}"]`).querySelector('.analogclock__hour');
    const minHand = document.querySelector(`[id="${id}"]`).querySelector('.analogclock__min');
    const secHand = document.querySelector(`[id="${id}"]`).querySelector('.analogclock__sec');

    const day = new Date();
    const hh = day.getHours() * 30;
    const mm = day.getMinutes() * deg;
    const ss = day.getSeconds() * deg;

    hourHand.style.transform = `rotateZ(${(hh) + (mm / 12) + 180}deg)`;
    minHand.style.transform = `rotateZ(${mm + 180}deg)`;
    secHand.style.transform = `rotateZ(${ss + 180}deg)`;
}

export function handleAnalogClockSettings(input, tool) {
    const clockFace = tool.querySelector('.analogclock__face');
    switch(input.id) {
        case 'borderColor':
            clockFace.style.borderColor = `${input.value}`;
            break;
        case 'size':
             const hourHand = tool.querySelector('.analogclock__hour');
             const minHand = tool.querySelector('.analogclock__min');
             const secHand = tool.querySelector('.analogclock__sec');
                   
             if(input.value < 500 && input.value > 100) {
               clockFace.style.width = `${input.value/10}rem`;
               clockFace.style.height = `${input.value/10}rem`;

               hourHand.style.height = `${input.value/66.6666}rem`;
               hourHand.style.width = `${input.value/1000}rem`;
               minHand.style.height = `${input.value/40}rem`;
               minHand.style.width = `${input.value/1000}rem`;
               secHand.style.height = `${input.value/33.3333}rem`;
               secHand.style.width = `${input.value/1000}rem`;

             } else if (input.value <= 100) {
               clockFace.style.width = `10rem`;
               clockFace.style.height = `10rem`;

               hourHand.style.width = `.1rem`;
               hourHand.style.height = `1.5rem`;
               minHand.style.width = `.1rem`;
               minHand.style.height = `2.5rem`;
               secHand.style.width = `.1rem`;
               secHand.style.height = `3rem`;

             } else {
               clockFace.style.width = `50rem`;
               clockFace.style.height = `50rem`;

               hourHand.style.width = `.5rem`;
               hourHand.style.height = `7.5rem`;
               minHand.style.width = `.5rem`;
               minHand.style.height = `12.5rem`;
               secHand.style.width = `.5rem`;
               secHand.style.height = `15rem`;
             }
             break;
        }
    input.setAttribute('value', `${input.value}`);
}