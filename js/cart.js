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
        <div class="col-2"><input oninput="cuenta()" class="col-2" type="number" id="quantity" name="quantity" min="1" max="20"></div>
        <div class="col-2"><span class="currency">${item.currency} </span><span id="sub"> 0 </span></div>
        <hr style="width:90%"></hr>`
        
    }
   
}


function cuenta() { // 6)

    let quantity = parseInt(document.getElementById("quantity").value) // accedo con dom al valor de quantity y lo transformo a numero entero con parseInt
    
    let cost = parseInt(document.getElementById("unit-cost").innerHTML);  //accedo mediante innerHTML al valor de cost y lo transformo a numero entero con parseInt
    
    let subtotal = document.getElementById("sub"); // obtengo con dom el contenedor donde quiero poner el subtotal y le agrego con inner HTML la formula 

    subtotal.innerHTML = 

    isNaN(quantity) //hago un ternario que tiene como condicion que si en NaN (not a number) entonces me ponga un 0 y si no me haga la cuenta
    ? "0"
    : (quantity*cost)

    
    
}
