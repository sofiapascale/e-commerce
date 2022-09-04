document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
    redirec();
});

const usuario = document.getElementById("userName"); // 2) traigo con DOM el elemento de id userName donde voy a colocar el valor de input correo

usuario.innerHTML = localStorage.getItem("usuario"); // 3) le agrego el valor de input correo guardado en local storage con key usuario para verlo en pantalla


// si no hay usuario no podes ir a la portada
function redirec() {
    if (localStorage.getItem("usuario") == undefined) {
        window.location="login.html";
    }
};