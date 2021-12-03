class Anuncio{

    constructor(id,titulo,transaccion,descripcion,precio){
        this.id = id ;
        this.titulo = titulo ;
        this.transaccion = transaccion ;
        this.descripcion = descripcion ;
        this.precio = precio ;
        
    }
}

export default class Anuncio_Mascota extends Anuncio {

    constructor(id,titulo,transaccion,descripcion,precio,amistoso,sano,rescatado,animal,raza,nacimiento,vacuna) {
        super(id,titulo,transaccion,descripcion,precio);
        this.animal = animal;
        this.amistoso = amistoso;
        this.sano = sano;
        this.rescatado = rescatado;
        this.raza = raza;
        this.nacimiento = nacimiento;
        this.vacuna = vacuna;
    }
}