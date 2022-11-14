const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(){
  
  menu();

  document.getElementById("cerrar-sesion").addEventListener("click", function() {  //3)
      window.location = "login.html"
      
  });
});

const container_usuario = document.getElementById("userName");

function menu() {   //2)
  container_usuario.innerHTML += `
  <div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  ${userValue.email} 
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" href="my-profile.html" id="my-profile" onclick="pleaseLogIn()" onclick="showEmail()">Mi perfil</a></li>
  <li><a class="dropdown-item" href="cart.html">Carrito</a></li>
  <li><a id="cerrar-sesion" class="dropdown-item" href="login.html">Cerrar sesión</a></li>
</ul>
</div>
  `
}
let user_id = localStorage.getItem("userid") //3) obtengo el dato guardado en local storage como userid para traer el valor del usuario logueado
let userValue = JSON.parse(localStorage.getItem(`usuario${user_id}`)) // OBJETO - obtengo el objeto con la info del usuario
//LO TRAIGO EN INIT PORQUE ESTAN TODAS LAS PAGINAS LINKEADAS A ESTA Y NO TENGO QUE REPETIR CODIGO

