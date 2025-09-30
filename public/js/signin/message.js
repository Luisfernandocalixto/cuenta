function showMessage({ data }) {
    if (data.includes("Not user found")) return "El usuario no existe";
    if (data.includes('Incorrect Password')) return "Contraseña incorrecta";
    if (data.includes('Error start session')) return "Error al iniciar sesión";
    
    // message success 
    if (data.includes('account created!')) return "Cuenta creada exitosamente!";
    
    return "Error al iniciar sesión";

}

export { showMessage };