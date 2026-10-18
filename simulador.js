//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML//

function calcular(){
    let ingresos;
    let egresos;
    let disponible;
    let capacidadPago;
    let monto;
    let plazo;
    let tasa;
    let interes;
    let total;
    let aprobado;


    ingresos = parseFloat(document.getElementById("txtIngresos").value);
    egresos = parseFloat(document.getElementById("txtEgresos").value);

    disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago.toFixed(2);

    monto = parseInt(document.getElementById("txtMonto").value);
    plazo = parseInt(document.getElementById("txtPlazo").value);
    tasa = parseInt(document.getElementById("txtTasaInteres").value);

    interes = calcularInteresSimple(monto, tasa, plazo);
    document.getElementById("spnInteresPagar").textContent = "USD " + interes.toFixed(2);
    
    total = calcularTotalPagar(monto, interes);
    document.getElementById("spnTotalPrestamo").textContent = "USD " + total.toFixed(2);

    cuota = calcularCuotaMensual(total, plazo);
    document.getElementById("spnCuotaMensual").textContent = "USD " + cuota.toFixed(2);

    aprobado = aprobarCredito(capacidadPago, cuota);
    if(aprobado){
        document.getElementById("spnEstadoCredito").textContent = "CREDITO APROBADO";
    }else{
        document.getElementById("spnEstadoCredito").textContent = "CREDITO RECHAZADO";
    }
}

function reiniciar(){
    document.getElementById("txtIngresos").value = "";
    document.getElementById("txtEgresos").value = "";
    document.getElementById("txtMonto").value = "";
    document.getElementById("txtPlazo").value = "";
    document.getElementById("txtTasaInteres").value = "";

    document.getElementById("spnDisponible").textContent = "";
    document.getElementById("spnCapacidadPago").textContent = "";
    document.getElementById("spnInteresPagar").textContent = "";
    document.getElementById("spnTotalPrestamo").textContent = "";
    document.getElementById("spnCuotaMensual").textContent = "";
    document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";
}