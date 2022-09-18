const DATA_PROD_INFO = PRODUCT_INFO_URL + localStorage.getItem("products_info") + EXT_TYPE;
const DATA_PROD_COMMENTS = PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("products_info") + EXT_TYPE;
const CONTAINER_INFO = document.getElementById("container-info");
const CONTAINER_COMMENTS = document.getElementById("container-comments");

console.log(DATA_PROD_INFO);
console.log(DATA_PROD_COMMENTS);


document.addEventListener("DOMContentLoaded", function() {
    function showInfo(currentProductInfo) {
        
        CONTAINER_INFO.innerHTML += `
        <div>
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

        <div>
        <img class="img-fluid" src="${currentProductInfo.images[0]}"></img>
        <img class="img-fluid" src="${currentProductInfo.images[1]}"></img>
        <img class="img-fluid" src="${currentProductInfo.images[2]}"></img>
        <img class="img-fluid" src="${currentProductInfo.images[3]}"></img>
        </div>
        
        </div> <br>
        `


    }

    function showComments(currentProductComments) {    

        let algo = "";    //creo un variable vacia 
        
        for (let coment of currentProductComments) {  //recorro el array de comentarios y para cada comentario le agrego con backtics la info requerida
          
            algo += `
        <div class="row">
        <div class="list-group-item" ><p><strong>${coment.user}</strong> ${coment.dateTime}</p>`

        for(let i = 0; i < 5; i++){    //inicio un contador que compare i con coment.score y si es menos al coment.score me pinta una estrella 
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
        CONTAINER_COMMENTS.innerHTML = algo; //me agrega todo a la variable y lo imprime en pantalla
        }
        
    }

    getJSONData(DATA_PROD_INFO).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductInfo = resultObj.data
            showInfo(currentProductInfo)
        }
    });

    getJSONData(DATA_PROD_COMMENTS).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductComments = resultObj.data
            showComments(currentProductComments)
        }
    });

    
})

const stars = document.getElementById("stars");  

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

