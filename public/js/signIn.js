import { showMessage } from "./signin/message.js";
document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form');    
    M.toast({ html: 'Por favor, Ingrese correo y contraseña' })

    // Capture the message of error of the URL
    const urlParamsSaved = window.location.search;
    let urlParamsConfig = urlParamsSaved.replace("signin?", "")
    let urlParams = new URLSearchParams(urlParamsConfig);
    const errorMessage = urlParams.get('error');
    const infoMessage = urlParams.get('success');
    if (errorMessage) M.toast({ html: `<div class="toast-p">${showMessage({data: decodeURI(errorMessage)})}</div>` });
    
    if (infoMessage)  M.toast({ html: `<div class="toast-s">${showMessage({data: decodeURI(infoMessage)})}</div>` });


    let visible = document.getElementById('visible');
    let input = document.getElementById('password');

    visible.addEventListener("click", input, null, visible);

    form.addEventListener('change', function (e) {

        if (input.value.trim() === '' || input.value === '' || input.value.length === 0) {
            form.querySelector('button[type="submit"]').disabled = true;
        }
        else {
            form.querySelector('button[type="submit"]').disabled = false;

        }


    })

    const button = form.querySelector('button[type="submit"]');
    const inputEmail = form.querySelector('input[name="email"]');
    const inputPassword = form.querySelector('input[name="password"]');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        button.disabled = true;
        fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: inputEmail.value.trim(), password: inputPassword.value.trim() })
        })
            .then(res => {
                if (res.ok) {                    
                    window.location.href = '/notes';
                } else {
                    return res.text();
                }
            })
            .then(data => {
                if (data) M.toast({ html: `<div class="toast-p">${showMessage({data})}</div>` });
            })
        .finally(() => {
            button.disabled = false;
            form.reset();
            })


    });


});