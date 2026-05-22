const formulario = document.getElementById("form-loteria");
const contenedorResultado = document.getElementById("contenedor-resultado");
const textoResultado = document.getElementById("texto-resultado");

/**
 * @param {number} numero 
 * @returns {number}
 */
function calcularFactorial(numero) {
    if (numero < 0) return 0;
    let resultado = 1;
    for (let i = 2; i <= numero; i++) {
        resultado *= i;
    }
    return resultado;
}

/**
 * Calcula las combinaciones posibles utilizando la fórmula C(n, r) = n! / (r! * (n-r)!)
 * @param {number} n Total de elementos
 * @param {number} r Elementos elegidos
 * @returns {number}
 */
function calcularCombinaciones(n, r) {
    if (r > n) return 0; // Validación matemática básica
    
    const numerador = calcularFactorial(n);
    const denominador = calcularFactorial(r) * calcularFactorial(n - r);
    
    return Math.floor(numerador / denominador);
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const totalSorteoPrincipal = Number(document.getElementById("n").value);
    const elegirSorteoPrincipal = Number(document.getElementById("r").value);
    const totalSorteoEspecial = Number(document.getElementById("m").value);
    const elegirSorteoEspecial = Number(document.getElementById("s").value);

    
    if (elegirSorteoPrincipal > totalSorteoPrincipal || elegirSorteoEspecial > totalSorteoEspecial) {
        mostrarResultado("Error: La cantidad a elegir (r) no puede ser mayor que el total de números disponibles (n).", true);
        return;
    }

    
    const combinacionesPrincipal = calcularCombinaciones(totalSorteoPrincipal, elegirSorteoPrincipal);
    const combinacionesEspecial = calcularCombinaciones(totalSorteoEspecial, elegirSorteoEspecial);
    
    const posibilidadesTotales = combinacionesPrincipal * combinacionesEspecial;

    const numeroFormateado = posibilidadesTotales.toLocaleString();

    const mensaje = `Para un sorteo de ${totalSorteoPrincipal} números principales (eliges ${elegirSorteoPrincipal}) y ${totalSorteoEspecial} opciones en el sorteo especial (eliges ${elegirSorteoEspecial}), hay un total de <strong>${numeroFormateado}</strong> combinaciones posibles.<br><br>Tu probabilidad de ganar con un solo boleto es de 1 entre ${numeroFormateado}.`;
    
    mostrarResultado(mensaje, false);
});

/**
 * @param {string} mensaje 
 * @param {boolean} esError 
 */
function mostrarResultado(mensaje, esError) {
    textoResultado.innerHTML = mensaje;
    contenedorResultado.className = "resultado-visible";
    
    if (esError) {
        contenedorResultado.style.borderLeft = "5px solid #ff4a5a";
        contenedorResultado.style.background = "#ffeef0";
    } else {
        contenedorResultado.style.borderLeft = "5px solid #20e3b2";
        contenedorResultado.style.background = "#e6fbf7";
    }
}