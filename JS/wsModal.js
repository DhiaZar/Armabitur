import { toolSelect } from './workspace';

export function createModal() {
    const modal = document.createElement('div');
    modal.classList.add('ws-modal');
    
    const modalBtn = document.createElement('button');
    modalBtn.classList.add('ws-modal__btn');
    modalBtn.textContent = 'X';
    
    modal.append(modalBtn);
    
    const modalBackdrop = document.createElement('div');
    modalBackdrop.classList.add('ws-modal__backdrop');


    document.body.prepend(modal, modalBackdrop);

    setTimeout(function() {
        modal.style.visibility = 'visible';
        modalBackdrop.style.visibility = 'visible';
        modal.style.opacity = '1';
        modalBackdrop.style.opacity = '1';
    }, 300);
}


export function deleteModal() {
    const modal = document.querySelector('.ws-modal');
    const modalBackdrop = document.querySelector('.ws-modal__backdrop');

    modal.style.visibility = 'hidden';
    modalBackdrop.style.visibility = 'hidden';
    modal.style.opacity = '0';
    modalBackdrop.style.opacity = '0';

    if(toolSelect.parentElement === modal) {
        toolSelect.style.opacity = '0';
        toolSelect.style.visibility = 'hidden';
    }
    
    setTimeout(function() {
        if(toolSelect.parentElement === modal) {
            document.body.append(toolSelect);
        }
        
        document.body.removeChild(modal);
        document.body.removeChild(modalBackdrop);
    }, 300);
}