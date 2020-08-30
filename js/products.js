let productsArray = []

function showProductsList(array) {
    console.log(array)
    let htmlContentToAppend = "";
    let container = document.getElementById("prod-list-container");
    for (let i = 0; i < array.length; i++) {
        let product = array[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name + `</h4>
                        <small class="text-muted"> USD ` + product.cost + ` </small>
                    </div>
                    <div>` + product.description + `</div>
                </div>
            </div>
        </div>
        `
    }
    container.innerHTML = htmlContentToAppend;
}

function showFilteredProductsList(array) {
    let htmlContentToAppend = "";
    try {
        
        let precioMinimo = parseInt(document.getElementById("min").value);
        let precioMaximo = parseInt(document.getElementById("max").value);

        if (precioMinimo >= precioMaximo) {            
            throw new Error("El precio mínimo no puede ser mayor que el precio máximo.")
        }
        let filteredProducts = array.filter(element => element.cost >= precioMinimo && element.cost <= precioMaximo)

        if(!filteredProducts.length) {
            throw new Error("No se han encontrado productos con los filtros seleccionados.")
        }

        let container = document.getElementById("prod-list-container");
        for (let i = 0; i < filteredProducts.length; i++) {
            let product = filteredProducts[i];
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                     </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted"> USD ` + product.cost + ` </small>
                        </div>
                        <div>` + product.description + `</div>
                    </div>
                </div>
            </div>
            `
        }
        container.innerHTML = htmlContentToAppend;
    } catch (error) {
        
        alert(error.message)
    }

}

const ORDER_ASC_BY_COST = "$Menor a mayor$";
const ORDER_DESC_BY_COST = "$Mayor a menor$";
const ORDER_BY_SOLD_COUNT = "Relevancia"

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);
            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
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

function showSortedProducts(sortCriteria, array){
    array = sortProducts(sortCriteria, array);

    showProductsList(array);
}

function fillSortedProducts(sortCriteria, event) {
    showSpinner();
    event.preventDefault();
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showSortedProducts(sortCriteria, productsArray);
            hideSpinner();
        }
    });
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
            hideSpinner();
        }
    });

    document.getElementById("filterButton").addEventListener("click", function(){
        fillProductsList(event)
    })

    document.getElementById("sortCostAsc").addEventListener("click", function(){
        fillSortedProducts(ORDER_ASC_BY_COST, event);
    })

    document.getElementById("sortCostDesc").addEventListener("click", function(){
        fillSortedProducts(ORDER_DESC_BY_COST, event);
    })

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        fillSortedProducts(ORDER_BY_SOLD_COUNT, event);
    })
});

function fillProductsList(event) {
    showSpinner();
    event.preventDefault();
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showFilteredProductsList(productsArray);
            hideSpinner();
        }
    });
}
