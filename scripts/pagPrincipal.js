import Anuncio_Mascota from "../anuncio.js";

const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
const $divAnuncios = document.getElementById("divAnuncios");

window.addEventListener("DOMContentLoaded", ()=>{
    cargarAnuncios(anuncios);
});

function cargarAnuncios(data){
    anuncios.forEach(element => {
        $divAnuncios.appendChild(crearAnuncio(element));
    });
}

function crearAnuncio(anuncio){
    const $articulo = document.createElement("article");
    const titulo = document.createElement("h2");
    const descripcion = document.createElement("p");
    const precio = document.createElement("p");
    const $divCaracteristicas = document.createElement("div");
    const amistoso = document.createElement("p");
    const sano = document.createElement("p");
    const rescatado = document.createElement("p");
    const $divDatos = document.createElement("div");
    const $divRaza = document.createElement("div");
    const imgRaza = document.createElement("img");
    const raza = document.createElement("p");
    const $divNacimiento = document.createElement("div");
    const nacimiento = document.createElement("p");
    const imgCigueña = document.createElement("img");
    const $divVacuna = document.createElement("div");
    const imgVacuna = document.createElement("img");
    const vacuna = document.createElement("p");
    const $boton = document.createElement("a");

    imgRaza.src = "./assets/cat_icon.png";
    raza.textContent = anuncio.raza;
    $divRaza.appendChild(imgRaza);
    $divRaza.appendChild(raza);
    imgCigueña.src = "./assets/cigueña_icon.png";
    nacimiento.textContent = anuncio.nacimiento;
    $divNacimiento.appendChild(imgCigueña);
    $divNacimiento.appendChild(nacimiento);
    imgVacuna.src = "./assets/vacuna_icon.png";
    vacuna.textContent = anuncio.vacuna;
    $divVacuna.appendChild(imgVacuna);
    $divVacuna.appendChild(vacuna);
    $divDatos.appendChild($divRaza);
    $divDatos.appendChild($divNacimiento);
    $divDatos.appendChild($divVacuna);
    $divDatos.setAttribute("id", "divDatos");
    titulo.textContent = anuncio.titulo;
    descripcion.textContent = anuncio.descripcion;
    precio.textContent = "PRECIO: $" + anuncio.precio;
    amistoso.textContent = "Amistoso: " + anuncio.amistoso;
    sano.textContent = "Sano: " + anuncio.sano;
    rescatado.textContent = "Rescatado: " + anuncio.rescatado;
    $divCaracteristicas.appendChild(amistoso);
    $divCaracteristicas.appendChild(sano);
    $divCaracteristicas.appendChild(rescatado);
    $divCaracteristicas.setAttribute("id", "divCaracteristicas")
    $boton.href = "#";
    $boton.textContent = "Ver Mascota";
    $boton.classList.add("button");


    $articulo.appendChild(titulo);
    $articulo.appendChild(descripcion);
    $articulo.appendChild(precio);
    $articulo.appendChild($divCaracteristicas);
    $articulo.appendChild($divDatos);
    $articulo.appendChild($boton);

    return $articulo;
}