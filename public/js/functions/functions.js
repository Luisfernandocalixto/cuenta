export function showPassword(input, inputConfirm, visible) {
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
}