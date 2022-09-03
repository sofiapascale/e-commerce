const button = document.getElementById("button-iniciar");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("contraseña");
const form = document.getElementById("form");
const showError = document.getElementById("warning");


// button.addEventListener('click', (event) => {
//   // event.preventDefault();

//  window.location = "index.html"
// });

// button.addEventListener("click", () => {

//   if (inputCorreo.value) {
//     localStorage.setItem("usuario", inputCorreo.value);
//   } else {localStorage.removeItem("usuario")};
   
//   console.log(localStorage.getItem("usuario"))
// }) 


form.addEventListener("submit", e =>{
  e.preventDefault()

  const regularPhrase = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  let comeIn = false
  let error = ""


  if(!regularPhrase.test(inputCorreo.value)){
      comeIn = true
      error += "correo invalido <br>" 
  };

  if(inputPassword.value.length <= 8){
      comeIn = true
      error += "contraseña invalida"
  };
  
  if (comeIn == true) {
    showError.innerHTML += error 
    } else {
      window.location = "index.html"
      if (inputCorreo.value) localStorage.setItem("usuario", inputCorreo.value);
      
    }

});