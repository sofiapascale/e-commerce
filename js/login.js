const button = document.getElementById("button-iniciar");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("contraseña");

button.addEventListener('click', (event) => {
  event.preventDefault();

 window.location = "main.html"
});

button.addEventListener("click", () => {

  if (inputCorreo.value) {
    localStorage.setItem("usuario", inputCorreo.value);
  } else {localStorage.removeItem("usuario")};
   
  console.log(localStorage.getItem("usuario"))
})

