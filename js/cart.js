const cotizacion = 40;
const standardShipping = 5
const expressShipping = 7
const premiumShipping = 15
const items = [];
const cart = {
    total: 0,
    // totalFinal: this.total + ((this.total * standardShipping)/100),  
    async inicializarCart() {
        await cargarContenido();
        this.dibujarContenido();
    },

    dibujarContenido() {
        let container = document.getElementById("cart-list-container");
        items.forEach(item => {
            const card = new cartItem().newCartItem(item);
            // por cada item, calculo el precio de la card          
            this.total += dolarAUyu(item)
            container.appendChild(card);
        });

        dibujarCartSummary(this.total)

        // dibujarCartFinalSummary(this.totalFinal)
    },

}

const dibujarCartSummary = (total) => {
    const summary = document.getElementById("cart-summary");
    summary.innerHTML = "Subtotal: " + new Intl.NumberFormat('uy-ES', { style: 'currency', currency: 'UYU' }).format(total);

    const finalSummary = document.getElementById("cart-final-summary");
    let totalWithShipping = "Total a pagar: " + new Intl.NumberFormat('uy-ES', { style: 'currency', currency: 'UYU' }).format(total + ((total * standardShipping)/100));
    finalSummary.innerHTML = totalWithShipping;

    document.getElementById("estandar").addEventListener("click", function(e){
        totalWithShipping = "Total a pagar: " + new Intl.NumberFormat('uy-ES', { style: 'currency', currency: 'UYU' }).format(total + ((total * standardShipping)/100));
        finalSummary.innerHTML = totalWithShipping;
    })

    document.getElementById("express").addEventListener("click", function(e){
        totalWithShipping = "Total a pagar: " + new Intl.NumberFormat('uy-ES', { style: 'currency', currency: 'UYU' }).format(total + ((total * expressShipping)/100));
        finalSummary.innerHTML = totalWithShipping;
    })

    document.getElementById("premium").addEventListener("click", function(e){
        totalWithShipping = "Total a pagar: " + new Intl.NumberFormat('uy-ES', { style: 'currency', currency: 'UYU' }).format(total + ((total * premiumShipping)/100));
        finalSummary.innerHTML = totalWithShipping;
    })
}

// const dibujarCartFinalSummary = (totalFinal) => {
//     const finalSummary = document.getElementById("cart-final-summary");
//     finalSummary.innerHTML = "Total: " + new Intl.NumberFormat('uy-ES', { style: 'currency', currency: 'UYU' }).format(totalFinal);
// }

const cargarContenido = async () => {
    showSpinner();
    const response = await getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json")
    items.push(...response.data.articles)
    hideSpinner();
}

const dolarAUyu = (item) => {
    if (item.currency == "USD") {
        return item.unitCost * cotizacion * item.count
    }
    return item.unitCost * item.count
}



document.addEventListener("DOMContentLoaded", function (e) {
    cart.inicializarCart();
});


//cartItem
const cartItem = function () {
    this.total = 0;
    this.item = null;
    
}

cartItem.prototype = {
    newCartItem(item) {
        this.item = item;       
        this.total = item.count * item.unitCost
        return this.dibujarCartItem();
    },
    dibujarCartItem() {
        const row = document.createElement("div");
        row.innerHTML = `
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="col-md-4"></div>
                    <div class="col-md-8"></div>                    
                </div>
            </div>
        </div>
        `;

        row.querySelector(".col-md-4").innerHTML = this.dibujarImagen();
        row.querySelector(".col-md-8").appendChild(this.dibujarBody())
        return row;
    },
    dibujarImagen() {
        return `         
            <img src="${this.item.src}" class="card-img">        
        `
    },
    dibujarBody() {
        const {
            name,
            currency,
            unitCost,
            count
        } = this.item;

        const colMd8 = document.createElement("div")
        colMd8.innerHTML = `
            <div class="card-body">
                <h4 class="card-title">${name}</h4>
                <p class="card-text"><small class="text-muted">Precio unitario: ${currency} ${unitCost.toLocaleString()}</small></p>
                <div> Cantidad: 
                    <input class="cantidad form-control" type="number" value="${count}" min="0" max="10"> 
                </div>
                <h5 class="en-total">Total: <span class="subtotal">${currency} ${this.total.toLocaleString()}</span></h5>
            </div>
        `;

        colMd8.querySelector(".subtotal").innerHTML = `${currency} ${this.item.unitCost * this.item.count}`

        colMd8.querySelector("input").addEventListener("input", (event) => {

            const subTotal = this.recalcularMonto(event.currentTarget.value || 0);

            if (this.total > subTotal) {
                debugger
                const saldo = cart.total - (this.total -subTotal )
                dibujarCartSummary(saldo);
            } else {
                debugger
                const saldo = cart.total + (subTotal - this.total )
                dibujarCartSummary(saldo);
            }


            colMd8.querySelector(".en-total").innerHTML = '';
            colMd8.querySelector(".en-total").innerHTML = `Total: <span class="subtotal">${currency} ${subTotal}</span>`
        });
        return colMd8;
    },
    recalcularMonto(currentValue) {
        return this.item.unitCost * parseInt(currentValue);
    },
}


function enviarDatos(event){
    event.preventDefault
    let numeroTarjeta = document.getElementById("numeroTarjeta").value;
    let fechaVencimiento = document.getElementById("fechaVencimiento").value;
    let codigoSeguridad = document.getElementById("codigoSeguridad").value;
    var currentDate = new Date();
    let año = parseInt(currentDate.getFullYear().toString().substring(2));
    let mes = (currentDate.getMonth()+1);
    let formatoFecha = /^[01-12]{2}\/\d{2}$/
    let formatoNumeroYCodigo = /^[0-9]+$/
    console.log(parseInt(fechaVencimiento.substring(0, 2)))
    try {
        if(numeroTarjeta.length < 13 || numeroTarjeta.length > 16){
            throw new Error("El número de tarjeta tiene que estar comprendido entre 13 y 16 dígitos")
            let numeroTarjeta = "incorrecto"
        }
        if(!formatoNumeroYCodigo.test(numeroTarjeta)){
            throw new Error("El número de tarjeta solo debe contener números")
        }
        if(!formatoFecha.test(fechaVencimiento)){
            throw new Error("El formato debe ser mm/aa")
        }
        if(parseInt(fechaVencimiento.substring(3)) < año){
            throw new Error("Su tarjeta está vencida")
        } else if(parseInt(fechaVencimiento.substring(3)) == año && parseInt(fechaVencimiento.substring(0, 2)) < mes){
            throw new Error("Su tarjeta está vencida")
        }
        if(codigoSeguridad.length != 3){
            throw new Error("El código de seguridad debe tener 3 dígitos")
        }
        if(!formatoNumeroYCodigo.test(codigoSeguridad)){
            throw new Error("El código de seguridad solo debe contener números")
        }

    } catch(error) {

        alert(error.message)
        event.preventDefault()
    }

}