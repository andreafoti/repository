let product = {};
let comments = [];
let products = [];

function showImagesGallery(array){


    let htmlContentToAppend = `
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`;

    for (let i = 1; i < array.length; i++){
        htmlContentToAppend += `
        <li data-target="#carouselExampleIndicators" data-slide-to="` + i + `"></li>
        `
    }
    
    htmlContentToAppend += `
    </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="` + product.images[0] + `" class="d-block w-100" alt="...">
    </div>
    `
  
    for(let i = 1; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
        <img src="` + imageSrc + `" class="d-block w-100" alt="...">
        </div>
        `
    }

    htmlContentToAppend += `
    </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
    `

    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

function showComments(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comment = array[i];

        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ comment.score + `/5 </h4>
                        <small class="text-muted"> ` + comment.user + ` </small>
                        <small class="text-muted"> ` + comment.dateTime + ` </small>
                    </div>
                    <div>` + comment.description + `</div>
                </div>
            </div> 
        </div>`
    }
    document.getElementById("comm-list-container").innerHTML = htmlContentToAppend;
}

function addNewComment(event){
    event.preventDefault()
    var currentdate = new Date();
    let puntuacion = document.getElementById("puntuacion").value;
    let nuevoComentario = document.getElementById("nuevoComentario").value;
    let usuario = sessionStorage.getItem('correo');

    let htmlContentToAppend = `
    <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ puntuacion + `/5 </h4>
                        <small class="text-muted"> ` + usuario + ` </small>
                        <small class="text-muted"> ` + currentdate.getFullYear() + `-` + (currentdate.getMonth()+1) + `-`+ currentdate.getDay() + ` ` + currentdate.getHours() + `:` + currentdate.getMinutes() + `:` + currentdate.getSeconds() +` </small>
                    </div>
                    <div>` + nuevoComentario + `</div>
                </div>
            </div> 
    </div>`

    document.getElementById("comm-list-container").innerHTML += htmlContentToAppend;
    
}

function showRelatedProducts(array, productPosition){
    let relatedProduct = array[productPosition];
    let htmlContentToAppend = `
    <a href="product-info.html?selectedProd=` + relatedProduct.name + `" class="list-group-item list-group-item-action col-8">
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + relatedProduct.imgSrc + `">
            </div>
            <div>
                <h4 class="mb-1">` + relatedProduct.name + `</h4>
            <div>
            <div>` + relatedProduct.cost + relatedProduct.currency + `</div>
        </div>
    `
    document.getElementById("relatedProducts").innerHTML += htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");

            let params = new URLSearchParams(location.search);
            var selectedProd = params.get('selectedProd');
        
            productNameHTML.innerHTML = selectedProd;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            getJSONData(PRODUCTS_URL).then(function(resultObj){
                if (resultObj.status === "ok")
                {
                    products = resultObj.data;
                    showRelatedProducts(products, product.relatedProducts[0]);
                    showRelatedProducts(products, product.relatedProducts[1]);
                }
            })
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            comments = resultObj.data;
            
            showComments(comments);
        }
    });
});