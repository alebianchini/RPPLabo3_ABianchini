import Anuncio_Mascota from "../anuncio.js";

const anuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
const $formulario = document.forms[0];
const $divTabla = document.getElementById("divTabla");
const $submit = document.getElementById("btnSubmit");
const $btnEliminar = document.querySelector("#btnEliminar");
const $btnCancelar = document.querySelector("#btnCancelar");

console.log(anuncios);

window.addEventListener("DOMContentLoaded", ()=>{
    if(anuncios.length > 0){
        actualizarTabla(notifyCarga);
    }
});

window.addEventListener("click", (e)=>{
    if(e.target.matches("td")){
        cargarFormulario(anuncios.find((anuncio)=> anuncio.id == e.target.parentElement.dataset.id));
        if($btnEliminar.hasAttribute("hidden")){
            cambiarBotones();
        }
    }
    else if(e.target.matches("#btnEliminar")){
        bajaAnuncio(parseInt($formulario.txtId.value));
        limpiarFormulario();
    }
    else if(e.target.matches("#btnCancelar")){
        limpiarFormulario();
        notifyInfo();
    }
})

function actualizarStorage(data, notify){
    localStorage.setItem("anuncios", JSON.stringify(data));
    actualizarTabla(notify);
}

function crearTabla(data){
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const cabecera = document.createElement("tr");
    for (const key in data[0]) {
        if(key !== "id"){
            const th = document.createElement("th");
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            cabecera.appendChild(th);
        }
    }
    thead.appendChild(cabecera);
    tabla.appendChild(thead);

    data.forEach(element => {
        const tr = document.createElement("tr");
        for (const key in element) {
            if(key === "id"){
                tr.setAttribute("data-id", element[key]);
            }
            else{
                const td = document.createElement("td");
                td.textContent = element[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);

    return tabla;
}

function actualizarTabla(notify){
    agregarSpinner();
    setTimeout(()=>{
        while($divTabla.hasChildNodes()){
            $divTabla.removeChild($divTabla.firstElementChild);
        }
        const data = JSON.parse(localStorage.getItem("anuncios"));
        if(data){
            $divTabla.appendChild(crearTabla(anuncios));
        }
        eliminarSpinner();
        notify();
    },2000);
}

function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","./assets/spinner.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("divSpinner").appendChild(spinner);
}

function eliminarSpinner(){
    document.getElementById("divSpinner").innerHTML="";
}

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    const {txtId, txtTitulo, txtDescripcion, rdoAnimal, txtPrecio, txtRaza, txtNacimiento, txtVacuna} = $formulario;
    const formAnuncio = new Anuncio_Mascota(txtId.value, txtTitulo.value, "venta", txtDescripcion.value, txtPrecio.value, rdoAnimal.value, txtRaza.value, txtNacimiento.value, txtVacuna.value);
    
    if(formAnuncio.id === ''){
        formAnuncio.id = Date.now();
        altaAnuncio(formAnuncio);
    }
    else{
        modifAnuncio(formAnuncio);
        cambiarBotones();
    }
    $formulario.reset();
    $formulario.txtId.value = '';
})

function altaAnuncio(nuevoAnuncio){
    anuncios.push(nuevoAnuncio);
    actualizarStorage(anuncios, notifyAlta);
}

function modifAnuncio(nuevoAnuncio){
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id == nuevoAnuncio.id;
    });
    anuncios.splice(indice, 1, nuevoAnuncio);
    actualizarStorage(anuncios, notifyModificacion);
}

function bajaAnuncio(id){
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id == id;
    });
    anuncios.splice(indice, 1);
    actualizarStorage(anuncios, notifyBaja);
}

function cargarFormulario(anuncio) {
    const {txtId, txtTitulo, txtDescripcion, rdoAnimal, txtPrecio, txtRaza, txtNacimiento, txtVacuna} = $formulario;
    
    txtId.value = anuncio.id;
    txtTitulo.value = anuncio.titulo;
    txtDescripcion.value = anuncio.descripcion;
    rdoAnimal.value = anuncio.animal;
    txtPrecio.value = anuncio.precio;
    txtRaza.value = anuncio.raza;
    txtNacimiento.value = anuncio.nacimiento;
    txtVacuna.value = anuncio.vacuna;
}

function limpiarFormulario(){
    $formulario.reset();
    $formulario.txtId.value = '';
    cambiarBotones();
}

function cambiarBotones(){
    if($submit.value === "Guardar"){
        $submit.value = "Modificar"
    }
    else{
        $submit.value = "Guardar"
    }
    $btnEliminar.toggleAttribute("hidden");
    $btnCancelar.toggleAttribute("hidden");
}

function notify(type,message){
    (()=>{
      let n = document.createElement("div");
      let id = Math.random().toString(36).substr(2,10);
      n.setAttribute("id",id);
      n.classList.add("notification",type);
      n.innerText = message;
      document.getElementById("notification-area").appendChild(n);
      setTimeout(()=>{
        var notifications = document.getElementById("notification-area").getElementsByClassName("notification");
        for(let i=0;i<notifications.length;i++){
          if(notifications[i].getAttribute("id") == id){
            notifications[i].remove();
            break;
          }
        }
      },5000);
    })();
  }
  
  function notifyAlta(){
    notify("success","Alta de anuncio exitosa");
  }
  function notifyModificacion(){
    notify("success","Modificación de anuncio exitosa");
  }
  function notifyBaja(){
    notify("baja","Anuncio eliminado con éxito");
  }
  function notifyInfo(){
    notify("info","Selección cancelada");
  }
  function notifyCarga(){
    notify("info","Anuncios cargados");
  }