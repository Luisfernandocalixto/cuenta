import { showMessage } from "/js/signup/message.js";
document.addEventListener('DOMContentLoaded', function () {

    // Capture the message of error of the URL
    const urlParamsSaved = window.location.search;
    let urlParamsConfig = urlParamsSaved.replace("signup?", "")
    let urlParams = new URLSearchParams(urlParamsConfig);
    const errorMessage = urlParams.get('error');
    const isError = decodeURI(errorMessage);
    if (errorMessage)  M.toast({ html: `<div class="toast-p">${showMessage({data: isError})}</div>` });
    let visible = document.getElementById('visible');
    let input = document.getElementById('password');
    let inputConfirm = document.getElementById('confirm_password');
    const buttonSubmit= document.querySelector('button[type="submit"]');
    



    visible.addEventListener('click', function () {
        if (input.type === 'password') {
            input.type = "text";
            inputConfirm.type = "text";
            visible.innerHTML = `<img src="/img/invisible.webp" alt="invisible">`
        }
        else {
            input.type = "password";
            inputConfirm.type = "password";
            visible.innerHTML = `<img src="/img/visible.webp" alt="visible">`

        }
    })

    let contentInfo = document.querySelector('label[for="password"]');
    let contentInfoConfirm = document.querySelector('label[for="confirm_password"]');
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    input.addEventListener('change', function () {
        // Validar la entrada del usuario y habilitar/deshabilitar el botón en consecuencia
        if (input.value.trim() !== '' & regex.test(input.value)) {
            buttonSubmit.disabled = false;
            contentInfo.textContent = 'Contraseña'
            input.style.borderBottomColor = '#1b7a2d ';
        } else {
            buttonSubmit.disabled = true;
            contentInfo.textContent = 'La contraseña debe contener letras, números y al menos un símbolo.';

            input.style.borderBottomColor = '#f44336';

        }
    });

    inputConfirm.addEventListener('change', function () {
        if (inputConfirm.value.trim() !== '' & regex.test(inputConfirm.value)) {
            buttonSubmit.disabled = false;
            contentInfoConfirm.textContent = 'Contraseña'
            inputConfirm.style.borderBottomColor = '#1b7a2d ';
        } else {
            buttonSubmit.disabled = true;
            contentInfoConfirm.textContent = 'La contraseña debe contener letras, números y al menos un símbolo.';

            inputConfirm.style.borderBottomColor = '#f44336';

        }
    });

})
