
/**
 * Revisa si un texto es una entrada válida
 * 
 * @param {string} texto El texto que se va a revisar.
 * @returns true si todos los caracteres en el texto son válidos, false si alguno no lo es.
 */
function esTextoValido(texto) {
    if (texto.length == 0) { //Un texto vacio no es valido
        return false;
    }

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i]; //Cada caracter en el texto

        if (!esCaracterValido(caracter)) { //Si algun caracter no es váldo, el texto no es válido
            return false;
        }
    }

    return true;
}

/**
 * Revisa si un caracter es una entrada válida
 * 
 * @param {string} caracter El caracter que se va a revisar.
 * @returns true si el aracteres es válido, false si no lo es.
 */
function esCaracterValido(caracter) {
    let aceptados = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", ".", " "]; // Son todos los caracteres validos

    for (let i = 0; i < aceptados.length; i++) {
        if (caracter == aceptados[i]) {
            return true;
        }
    }

    return false;
}

/**
 * Separa un string, vaciando los valores eparados en un arreglo.
 * 
 * @param {string} texto El texto que se busca separar.
 * @param {string} separador El caracter o texto que se usará para separar cada elemento.
 * @returns Un arreglo con los datos en formato numerico que se encuentren.
 */
function separarStringEnNumeros(texto, separador) {
    texto += separador; //Para que agregue el ultimo elemento
    let resultado = []; //Arreglo de números resultante

    let elemento = "";

    for (let i = 0; i < texto.length; i++) {
        const caracter = texto[i]; //Cada caracter del texto

        if (caracter == separador) { //Cuando se encuentra un separador
            if (elemento != "") { //Cuando hay mas de un separador juntos
                resultado.push(parseFloat(elemento));
                elemento = ""; //Reiniciar la variable
            }
        } else { //Si este caracter no es eeparador
            elemento += caracter; //Agregar string a la variable
        }
    }

    return resultado;
}

/**
 * Pide valores para colocarlos en una matriz.
 * Se pregunta la cantidad de filas y columnas que se van a ingresar y luego se piden los valores fila por fila.
 * 
 * @returns Un arreglo bidimensional que representa los datos de una matriz.
 */
function pedirDatosDeMatriz() {
    let matriz = [];
    let tamanoMatriz;
    let ordenMatriz;

    do {
        tamanoMatriz = prompt("Ingrese la cantidad de filas y columnas de la matriz.\n"
            + "Los numeros deben estar separados por un espacio."); //Determinar el tamaño de la matriz

        if (!esTextoValido(tamanoMatriz)) { //si el texto contiene algun caracter no válido
            alert("El texto ingresado no es valido");
            continue;
        }

        ordenMatriz = separarStringEnNumeros(tamanoMatriz, " ");

        if (ordenMatriz.length != 2) { //Si no se proporcionaron los datos correctos
            alert("La cantidad de datos debe ser 2");
        }
    } while (ordenMatriz.length != 2 || !esTextoValido(tamanoMatriz));

    let cantFilas = ordenMatriz[0]; //El primer numero ingresado es la cantidad de filas
    let cantCols = ordenMatriz[1]; //El segundo numero ingresado es la cantidad de columnas

    for (let i = 0; i < cantFilas; i++) {
        let fila = []; //Será cada fila de la nueva matriz
        let valido = false;

        while (!valido) {
            let texto = prompt("Ingrese la fila " + (i + 1) + " de la matriz.\n"
                + "Deben haber " + cantCols + " elementos, cada uno separado por un espacio.");

            valido = esTextoValido(texto); //Si el texto no es válido, volver a preguntar

            if (!valido) {
                alert("El texto ingresado no es valido");
                continue; //Volver a preguntar
            }

            fila = separarStringEnNumeros(texto, " ");
            valido = (fila.length == cantCols); //Revisar que se hayan ingresado la cantidad de datos correctos

            if (!valido) { //Si el texto contiene caracteres no numericos o no contiene la cantidad correcta de datos, avisar
                alert("La cantidad de datos es incorrecta. Debe haber " + cantCols + " datos");
                continue; //Volver a preguntar
            }
        }

        matriz.push(fila); //Agregar la nueva fila a la matriz
    }

    return matriz;
}

/**
 * Pide un numero hasta que se ingrese uno válido.
 * 
 * @returns Un numero flotante.
 */
function pedirNumero() {
    let num;

    do {
        num = parseFloat(prompt("Ingrese un numero"));

        if (!num) { //Si el valor ingresado no es un número, avisar
            alert("El dato ingresado no es valido");
        }
    } while (!num); //Preguntar hasta que el valor ingresado sea un número

    return num;
}

//! NO SE UTLIZAN
function sumaDeMatriz() {
    var matriz1 = new Array();
    var matriz2 = new Array();
    var matriz3 = new Array();
    var filas1 = parseInt(prompt("Ingrese el numero de filas de la matriz 1"));
    var columnas1 = parseInt(prompt("Ingrese el numero de columnas de la matriz 1"));
    var filas2 = parseInt(prompt("Ingrese el numero de filas de la matriz 2"));
    var columnas2 = parseInt(prompt("Ingrese el numero de columnas de la matriz 2"));
    if (filas1 == filas2 && columnas1 == columnas2) {
        for (var i = 0; i < filas1; i++) {
            matriz1[i] = new Array();
            matriz2[i] = new Array();
            matriz3[i] = new Array();
            for (var j = 0; j < columnas1; j++) {
                matriz1[i][j] = parseInt(prompt("Ingrese el valor de la matriz 1 en la posicion [" + i + "][" + j + "]"));
                matriz2[i][j] = parseInt(prompt("Ingrese el valor de la matriz 2 en la posicion [" + i + "][" + j + "]"));
                matriz3[i][j] = matriz1[i][j] + matriz2[i][j];
            }
        }
        console.log("La suma de las matrices es: \n" + matriz3);
    } else {
        alert("Las matrices no tienen el mismo tamaño");
    }
    main();
}

function restaDeMatriz() {
    var matriz1 = new Array();
    var matriz2 = new Array();
    var matriz3 = new Array();
    var filas1 = parseInt(prompt("Ingrese el numero de filas de la matriz 1"));
    var columnas1 = parseInt(prompt("Ingrese el numero de columnas de la matriz 1"));
    var filas2 = parseInt(prompt("Ingrese el numero de filas de la matriz 2"));
    var columnas2 = parseInt(prompt("Ingrese el numero de columnas de la matriz 2"));
    if (filas1 == filas2 && columnas1 == columnas2) {
        for (var i = 0; i < filas1; i++) {
            matriz1[i] = new Array();
            matriz2[i] = new Array();
            matriz3[i] = new Array();
            for (var j = 0; j < columnas1; j++) {
                matriz1[i][j] = parseInt(prompt("Ingrese el valor de la matriz 1 en la posicion [" + i + "][" + j + "]"));
                matriz2[i][j] = parseInt(prompt("Ingrese el valor de la matriz 2 en la posicion [" + i + "][" + j + "]"));
                matriz3[i][j] = matriz1[i][j] - matriz2[i][j];
            }
        }
        alert("La resta de las matrices es: \n" + matriz3);
    } else {
        alert("Las matrices no tienen el mismo tamaño");
    }
    main();
}

function productoDeMatriz() {
    var matriz1 = new Array();
    var matriz2 = new Array();
    var matriz3 = new Array();
    var filas1 = parseInt(prompt("Ingrese el numero de filas de la matriz 1"));
    var columnas1 = parseInt(prompt("Ingrese el numero de columnas de la matriz 1"));
    var filas2 = parseInt(prompt("Ingrese el numero de filas de la matriz 2"));
    var columnas2 = parseInt(prompt("Ingrese el numero de columnas de la matriz 2"));
    if (columnas1 == filas2) {
        for (var i = 0; i < filas1; i++) {
            matriz1[i] = new Array();
            matriz2[i] = new Array();
            matriz3[i] = new Array();
            for (var j = 0; j < columnas2; j++) {
                matriz1[i][j] = parseInt(prompt("Ingrese el valor de la matriz 1 en la posicion [" + i + "][" + j + "]"));
                matriz2[i][j] = parseInt(prompt("Ingrese el valor de la matriz 2 en la posicion [" + i + "][" + j + "]"));
                matriz3[i][j] = matriz1[i][j] * matriz2[i][j];
            }
        }
        alert("El producto de las matrices es: \n" + matriz3);
    } else {
        alert("Las matrices no tienen el mismo tamaño");
    }
    main();
}
