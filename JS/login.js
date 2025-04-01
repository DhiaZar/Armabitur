const form = document.querySelector('.authentication-form');
const modal = document.querySelector('.forgot__container');
const forgotBtn = document.querySelector('#forgotBtn');
const closeBtn = document.querySelector('.forgot__close-btn');


function handleOpenPopUp() {
    modal.classList.add('openModal');
    form.classList.add('blurForm');
}

function handleClosePopUp() {
    modal.classList.remove('openModal');
    form.classList.remove('blurForm');
}


forgotBtn.addEventListener('click', handleOpenPopUp);
closeBtn.addEventListener('click', handleClosePopUp);