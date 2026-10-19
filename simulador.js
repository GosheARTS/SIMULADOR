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
    let cuota;
    let aprobado;

    if(!validarTodo()){
        limpiarResultados();
        return;
    }

    ingresos = parseFloat(document.getElementById("txtIngresos").value);
    egresos = parseFloat(document.getElementById("txtEgresos").value);

    disponible = calcularDisponible(ingresos, egresos);
    document.getElementById("spnDisponible").textContent = "USD " + disponible.toFixed(2);

    capacidadPago = calcularCapacidadPago(disponible);
    document.getElementById("spnCapacidadPago").textContent = "USD " + capacidadPago.toFixed(2);

    monto = parseFloat(document.getElementById("txtMonto").value);
    plazo = parseInt(document.getElementById("txtPlazo").value);
    tasa = parseFloat(document.getElementById("txtTasaInteres").value);

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

    limpiarErrores();
    limpiarResultados();
}

function obtenerNumero(id){
    let valor;
    valor = document.getElementById(id).value.trim();
    if(/^-?\d+(\.\d+)?$/.test(valor)){
        return parseFloat(valor);
    }
    return NaN;
}

function obtenerError(id, permiteDecimales, permiteCero){
    let valor;
    let numero;
    let digitos;
    let ingresos;

    valor = document.getElementById(id).value.trim();
    if(valor === ""){
        return "Este campo no puede quedar vacío";
    }

    numero = obtenerNumero(id);
    if(isNaN(numero)){
        return "Solo se aceptan números";
    }

    digitos = valor.replace("-", "").replace(".", "");
    if(digitos.length > 10){
        return "No se permiten más de 10 dígitos";
    }

    if(numero < 0){
        return "No se permiten números negativos";
    }
    if(!permiteDecimales && valor.includes(".")){
        return "El plazo debe ser un número entero de años";
    }
    if(numero === 0 && !permiteCero){
        return "El valor debe ser mayor que cero";
    }

    if(id === "txtEgresos"){
        ingresos = obtenerNumero("txtIngresos");
        if(ingresos > 0 && numero > ingresos){
            return "Los egresos no pueden ser mayores que los ingresos";
        }
    }
    return "";
}

function mostrarError(id, mensaje){
    let campo;
    let error;
    campo = document.getElementById(id);
    error = document.getElementById("error-" + id);
    error.textContent = mensaje;
    if(mensaje !== ""){
        campo.classList.add("invalido");
        campo.setAttribute("aria-invalid", "true");
    }else{
        campo.classList.remove("invalido");
        campo.removeAttribute("aria-invalid");
    }
}

function validarCampo(id, permiteDecimales, permiteCero){
    let mensaje;
    mensaje = obtenerError(id, permiteDecimales, permiteCero);
    mostrarError(id, mensaje);
    return mensaje === "";
}

function validarIngresos(){
    let correcto;
    correcto = validarCampo("txtIngresos", true, false);
    if(document.getElementById("txtEgresos").value.trim() !== ""){
        validarEgresos();
    }
    return correcto;
}

function validarEgresos(){
    return validarCampo("txtEgresos", true, true);
}

function validarMonto(){
    return validarCampo("txtMonto", true, false);
}

function validarPlazo(){
    return validarCampo("txtPlazo", false, false);
}

function validarTasa(){
    return validarCampo("txtTasaInteres", true, false);
}

function validarTodo(){
    let ingresos;
    let egresos;
    let monto;
    let plazo;
    let tasa;

    ingresos = validarIngresos();
    egresos = validarEgresos();
    monto = validarMonto();
    plazo = validarPlazo();
    tasa = validarTasa();

    return ingresos && egresos && monto && plazo && tasa;
}

function limpiarErrores(){
    mostrarError("txtIngresos", "");
    mostrarError("txtEgresos", "");
    mostrarError("txtMonto", "");
    mostrarError("txtPlazo", "");
    mostrarError("txtTasaInteres", "");
}

function limpiarResultados(){
    document.getElementById("spnDisponible").textContent = "";
    document.getElementById("spnCapacidadPago").textContent = "";
    document.getElementById("spnInteresPagar").textContent = "";
    document.getElementById("spnTotalPrestamo").textContent = "";
    document.getElementById("spnCuotaMensual").textContent = "";
    document.getElementById("spnEstadoCredito").textContent = "ANALIZANDO...";
}