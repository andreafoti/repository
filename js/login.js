//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
});

function onSubmit(event){
    event.preventDefault()
    const email = document.querySelector("#correo").nodeValue;
    const password =document.querySelector("#password").nodeValue;
    if(email != "" && password !=""){
        window.location = "index.html";
        sessionStorage.setItem('isLogged', 'true');
    }
    
}