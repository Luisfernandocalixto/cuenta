document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form');

    M.toast({ html: 'Por favor, Ingrese correo y contraseña' })

    // Capture the message of error of the URL
    const urlParamsSaved = window.location.search;
    let urlParamsConfig = urlParamsSaved.replace("signin?", "")
    let urlParams = new URLSearchParams(urlParamsConfig);
    const errorMessage = urlParams.get('error');
    const infoMessage = urlParams.get('success');
    if (errorMessage) {
        M.toast({ html: `<div class="toast-p">${decodeURI(errorMessage)}</div>` })
    }
    if (infoMessage) {
        M.toast({ html: `<div class="toast-s">${decodeURI(infoMessage)}</div>` })
    }


    let visible = document.getElementById('visible')
    let input = document.getElementById('password')

    visible.addEventListener("click", function () {
        if (input.type === 'password') {
            input.type = "text";
            visible.innerHTML = `<img src="/invisible.webp" alt="invisible">`
        } else {
            input.type = 'password'
            visible.innerHTML = `<img src="/visible.webp" alt="visible">`
        }

    });

    form.addEventListener('change', function (e) {
        e.preventDefault();


        if (input.value.trim() === '' || input.value === '' || input.value.length === 0) {
            form.querySelector('button[type="submit"]').disabled = true;
        }
        else {
            form.querySelector('button[type="submit"]').disabled = false;

        }


    })


});