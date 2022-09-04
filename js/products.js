const DATA_URL = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE ; //concateno la url de products con los identificadores obtenidos de local storage y la extension .json para que me muestre cualquier producto que seleccione


// const DATA_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; // url que contiene los datos a mostrar en la pagina


const container_cars = document.getElementById("products-list"); // accedemos mediante DOM al contenedor de id "products-list" para luego colocar los datos adentro 

// se crea la funcion showProducts que recibe por parametro los datos que se mostraran en DOM
// los datos se mostraran dentro del div con id container_cars y por cada item se crea una nueva division (usando "backticks") donde se imprimen los campos requeridos en la consigna. 
/* function showProducts(dataArray) {

  for (const item of dataArray){
      container_cars.innerHTML += `
      <div onclick="setCatID(${item.id})" class="list-group-item list-group-item-action cursor-active">
          <div class="row">
              <div class="col-3">
                  <img src="${item.image}" alt="${item.description}" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">${item.name} ${item.currency} ${item.cost}</h4>
                      <small class="text-muted">${item.soldCount} artículos</small>
                  </div>
                  <p class="mb-1">${item.description}</p>
              </div>
          </div>
      </div>
      `
      
  }
} */

// creamos una variable "variable" y la igualamos a la funcion fetch que recibe como parametro la url que necesitamos
// la funcion fetch retorna una promesa de que vamos a recibir un objeto response
// accedemos al entonces de la promesa con otra funcion que nos retorne la promesa response.json()
// encadenamos otro etonces para la ultima promesa y como promesa recibe lo que retornamos anteriormente
// nos devuelve solo los products del json
let variable = fetch(DATA_URL);
console.log(variable);

variable.then(function(response) {
return response.json();
})  

.then(function(json){
console.log(json);
showProducts(json.products);
})



const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortCategories(criteria, array){ //tengo una funcion que me ordena los elementos del array y los agrega a una lista vacia 
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {      //de mayor a menor precio
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){    //de menor a mayor precio
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){     //mas vendidos a menos vendidos
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setCatID(id) {     
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showCategoriesList(){   //funcion que muestra la lista de productos en un html usando backticks segun lo que el usuario ingrese en micount y maxcount, y si no ingresa nada se muestran todos los productos. 

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.image}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name+" "+category.currency+" "+category.cost}</h4>
                            <small class="text-muted">${category.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){ //funcion que me admite como parametro un orden que el usuario elija en el evento 
    currentSortCriteria = sortCriteria;                        //y un array y me iguala el array a la funcion sortCategories que me va a ordenar esa lista.
    if(categoriesArray != undefined){                          //y luego la muestra con showCategoriesList()
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){      
    getJSONData(DATA_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentCategoriesArray = resultObj.data.products
            showCategoriesList()
            //sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){      //le agrego un evento de escucha para cada orden que aplica la funcion sortAndShowCategories
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){  //click que iguala el valor del input a vacio para el boton limpiar
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){   //click que establece una condicion y filtra los productos segun los valores en los inputs
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});