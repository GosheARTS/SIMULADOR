//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML//

function calcular(){
    let ingresos;
    let egresos;
    let disponible;

    ingresos = parseFloat(document.getElementById("txtIngresos").value);
    egresos = parseFloat(document.getElementById("txtEgresos").value);

    disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago.toFixed(2);
}
