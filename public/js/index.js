document.addEventListener('DOMContentLoaded', function () {
    // Instances sideMenu 
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    M.toast({ html: 'Hola bienvenido, inicie sesión o cree una cuenta' });


});
