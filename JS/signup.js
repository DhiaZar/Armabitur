const usernameInput = document.querySelector('#signup-username');
const passwordInput = document.querySelector('#signup-password');
const emailInput = document.querySelector('#signup-email');
const confirmPasswordInput = document.querySelector('#signup-confpassword');
const inputs = [...document.querySelectorAll('[id^="signup"]')];
const signBtn = document.querySelector('#signup-btn');

async function handleSignup(e) {
    e.preventDefault();
    
    const validForm = inputs.every(input => input.validity.valid);
    if(!validForm) return;
    
    console.log('Account Created');

    const account = {
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };
    const reponse = await fetch('http://127.0.0.1:8080/signup',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
            'X-Custom-Header': 'signup-Process'
        },
        body: JSON.stringify(account)
    });
    
} 

function handleInput() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const confPass = confirmPasswordInput.value;

    const validUn = !username.match(/[\! | \@ | \# | \& | \( | \) | \– | \[ | \{ | \} | \] | \: | \; | \‘ | \, | \? \/ | \* ]/) && username.length > 3;

    const validPass = password.length > 8 && !!password.match(/[a-z]/) && !!password.match(/[0-9]/);


    if(validUn) {
        usernameInput.setCustomValidity('');
    } else {
        usernameInput.setCustomValidity('Invalid Username');
    }
    if(validPass) {
        passwordInput.setCustomValidity('');
    } else {
        passwordInput.setCustomValidity('Invalid Password');
    }

    if(confPass === password) {
        confirmPasswordInput.setCustomValidity('');
    } else {
        confirmPasswordInput.setCustomValidity('Confirm Password');
    }
}

inputs.forEach(input => input.addEventListener('input', handleInput));
signBtn.addEventListener('click', handleSignup);


