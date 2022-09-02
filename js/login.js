const button = document.getElementById("button-iniciar");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("contraseña");

button.addEventListener('click', (event) => {
  // event.preventDefault();

 window.location = "index.html"
});

button.addEventListener("click", () => {

  if (inputCorreo.value) {
    localStorage.setItem("usuario", inputCorreo.value);
  } else {localStorage.removeItem("usuario")};
   
  console.log(localStorage.getItem("usuario"))
})

function showAlertSuccess() {
  document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
  document.getElementById("alert-danger").classList.add("show");
}

button.addEventListener("click", function (){

  const regularPhrase = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let comeIn = false


  if(!regularPhrase.test(inputCorreo.value)){
      comeIn = true
  };

  if(inputPassword.value.length <= 1){
      comeIn = true
  };

  if(comeIn){
      showAlertError();
  } else {
      showAlertSuccess();
  }

  console.log(comeIn)
});