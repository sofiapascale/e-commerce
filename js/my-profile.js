let my_profile_button = document.getElementById("my-profile");


let first_name = document.getElementById("first-name");
let second_name = document.getElementById("second-name");
let last_name = document.getElementById("lastname");
let second_lastname = document.getElementById("second-lastname");
let email_input = document.getElementById("email");
let contact_number = document.getElementById("contact-number");

document.addEventListener("DOMContentLoaded", function() {
    pleaseLogIn()
    showUserInfo()

})


function pleaseLogIn() {
    if (userValue == undefined) {
      window.location = "login.html"
    }
    
}

function showUserInfo() {  //4) si el objeto existe (el usuario ya modifico los datos del perfil) los campos se van a completar con la info del usuario
    if (userValue !== undefined) {
        email_input.value = userValue.email;
        first_name.value = userValue.firstname;
        second_name.value = userValue.secondname;
        last_name.value = userValue.lastname;
        second_lastname.value = userValue.secondlastname;
        contact_number.value = userValue.contactnumber;
    }
}

function setUserInfo() { //5) si el usuario modifica los campos al dar click al boton guardar se guarda en el objeto el nuevo valor del input 
  if(userValue.email !== email_input.value) {
    let old_userid = user_id // se asigno a la variable old user el valor del id actual
    user_id = email_input.value // seteo el nuevo valor del user id actual
    userValue.email = email_input.value // modifico el valor del input email con el nuevo valor 
    localStorage.removeItem(`usuario${old_userid}`);
    localStorage.setItem("userid", user_id);
    
  }


  userValue.firstname = first_name.value 
  userValue.secondname = second_name.value
  userValue.lastname = last_name.value
  userValue.secondlastname = second_lastname.value
  userValue.contactnumber = contact_number.value
  localStorage.setItem(`usuario${user_id}`, JSON.stringify(userValue))
}


// function saveInfo() {
//   if (user_value !== undefined) {
//     email_input.value = user_value;
// }
// }

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms) 
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          
          setUserInfo()

          if (!form.checkValidity()) { //
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated') //muestra todas las validaciones
        }, false)
      })
  })()