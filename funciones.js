//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO//

function calcularDisponible(ingresos, egresos){
    let disponible;
    disponible = ingresos - egresos;
    if(disponible < 0){
        disponible = 0;
    }
    return disponible;
}

function calcularCapacidadPago(montoDisponible){
    let capacidadPago;
    capacidadPago = montoDisponible * 0.5;
    return capacidadPago;
}

function calcularInteresSimple(monto, tasa, plazoAnios){
    let interes;
    interes = plazoAnios * monto * (tasa / 100);
    return interes;
}