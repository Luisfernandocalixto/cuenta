function showMessage({ data }) {
    if (data.includes('name invalid!')) return "Nombre inválido";
    if (data.includes('name empty!')) return "El nombre no puede estar vacio";
    if (data.includes('Incorrect Password')) return "Contraseña incorrecta";
    if (data.includes('Error start session')) return "Error al iniciar sesión";

    if (data.includes('email invalid!')) return "Email inválido";
    if (data.includes('email empty!')) return "El email no puede estar vacio";
    if (data.includes('password  invalid!')) return "Contraseña inválida ";
    if (data.includes('password empty!')) return "La contraseña no puede estar vacia";
    if (data.includes('Password and confirm password do not match')) return "Las contraseñas no coinciden";
    if (data.includes('Password must be at least 8 characters minim, have letters, numbers and symbol')) return "La contraseña debe contener letras, números y al menos un símbolo.";
    if (data.includes('mail already exist!')) return "Ya existe un usuario con ese email";

    return data;

}

export { showMessage };