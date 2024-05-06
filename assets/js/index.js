import { Leon, Lobo, Oso, Serpiente, Aguila } from "./clases/Animales.js";
import data from "./data.js";

const boton = document.getElementById("btnRegistrar");
const animalesSeleccionados = [];
let animalesApi;

const cargarTabla = () => {
    const cargarInfo = document.getElementById("Animales");
    cargarInfo.innerHTML = "";
    // 6. manipulacion del DOM mostrar en la tabla los animales registrados
    animalesSeleccionados.forEach(animal => {
        cargarInfo.innerHTML += `
<div class="card" style="width: 18rem;">
  <img src="${animal.imagen}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${animal.nombre}</h5>
</div>
<div class="card-footer btn btn-secondary">
<button class="btn btn-dark" onclick= "emitirSonido('${animal.nombre}')"> <img height="30px" src= "./assets/imgs/audio.svg"> </img>
</button>
</div>
</div>`

    });
};

window.emitirSonido = (nombre) => {
    console.log(animalesSeleccionados)
    const animalEncontrado = animalesSeleccionados.find(animal => {
        return animal.nombre == nombre;

    });

    animalEncontrado.emitirSonido();
};

let inputAnimal = document.getElementById("animal");
inputAnimal.addEventListener("change", (event) => {
    let selectAnimal = event.target.value;
    let animalEncontrado = animalesApi.find(animal => {
        return animal.name == selectAnimal;
    });
    const preview = document.getElementById("preview");
    preview.style.backgroundImage = `url(./assets/imgs/${animalEncontrado.imagen})`
});
// utilizar una funcion async/await para realizar una consulta asincronica(se obtiene imagenes de los animales)
(async () => {
    animalesApi = await data.getAnimales();
})();

boton.addEventListener("click", async (event) => {
    event.preventDefault();

    const inputNombre = document.getElementById("animal");
    const inputEdad = document.getElementById("edad");
    const inputComentarios = document.getElementById("comentarios");

    const nombre = inputNombre.value;
    const edad = inputEdad.value;
    const comentarios = inputComentarios.value;

    // verificar!!!!
    let animalesApi = await data.getAnimales();
    console.log(animalesApi)

    // buscar en el array
    let animalFound = animalesApi.find(element => element.name == nombre);
    // opcional
    if (!animalFound) {
        return alert("Animal no existe.");
    }
    // validar que usuario introduzca todos los datos del animnal antes de agregarlo.
    if (nombre && edad && comentarios) {

        let nuevoAnimal;
        // 2. crear las instancias de la clases usando los datos del formulario
        switch (nombre) {
            case "Leon":
                nuevoAnimal = new Leon(animalFound.name, edad, "./assets/imgs/" + animalFound.imagen, comentarios, animalFound.sonido);
                break;
            case "Lobo":
                nuevoAnimal = new Lobo(animalFound.name, edad, "./assets/imgs/" + animalFound.imagen, comentarios, animalFound.sonido);
                break;
            case "Oso":
                nuevoAnimal = new Oso(animalFound.name, edad, "./assets/imgs/" + animalFound.imagen, comentarios, animalFound.sonido);
                break;
            case "Serpiente":
                nuevoAnimal = new Serpiente(animalFound.name, edad, "./assets/imgs/" + animalFound.imagen, comentarios, animalFound.sonido);
                break;
            case "Aguila":
                nuevoAnimal = new Aguila(animalFound.name, edad, "./assets/imgs/" + animalFound.imagen, comentarios, animalFound.sonido);
                break;
        };

        // 8. Se limpia formulario
        inputNombre.selectedIndex = 0;
        inputEdad.selectedIndex = 0;
        inputComentarios.value = "";

        animalesSeleccionados.push(nuevoAnimal)
        cargarTabla();
    } else {
        alert("Los datos deben ser completados")
    }
});

