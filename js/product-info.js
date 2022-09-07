const DATA_PROD_INFO = PRODUCT_INFO_URL + localStorage.getItem("products_info") + EXT_TYPE;
const CONTAINER_INFO = document.getElementById("container-info");

console.log(DATA_PROD_INFO);


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
        <img class="img-fluid" width=max-width: 100% height: auto; src="${currentProductInfo.images[0]}"></img>
        <img class="img-fluid" max-width: 100% height: auto; src="${currentProductInfo.images[1]}"></img>
        <img class="img-fluid" max-width: 100% height: auto; src="${currentProductInfo.images[2]}"></img>
        <img class="img-fluid" max-width: 100% height: auto; src="${currentProductInfo.images[3]}"></img>
        </div>
        
        </div>
        `
    }

    getJSONData(DATA_PROD_INFO).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductInfo = resultObj.data
            showInfo(currentProductInfo)
        }
    });
})



// let variable = fetch(DATA_PROD_INFO);
// console.log(variable);

// variable.then(function(response) {
// return response.json();
// })  

// .then(function(json){
// console.log(json);
// showInfo(json.product);
// })

