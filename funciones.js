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
    capacidadPago = montoDisponible * 0.3;
    return capacidadPago;
}

function calcularInteresSimple(monto, tasa, plazoAnios){
    let interes;
    interes = plazoAnios * monto * (tasa / 100);
    return interes;
}

function calcularTotalPagar(monto, interes){
    let total;
    total = monto + interes + 100;
    return total;
}

function calcularCuotaMensual(total, plazoAnios){
    let cuota;
    let meses;
    meses = plazoAnios * 12;
    cuota = total / meses;
    return cuota;
}

function aprobarCredito(capacidadPago, cuotaMensual){
    let aprobado;
    if(capacidadPago > cuotaMensual){
        aprobado = true;
    }else{
        aprobado = false;
    }
    return aprobado;
}