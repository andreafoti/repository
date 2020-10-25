let cartArray = [];

function changeCount(i) {
    let valorCount = cartArray[i].unitCost * document.getElementsByClassName("cantidad")[i].value;
    document.getElementsByClassName("subtotal")[i].innerHTML = valorCount;
}

function showCartList(array) {
    console.log(array)
    let htmlContentToAppend = "";
    let container = document.getElementById("cart-list-container");
    for (let i = 0; i < array.length; i++) {
        let cartProduct = array[i];
        
        let valorCount = cartProduct.unitCost * cartProduct.count;
        console.log(cartProduct)

        if(cartProduct.currency == "USD"){
            valorCount *= 40;
        }
        
        htmlContentToAppend += `
        
            
                <div class="col-md-4">
                    <img src="`+ cartProduct.src + `" class="card-img">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title">` + cartProduct.name + `</h4>
                        <p class="card-text"><small class="text-muted">Precio unitario: ` + cartProduct.currency + ` ` + cartProduct.unitCost.toLocaleString() + ` </small></p>
                        <div> Cantidad: 
                            <input oninput="changeCount(`+ i +`)" class="cantidad form-control" type="number" value="` + cartProduct.count + `"> 
                        </div>
                        <h5 class="en-total">Total: UYU <span class="subtotal">` + valorCount.toLocaleString() + `</span></h5>
                    </div>
                </div>
            
        
        `
    }

    container.innerHTML = htmlContentToAppend;
    
}










//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            cartArray = resultObj.data.articles;
            //Muestro las categorías ordenadas
            showCartList(cartArray);
            hideSpinner();
        }
    });
});