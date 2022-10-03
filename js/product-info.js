const DATA_PROD_INFO = PRODUCT_INFO_URL + localStorage.getItem("products_info") + EXT_TYPE;  //2) creo la constante concatenando la url de product info + el id de producto + la extension .json 
const DATA_PROD_COMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("products_info") + EXT_TYPE; //1*) creo otra constante esta vez para obtener la la url de los comentarios de cada producto
const CONTAINER_INFO = document.getElementById("container-info");
const CONTAINER_COMMENTS = document.getElementById("container-comments");
const CONTAINER_RELATED_PRODUCTS = document.getElementById("relatedProducts");

console.log(DATA_PROD_INFO);
console.log(DATA_PROD_COMMENTS);



document.addEventListener("DOMContentLoaded", function() {  //3) creo la funcion showInfo que agrega los datos del json al contenedor mediante innerHTML usando backticks 
    function showInfo(currentProductInfo) {
        
        CONTAINER_INFO.innerHTML += `
        <div class="m-4">
        <h2>${currentProductInfo.name}</h2> <br>
        <p><strong> Precio </strong></p>
        <p>${currentProductInfo.cost}</p>
        <p><strong> Descripción </strong></p>
        <p>${currentProductInfo.description}</p>
        <p><strong> Categoria </strong></p>
        <p>${currentProductInfo.category}</p>
        <p><strong> Cantidad de vendidos </strong></p>
        <p>${currentProductInfo.soldCount}</p>
        <p><strong> Imágenes ilustrativas </strong></p>

        <div class="row">

        <div class="col-md-4 p-2">
        <img class="img-thumbnail" src="${currentProductInfo.images[0]}"></img>
        </div>
        
        <div class="col-md-4 p-2">
        <img class="img-thumbnail" src="${currentProductInfo.images[1]}"></img>
        </div>
        
        <div class="col-md-4 p-2">
        <img class="img-thumbnail" src="${currentProductInfo.images[2]}"></img>
        </div>
        
        <div class="col-md-4 p-2">
        <img class="img-thumbnail" src="${currentProductInfo.images[3]}"></img>
        </div>
        
        </div> <br>

        </div>
        `


    }

    function showComments(currentProductComments) {    //2*) creo la funcion showComments que admite como parametro una lista de comentarios 

        let algo = "";    //creo un variable vacia 
        
        for (let coment of currentProductComments) {  //recorro el array de comentarios y para cada comentario le agrego con backtics la info requerida
          
            algo += `
        <div class="row">
        <div class="list-group-item" ><p><strong>${coment.user}</strong> ${coment.dateTime}</p>`

        for(let i = 0; i < 5; i++){    //para la parte del rateing que le dio el usuario al producto inicio un contador que compare i con coment.score y si es menor al coment.score me pinta una estrella 
            if (i < coment.score){
                algo += `<span class="fa fa-star checked"></span>`
            } else {
                algo += `<span class="fa fa-star"></span>` //si no solo hace la estrella
            }
          };
          
          algo+= ` 
          
          <p>${coment.description} </p> 
          
        </div>
        </div>
        `  
        CONTAINER_COMMENTS.innerHTML = algo; //agrego todo lo que puse dentro de "algo" al contenedor con innerHTML
        }
        
    }



    function showRelatedProducts(currentProductInfo) {

        for (let relatedProducts of currentProductInfo.relatedProducts) {

            CONTAINER_RELATED_PRODUCTS.innerHTML += `

            <div onclick="setInfoProd(${relatedProducts.id})" class="card" style="width: 18rem;">
    <img class="card-img-top" src="${relatedProducts.image}" alt="Card image cap">
    <div class="card-body">
    <p class="card-text">${relatedProducts.name}</p>
    </div>
    </div>
        `
        }

        

    }


    getJSONData(DATA_PROD_INFO).then(function(resultObj){   // 4) utilizando la funcion getJSONData obtengo los datos del json y los muestro en pantalla con la funcion showInfo creada anteriormente
        if (resultObj.status === "ok"){
            currentProductInfo = resultObj.data
            showInfo(currentProductInfo);
            showRelatedProducts(currentProductInfo);
        }
    });

    getJSONData(DATA_PROD_COMMENTS).then(function(resultObj){  // 3*) utilizando la funcion getJSONData obtengo los datos del json y los muestro en pantalla con la funcion showComments creada anteriormente
        if (resultObj.status === "ok"){
            currentProductComments = resultObj.data
            showComments(currentProductComments)
        }
    });

    
})

function setInfoProd(id) {     // 1) creo la funcion setInfoProd que va a guardar en local storage el id del producto con la clave products_info y redirige a product-info.html
    localStorage.setItem("products_info", id);
    window.location = "product-info.html"
}

// const stars = document.getElementById("stars");  

// function starRate(score) {  
//     let div = document.createElement("div");  //creo el div para colocar las 5 estrellas

//     for(let i = 0; i < 5; i++){  //creo contador de 0 hasta 5
//         let star = document.createElement("span") //creo etiqueta estrella

//         div.appendChild(star) ////div va a ser la etiqueta padre del span

//       if(i<score) {   //comparo el contador con el numero de score
//         star.className="fa fa-star checked" //si score es menor o igual a i entonces creo una clase que haga y pinte una estrella 
        
//         console.log("es menor o igual")
//       } else {
//         star.className="fa fa-star" //sino solo creo la estrella

//       console.log("es mayor")
//       }
       
//       console.log(div);
//     }
    
//     let container = document.getElementsByClassName("list-group-item");
    
     

// }


// let variable = fetch(DATA_PROD_INFO);
// console.log(variable);

// variable.then(function(response) {
// return response.json();
// })  

// .then(function(json){
// console.log(json);
// showInfo(json.product);
// })

