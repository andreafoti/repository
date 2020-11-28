function cambiarPerfil(event){
    // event.preventDefault()

    let nuevoNombre = document.getElementById("cambioNombresYApellidos").value;
    let nuevaEdad = document.getElementById("cambioEdad").value;
    let nuevoEmail = document.getElementById("cambioEmail").value;
    let nuevoTelefono = document.getElementById("cambioTelefono").value;

    sessionStorage.setItem("nuevoNombre", JSON.stringify(nuevoNombre));
    sessionStorage.setItem("nuevaEdad", JSON.stringify(nuevaEdad));
    sessionStorage.setItem("nuevoEmail", JSON.stringify(nuevoEmail));
    sessionStorage.setItem("nuevoTelefono", JSON.stringify(nuevoTelefono));
}

function escribirDatosPerfil(){
    let nombresYApellidos = JSON.parse(sessionStorage.getItem("nuevoNombre"));
    let edad = JSON.parse(sessionStorage.getItem("nuevaEdad"));
    let email = JSON.parse(sessionStorage.getItem("nuevoEmail"));
    let telefono = JSON.parse(sessionStorage.getItem("nuevoTelefono"));

    document.getElementById("nombresYApellidos").innerHTML = nombresYApellidos;
    document.getElementById("edad").innerHTML = edad;
    document.getElementById("email").innerHTML = email;
    document.getElementById("telefono").innerHTML = telefono;
}

escribirDatosPerfil()

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});