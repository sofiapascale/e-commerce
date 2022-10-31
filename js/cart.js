
let CART_PRODUCTS = CART_INFO_URL + "25801" + EXT_TYPE; // 1)

let container_cart = document.getElementById("container-cart"); // 2)

let articles = [] // 3)


console.log(CART_PRODUCTS);

document.addEventListener("DOMContentLoaded", function() {

getJSONData(CART_PRODUCTS).then(function(resultObj){  // 5) 
    if (resultObj.status === "ok"){
        articles = resultObj.data.articles
        console.log(articles)
        showInCart(articles);
        
    }
    
});

})

function showInCart(array) {  // 4)
    for(let item of array) {
        container_cart.innerHTML +=
        `<div class="col-2 mb-2" id="image"><img src="${item.image}" width="120"></img></div>
        <div class="col-2" id="name"><p>${item.name}</p></div>
        <div class="col-2" id="cost"><p>${item.currency} <span id="unit-cost">${item.unitCost}</span></p></div>
        <div class="col-2"><input oninput="subtotal()" class="col-2" type="number" id="quantity" name="quantity" min="1" value="0" max="20"></div>
        <div class="col-2"><span class="currency">${item.currency} </span><span id="sub">${item.unitCost}</span></div>
        <hr style="width:90%"></hr>`
        
    }
   
}

let street = document.getElementById("calle");
let number = document.getElementById("numero");
let corner = document.getElementById("esquina");


document.getElementById("finish-button").addEventListener("click", function() {
    if ((street.value != undefined) && (number.value!= undefined) && (corner.value!= undefined) && (CREDIT_RADIO.checked || TRANSFER_RADIO.checked)) {
        document.getElementById("succes-buy").className = "alert alert-success"
    document.getElementById("succes-text").textContent = "Su compra se realizo con exito"
    }

})

function subtotal() { // 6)

    let quantity = parseInt(document.getElementById("quantity").value) // accedo con dom al valor de quantity y lo transformo a numero entero con parseInt
    
    let cost = parseInt(document.getElementById("unit-cost").innerHTML);  //accedo mediante innerHTML al valor de cost y lo transformo a numero entero con parseInt
    
    let sub = document.getElementById("sub"); // obtengo con dom el contenedor donde quiero poner el subtotal y le agrego con inner HTML la formula 

    sub.innerHTML = 
    isNaN(quantity) //hago un ternario que tiene como condicion que si en NaN (not a number) entonces me ponga un 0 y si no me haga la cuenta
    ? "0"
    : (quantity*cost);

    subTotalGeneral(); 

}

    let premium = document.getElementById("premium");
    let express = document.getElementById("express");
    let standard = document.getElementById("standard");

function subTotalGeneral() {

    let subtotal = document.getElementById("sub").innerText; // 1) traigo el valor del subtotal del carrito

    let subtotal_general = document.getElementById("subtotal"); // 2) traigo el contenedor de donde quiero imprimir el subtotal general

    let total_general = document.getElementById("total"); // 3) traigo el contenedor donde imprimo el total

    

    let shipping = document.getElementById("shipping-cost");
    
    subtotal_general. innerHTML = subtotal; // 4) segun el tipo de envio seleccionado calculo el costo de envio 

    if (premium.checked) {
        shipping.innerHTML = subtotal*0.15
    } else if (express.checked) {
        shipping.innerHTML = subtotal*0.07
    } else if (standard.checked) {
        shipping.innerHTML = subtotal*0.05
    }

    total_general.innerHTML = parseFloat(subtotal_general.innerText) + parseFloat(shipping.innerText); // 5) sumo los dos valores y lo agrego al contenedor del total
    
}

function validateShippingType() { 

    let ShippingAlert = document.getElementById("feedback-shipping-type");

    let not_selected = false

    if (!premium.checked && !express.checked && !standard.checked){
        not_selected = true
        ShippingAlert.innerText = `Debe seleccionar un tipo de envio`
        ShippingAlert.style.color = "red"
        console.log("debe seleccionar un tipo de envio");
    } else {
        ShippingAlert.innerText = ""
    }

}

let CREDIT_RADIO = document.getElementById("credit");

let card_number = document.getElementById("card-number");
let card_code = document.getElementById("card-code");
let card_expiration = document.getElementById("card-expiration");

let TRANSFER_RADIO = document.getElementById("transfer");

let account_number = document.getElementById("account");

let feedback_container = document.getElementById("feedback-container");

function validatePayment() {
    
    if (CREDIT_RADIO.checked) {
        feedback_container.innerText = `Tarjeta de credito`;
        feedback_container.style.color = "black"
        card_number.disabled = false
        card_code.disabled = false
        card_expiration.disabled = false
        account_number.disabled = true

    } else if (TRANSFER_RADIO.checked) {
        feedback_container.innerText = `Transferencia bancaria`;
        feedback_container.style.color = "black"
        account_number.disabled = false
        card_number.disabled = true
        card_code.disabled = true
        card_expiration.disabled = true


    } else if (!CREDIT_RADIO.checked & !TRANSFER_RADIO.checked) {
        feedback_container.innerText = `Debe ingresar un metodo de pago`;
        feedback_container.style.color = "red"
    };

}


(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');

  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms) 
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {

            validatePayment()
            validateShippingType()

          if (!form.checkValidity()) { //
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated') //muestra todas las validaciones
        }, false)
      })
  })()