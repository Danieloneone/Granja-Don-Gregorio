// FORMULARIO

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    alert("¡Gracias por contactarte con Granja Don Gregorio! Te responderemos pronto.");

    form.reset();

});


// EFECTO NAVBAR

window.addEventListener("scroll", function(){

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.style.background = "rgba(0,0,0,0.75)";
    } else {
        navbar.style.background = "rgba(0,0,0,0.4)";
    }

});