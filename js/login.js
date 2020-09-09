//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
});

function onSubmit(event){
    event.preventDefault()
    let email = document.querySelector('#correo').value;
    console.log(email);
    let password = document.querySelector("#password").value;
    if(email != "" && password !=""){
        window.location = "index.html";
        sessionStorage.setItem('isLogged', 'true');
        sessionStorage.setItem('correo', email);
    }
    
}