let product = {};
let comments = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

    }
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
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            comments = resultObj.data;
            
            showComments(comments);
        }
    });
});