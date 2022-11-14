const button = document.getElementById("button-iniciar");
const inputCorreo = document.getElementById("correo");
const inputPassword = document.getElementById("contraseña");
const form = document.getElementById("form");
const showError = document.getElementById("warning");
let user_id = localStorage.getItem("userid");
let userValue = JSON.parse(localStorage.getItem(`usuario${user_id}`));

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


  if(!regularPhrase.test(inputCorreo.value)){ //condicion correo que al ser verdadera muestra error
      comeIn = true
      error += "correo invalido <br>" 
  };

  if(inputPassword.value.length <= 8){  //condicion contraseña que al ser verdadera muestra error
      comeIn = true
      error += "contraseña invalida"
  };
  
  if (comeIn == true) {    // condicion si comeIn es verdadera entonces agrego mensaje de error, de lo contrario me lleva a la pantalla inicio y se guarda el valor en local storage
    showError.innerHTML += error 
    } else {
      let same_user = JSON.parse(localStorage.getItem(`usuario${inputCorreo.value}`))
      if (same_user !== null) {
        user_id = inputCorreo.value
        localStorage.setItem("userid", user_id);
      }
      if (inputCorreo.value && (userValue == null || user_id !== inputCorreo.value) && same_user == null) { //1) si el correo ingresado es distinto al ya ingresado anteriormente
        let userInfo = {                                                                                    // entonces creo un objeto donde voy a guardar la info del usuario
          firstname: "",
          secondname: "",
          lastname: "",
          secondlastname: "",
          email: inputCorreo.value,
          contactnumber: ""
        }
        let userId = inputCorreo.value; // creo la variable userId para los correos de los usuarios
        localStorage.setItem("userid", userId); // guardo el correo en local storage como un id unico para cada usuario
        localStorage.setItem(`usuario${userId}`, JSON.stringify(userInfo));  // OBJETO - guardo el objeto userInfo con una key dinamica para poder modificarlo con la info de los usuarios cada vez que uno nuevo ingrese
      } 
      window.location = "index.html" // 2) y si no me lleva a index 
    }

});