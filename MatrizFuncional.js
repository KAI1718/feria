
//* Funciones de apoyo

/**
 * Obtiene la cantidad de filas que hay en una matriz.
 * 
 * @param {Array} matriz La matriz de la que desea saber la cantidad de filas.
 * @returns La cantidad de filas en la matriz.
 */
function cantFilas(matriz) {
    return matriz.length;
}

/**
 * Obtiene la cantidad de columnas que hay en una matriz.
 * 
 * @param {Array} matriz La matriz de la que desea saber la cantidad de columnas.
 * @returns La cantidad de columnas en la matriz.
 */
function cantCols(matriz) {
    return matriz[0].length;
}

/**
 * Obtener los valores de una matriz en formato de texto.
 * 
 * @param {Array<number>} matriz La matriz que se quiere obtener en formato de texto.
 * @returns Un string con los valores de la matriz.
 */
function matrizATexto(matriz) {
    let texto = "";

    for (let f = 0; f < cantFilas(matriz); f++) {
        for (let c = 0; c < cantCols(matriz); c++) {
            texto += matriz[f][c] + "    ";
        }
        texto += "\n";
    }

    return texto;
}

/**
 * Imprimir en consola los valores de una Matriz.
 * 
 * @param {Array<number>} matriz La matriz que se quiere imprimir en consola.
 */
function imprimirMatriz(matriz) {
    console.log(matrizATexto(matriz));
}

/**
 * Duplicar un arreglo bidimensional y devolver uno con los mismos valores.
 * 
 * @param {Array<number>} matriz El arreglo bidimensional que se desa duplicar.
 * @returns Un arreglo bidimensional con los mismos valores que el parámetro recibido.
 */
function duplicarMatriz(matriz) {
    let result = [];

    for (let f = 0; f < matriz.length; f++) {
        let fila = [];

        for (let c = 0; c < matriz[f].length; c++) {
            fila.push(matriz[f][c]);
        }

        result.push(fila);
    }

    return result;
}

/**
 * Construye una matriz de identidad del tamaño especificado.
 * 
 * @param {number} orden El numero de filas y columnas de la matriz de identidad.
 * @return Un arreglo bidimensinal con los valores de una matriz de identidad.
 */
function construirMatrizIdentidad(orden) {
    let datos = [];

    for (let f = 0; f < orden; f++) {
        let fila = [];

        for (let c = 0; c < orden; c++) {
            if (f == c) {
                fila.push(1);
            } else {
                fila.push(0);
            }
        }

        datos.push(fila);
    }

    return datos;
}

function eliminarFilaCol(matriz, fila, col) {
    let result = duplicarMatriz(matriz);

    result.splice(fila, 1); //Eliminar a partir del indice fila, 1 elemento del arreglo

    for (let f = 0; f < (cantFilas(matriz) - 1); f++) {
        result[f].splice(col, 1); //Eliminar a partir del indice col, 1 elemento del arreglo
    }

    return result;
}

/**
 * Sustiruir los datos recibidos en la columna especificada en la matriz recibida.
 * 
 * @param {Array<number>} matriz La matriz en la que serán reemplazados los datos.
 * @param {number} indice La columna de los nuevos datos.
 * @param {Array<number>} datos Una arreglo con tantos datos como numero de filas de la martiz.
 * @returns Un arreglo bidimensinal con los datos modificados.
 */
function reemplazarColumna(matriz, indice, datos) {
    if (cantFilas(matriz) != datos.length) {
        alert("Para poder reemplazarse, la cantidad de valores en la columna debe ser el mismo");
        return null;
    }

    let dat = duplicarMatriz(matriz);

    for (let f = 0; f < cantFilas(matriz); f++) {
        dat[f][indice] = datos[f];
    }

    return dat;
}

/**
 * Obtener los datos en la columna deseada.
 * 
 * @param {Array<number>} matriz Los datos (arreglo bidimensional) de donde se va a obtener la columna deseada.
 * @param {number} fila El indice de la columna que se desa obtener.
 * @returns Un arreglo unidimensional con los datos de la columna deseada.
 */
function getColumna(matriz, col) {
    let datos = duplicarMatriz(matriz);
    let result = [];

    for (let f = 0; f < datos.length; f++) {
        result.push(datos[f][col]);
    }

    return result;
}

/**
 * Obtener los datos en la fila deseada.
 * @param {Array<number>} matriz Los datos (arreglo bidimensional) de donde se va a obtener la columna deseada.
 * @param {number} fila El indice de la fila que se desa obtener.
 * @returns Un arreglo con los datos de la fila deseada.
 */
function getFila(matriz, fila) {
    return duplicarMatriz(matriz)[fila];
}

function mcd(a, b) {
    return (b === 0) ? a : mcd(b, a % b);
}

function mcm(a, b) {
    return a * b / mcd(a, b);
}

//* Operaciones Varias

/**
 * Calcula el determinante de una matriz, devolviendo el valor del resultado y el proceso.
 * 
 * @param {Array<number>} matriz Un arreglo bidimensinal que se va a usar como matriz
 * @returns null si la matriz no es válida (no es cuadrada), 
 * si es válida, un arreglo asociativo con dos elementos, 
 * "res", que será un número con el valor del determinante, y 
 * "text", que será un string con el proceso de resolución.
 */
function calcularDeterminante(matriz, porSarrus) {
    if (cantFilas(matriz) != cantCols(matriz)) { //Si la matriz no es cuadrada
        alert("Para calcular el determinante, la matriz debe ser cuadrada");
        return null;
    }

    if (porSarrus != false) {
        if ((cantFilas(matriz) == 3) && (cantCols(matriz) == 3)) { //Si la matriz es de 3 x 3, entonces se puede calcular por Sarrus
            return calcularDeterminantePorSarrus(matriz);
        }
    }

    let res = NaN;
    let text;

    if (cantFilas(matriz) == 2 && cantCols(matriz) == 2) { //Si la matriz es de dos por dos
        res = (matriz[0][0] * matriz[1][1]) - (matriz[1][0] * matriz[0][1]); //Multiplicar en diagonales (metodo de los cofactores)

        text = "--> Multiplicar los elementos en diagonal:\n"
            + "   (" + matriz[0][0] + " * " + matriz[1][1] + ") - (" + matriz[1][0] + " * " + matriz[0][1] + ") = " + res + "\n";
    } else { //Si la matriz es mas grande
        res = 0;
        text = "";
        let dets = [];
        let cofs = [];
        let signo = 1; //Se usará porque en el metodo de los cofactores se intercambia unvalor positivo y uno negativo
        const f = 0; //Solo procesar la primer fila

        for (let c = 0; c < cantCols(matriz); c++) {
            let m = eliminarFilaCol(matriz, f, c); //Crear la submatriz
            let det = calcularDeterminante(m); //Calcular el determinante de la submatriz

            text += "--> Calcular el determinante de la submatriz (" + (f + 1) + ", " + (c + 1) + "):\n";
            text += matrizATexto(m);
            text += det["text"]
                + "--->>> Determinante de la submatriz (" + (f + 1) + ", " + (c + 1) + ") <<<---\n"
                + det["res"] + "\n\n";

            dets.push(det["res"]); //Guardar el determinante

            cofs.push(matriz[f][c]); //Guardar el cofactor que le corresponde a esta submatriz
        }

        text += "--> Multiplicar los determinantes por sus respectivos cofactores: \n"
            + "   "; //Indentado

        let aux = "";

        for (let i = 0; i < dets.length; i++) {
            if (i > 0) {
                if (signo == 1) {
                    text += "+ ";
                } else {
                    text += "- ";
                }
            }

            text += "(" + cofs[i] + " * " + dets[i] + ") ";

            let v = cofs[i] * dets[i] * signo; //Multiplicar el cofactor por su respectivo determinante y por el signo

            res += v; //Ir sumando cada factor al resultado final

            if (i != 0) {
                if (v < 0) {
                    aux += " - ";
                } else {
                    aux += " + ";
                }
            }

            aux += Math.abs(v);

            signo *= -1;
        }

        text += "\n--> Sumar todos los valores obtenidos:\n"
            + "   " + aux + " = " + res + "\n";
    }

    return {
        "res": res,
        "text": text
    };
}

/**
 * Calcula el determinante de una matriz por el método de Sarrus, devolviendo el valor del resultado y el proceso.
 * La matriz debe ser de orden 3 x 3.
 * 
 * @param {Array<number>} matriz Un arreglo bidimensinal que se va a usar como matriz
 * @returns null si la matriz no es válida (no es de 3 x 3), 
 * si es válida, un arreglo asociativo con dos elementos, 
 * "res", que será un número con el valor del determinante, y 
 * "text", que será un string con el proceso de resolución.
 */
function calcularDeterminantePorSarrus(matriz) {
    if ((cantFilas(matriz) != 3) || (cantCols(matriz) != 3)) { //Si la matriz no es de 3 x 3
        alert("Para calcular el determinante por el metodo de Sarrus, la matriz debe ser de 3 x 3");
        return null;
    }

    let mat = duplicarMatriz(matriz); //Construir la matriz para calcular por Sarrus
    mat.push(duplicarMatriz(matriz)[0]);
    mat.push(duplicarMatriz(matriz)[1]);

    let valores = [];
    let text = "--> Multiplicar las diagonales descendentes:\n"
        + "   "; //Indentado

    for (let d = 0; d < 3; d++) { //Diagonales descendentes
        let valor = 1;

        text += "(";

        for (let i = 0; i < 3; i++) {
            const e = mat[(i + d)][i];

            valor *= e; //Multiplicar todos los elementos de la diagonal

            text += e;

            if (i != 2) { //No poner el signo en el último valor
                text += " * ";
            }
        }

        valores.push(valor);

        text += ")";

        if (d != 2) { //No poner el signo en el último valor
            text += " + ";
        }
    }

    text += "\n--> Multiplicar las diagonales ascendentes y multiplicar cada una por -1:\n"
        + "   "; //Indentado

    for (let d = 0; d < 3; d++) { //Diagonales ascendentes
        let valor = 1;

        text += "(";

        for (let c = 0, f = 2; c < 3; f--, c++) {
            const e = mat[(f + d)][c];

            valor *= e; //Multiplicar todos los elementos de la diagonal

            text += e;

            text += " * ";
        }

        valores.push(valor * -1); //Multiplicar los valores de esta diagonal por un signo negativo

        text += "-1)";

        if (d != 2) { //No poner el signo en el último valor
            text += " + "
        }
    }

    let res = 0;

    text += "\n--> Sumar todos los valores obtenidos:\n"
        + "   "; //Indentado

    for (let i = 0; i < valores.length; i++) {
        const v = valores[i];

        if (i != 0) {
            if (v < 0) {
                text += " - ";
            } else {
                text += " + ";
            }
        }

        text += Math.abs(v);
        res += v; //Sumar cada uno de los valores al resultado final
    }

    text += " = " + res + "\n";

    return {
        "res": res,
        "text": text
    }
}

/**
 * Construye la matriz traspuesta de una matriz, devolviendo el valor del resultado y el proceso.
 * 
 * @param {Array<number>} matriz Un arreglo bidimensinal que se va a usar como matriz
 * @returns Un arreglo asociativo con dos elementos, 
 * "res", que será arreglo bidimensinal que es la traspuesta, y 
 * "text", que será un string con el proceso de resolución.
 */
function calcularTraspuesta(matriz) {
    let text = "";
    let mat = [];

    for (let f = 0; f < cantFilas(matriz); f++) {
        let aux = []; //Será cada fila de la matriz resultante

        for (let c = 0; c < cantCols(matriz); c++) {
            aux.push(matriz[c][f]); //Mover cada uno de los valores a una nueva posición
            text += "   --> Mover el valor " + matriz[f][c] + ", de (" + (f + 1) + ", " + (c + 1) + ") a (" + (c + 1) + ", " + (f + 1) + ")\n";
        }

        mat.push(aux);
    }

    return {
        "res": mat,
        "text": text
    };
}

/**
 * Construye la matriz adjunta de una matriz, devolviendo el valor del resultado y el proceso.
 * 
 * @param {Array<number>} matriz Un arreglo bidimensinal que se va a usar como matriz
 * @returns null si la matriz no es válida (no es cuadrada), 
 * si es válida, un arreglo asociativo con dos elementos, 
 * "res", que será un arreglo bidimensinal que es la adjunta, y 
 * "text", que será un string con el proceso de resolución.
 */
function calcularAdjunta(matriz) {
    if (cantFilas(matriz) != cantCols(matriz)) { //Si la matriz no es cuadrada
        alert("Para calcular la adjunta, la matriz debe ser cuadrada");
        return null;
    }

    let text = "";
    let matDets = []; //Será la matriz de determinantes

    for (let f = 0; f < cantFilas(matriz); f++) {
        let signo = (f % 2 == 0) ? 1 : -1; //El primer elemento de las filas pares será positivo, y el de las impares negativo
        let aux = []; //Será cada fila de la matriz que se va a trasponer

        for (let c = 0; c < cantCols(matriz); c++) {
            let mat = eliminarFilaCol(matriz, f, c); //Crear la submatriz
            let det = calcularDeterminante(mat); //Calcular el determinante de la submatriz

            text += "--> Calcular el determinante de la submatriz (" + (f + 1) + ", " + (c + 1) + "):\n"
                + matrizATexto(mat)
                + det["text"]
                + "--->>> Determinante de la submatriz (" + (f + 1) + ", " + (c + 1) + ") <<<---\n"
                + det["res"] + "\n\n";

            aux.push(det["res"] * signo);

            signo *= -1; //Intercalar un signo positivo y uno negativo
        }

        matDets.push(aux); //Agregar la nueva fila a la matriz
    }

    let matB = matDets; //Construir la matriz B
    let tras = calcularTraspuesta(matB); //Será la matriz adjunta

    text += "--> Colocar los valores segun su posicion en una nueva matriz, intercalando un signo positivo y uno negativo:\n"
        + matrizATexto(matB) + "\n"
        + "--> Construir la traspuesta de la nueva matriz:\n"
        + tras["text"];

    return {
        "res": tras["res"],
        "text": text
    }
}

/**
 * Construye la matriz inversa de una matriz utilizando el método de Gauss-Jordan, devolviendo el valor del resultado y el proceso.
 * 
 * @param {Array<number>} matriz Un arreglo bidimensinal que se va a usar como matriz
 * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
 * si es válida, un arreglo asociativo con dos elementos, 
 * "res", que será un arreglo bidimensinal que es la inversa, y 
 * "text", que será un string con el proceso de resolución.
 */
function calcularInversaPorGaussJordan(matriz) {
    if (cantFilas(matriz) != cantCols(matriz)) { //Si la matriz no es cuadrada
        alert("Para calcular la inversa, la matriz debe ser cuadrada");
        return null;
    }

    if (calcularDeterminante(matriz)["res"] == 0) {
        alert("Para calcular la inversa, el determinante de la matriz debe ser diferente de 0");
        return null;
    }

    let sist = duplicarMatriz(matriz);
    let iden = construirMatrizIdentidad(cantFilas(matriz));
    let text = "--> Construir una matriz de identidad del tamano de la matriz:\n"
        + matrizATexto(iden) + "\n"
        + "--> Reducir los elementos que no estan en la diagonal principal:\n";

    for (let c = 0; c < cantCols(matriz); c++) {
        text += "--> Operar la columna " + (c + 1) + "\n";

        for (let f = 0; f < cantFilas(matriz); f++) {
            if (f == c) { //Si está en la diagonal principal no operarlo
                text += "   --> No operar el elemento (" + (f + 1) + ", " + (c + 1) + ")\n\n";
                continue;
            }

            let fA1 = sist[f]; //Primer fila de la matriz actual
            let fI1 = iden[f]; //Primer fila de la matriz de identidad
            let fA2 = sist[c]; //Segunda fila de la matriz actual
            let fI2 = iden[c]; //Segunda fila de la matriz de identidad
            let e1 = fA1[c]; //Elemento a reducir de la primer fila de matriz actual
            let e2 = fA2[c]; //Elemento a reducir de la primer fila de matriz actual
            let a = mcm(Math.abs(e1), Math.abs(e2)); //Minimo Comun Multiplo de los elementos
            let m1 = Math.abs(a / e1); //Valores por los que se van a multiplicar las filas
            let m2 = ((e1 / Math.abs(e1)) == (e2 / Math.abs(e2))) ? Math.abs(a / e2) * -1 : Math.abs(a / e2); //Si son del mismo signo, hacerlo negativo, si no, positivo

            if (e1 == 0) { //Si ya esta reducido
                text += "   --> El elemento (" + (f + 1) + ", " + (c + 1) + ") ya esta reducido\n";
                continue; //Pasar al siguiente elemento
            }

            text += "   --> Multiplicar la fila (" + (f + 1) + ") por " + m1 + " y la (" + (c + 1) + ") por " + m2 + " y sumar elemento por elemento\n";

            //Variables string de apoyo
            let auxA1 = "";
            let auxA2 = "";
            let auxI1 = "";
            let auxI2 = "";
            let auxR1 = "";
            let auxR2 = "";

            for (let i = 0; i < cantCols(matriz); i++) { //Para cada valor
                auxA1 += (fA1[i] * m1) + "    ";
                auxA2 += (fA2[i] * m2) + "    ";
                auxI1 += (fI1[i] * m1) + "    ";
                auxI2 += (fI2[i] * m2) + "    ";

                //Valor anterior fila uno por m1 más valor anterior fila dos por m2
                fA1[i] = (fA1[i] * m1) + (fA2[i] * m2); //Modificar el valor i de la fila de la matriz actual
                fI1[i] = (fI1[i] * m1) + (fI2[i] * m2); //Modificar el valor i de la fila de la matriz de identidad

                auxR1 += fA1[i] + "    ";
                auxR2 += fI1[i] + "    ";
            }

            text += auxA1 + "|    " + auxI1 + "\n"
                + auxA2 + "|    " + auxI2 + "\n"
                + "-------->>> Nuevas filas " + (f + 1) + " <<<--------\n"
                + auxR1 + "|    " + auxR2 + "\n\n";
        }

        text += "--> Reemplazar con los valores de las nuevas filas\n"
            + "--->>> Nueva matriz <<<---\n"
            + matrizATexto(sist)
            + "--->>> Nueva matriz de identidad <<<---\n"
            + matrizATexto(iden) + "\n";
    }

    text += "--> Dividir las filas de la matriz de identidad entre su respectivo valor de la matriz:\n";

    for (let f = 0; f < cantFilas(matriz); f++) {
        text += "   --> Dividir la fila " + (f + 1) + " entre el valor (" + (f + 1) + ", " + (f + 1) + ") de la matriz principal (" + sist[f][f] + ")\n";

        for (let c = 0; c < cantCols(matriz); c++) {
            iden[f][c] = iden[f][c] / sist[f][f]; //Dividir cada valor
        }
    }

    return {
        "res": iden,
        "text": text
    }
}

/**
 * Construye la matriz inversa de una matriz utilizando el método de determinantes, devolviendo el valor del resultado y el proceso.
 * 
 * @param {Array<number>} matriz Un arreglo bidimensinal que se va a usar como matriz
 * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
 * si es válida, un arreglo asociativo con dos elementos, 
 * "res", que será un arreglo bidimensinal que es la inversa, y 
 * "text", que será un string con el proceso de resolución.
 */
function calcularInversaPorAdjunta(matriz) {
    if (cantFilas(matriz) != cantCols(matriz)) { //Si la matriz no es cuadrada
        alert("Para calcular la inversa, la matriz debe ser cuadrada");
        return null;
    }

    let d = calcularDeterminante(matriz); //Calcular el determinante de la matriz

    if (d["res"] == 0) {
        alert("Para calcular la inversa, el determinante de la matriz debe ser diferente de 0");
        return null;
    }

    let a = calcularAdjunta(matriz); //Calcular la adjunta de la matriz

    let text = "--> Calcular el determinante de la matriz:\n"
        + d["text"] + "\n"
        + "--->>> Determinante de la matriz <<<---\n"
        + d["res"] + "\n"
        + "\n--> Calcular la adjunta de la matriz:\n"
        + a["text"] + "\n"
        + "--->>> Matriz adjunta <<<---\n"
        + matrizATexto(a["res"]) + "\n"
        + "--> Dividir cada elemento de la adjunta entre el determinante de la matriz (" + d["res"] + ")\n";

    return {
        "res": divMatrizEscalar(a["res"], d["res"]), //Dividir la matriz entre el determinante de la matriz
        "text": text
    }
}

//* Sistemas de ecuaciones

/**
 * Calcular los valores de las variables a partir de la información del sistema de ecuaciones proporcionada.
 * 
 * @param {Array<number>} matrizCoefs La matriz de los coeficientes del sistema.
 * @param {Array<number>} matrizIndep La matriz de los valores independientes del sistema.
 * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
 * si es válida, un arreglo bidimensinal con los valores de las variables en el orden recibido.
 */
function calcularSistPorGaussJordan(matrizCoefs, matrizIndep) {
    if (cantFilas(matrizCoefs) != cantFilas(matrizIndep)) {
        alert("Para calcular el sistema, el numero de filas de la matriz de coeficientes y la independiente debe ser el mismo");
        return null;
    } else if (cantCols(matrizIndep) != 1) {
        alert("Para calcular el sistema, el numero de columnas de la matriz independiente debe ser 1");
        return null;
    }

    if (calcularDeterminante(matrizCoefs)["res"] == 0) {
        alert("Para calcular el sistema, el determinante de la matriz debe ser diferente de 0");
        return null;
    }

    let sist = duplicarMatriz(matrizCoefs);
    let indep = duplicarMatriz(matrizIndep);
    let text = "--> Reducir los elementos que no estan en la diagonal principal:\n";

    for (let c = 0; c < cantCols(matrizCoefs); c++) {
        text += "--> Operar la columna " + (c + 1) + "\n";

        for (let f = 0; f < cantFilas(matrizCoefs); f++) {
            if (f == c) { //Si está en la diagonal principal no operarlo
                text += "   --> No operar el elemento (" + (f + 1) + ", " + (c + 1) + ")\n\n";
                continue;
            }

            let fA1 = sist[f]; //Fila de la matriz actual
            let fA2 = sist[c]; //Fila de la matriz actual
            let e1 = fA1[c]; //Elemento a reducir de la primera fila de la matriz actual
            let e2 = fA2[c]; //Elemento a reducir de la segunda fila de la matriz actual
            let a = mcm(Math.abs(e1), Math.abs(e2)); //Minimo Comun Multiplo de ambos elementos
            let m1 = Math.abs(a / e1); //Valores por los que se van a multiplicar las filas
            let m2 = ((e1 / Math.abs(e1)) == (e2 / Math.abs(e2))) ? Math.abs(a / e2) * -1 : Math.abs(a / e2); //Si son del mismo signo, hacerlo negativo, si no, positivo

            if (e1 == 0) { //Si ya esta reducido
                text += "   --> El elemento (" + (f + 1) + ", " + (c + 1) + ") ya esta reducido\n";
                continue;
            }

            text += "   --> Multiplicar la fila (" + (f + 1) + ") por " + m1 + " y la (" + (c + 1) + ") por " + m2 + " y sumar elemento por elemento\n";

            let auxA1 = "";
            let auxA2 = "";
            let auxR1 = "";
            for (let i = 0; i < cantCols(matrizCoefs); i++) { //Para cada valor
                auxA1 += (fA1[i] * m1) + "    ";
                auxA2 += (fA2[i] * m2) + "    ";

                //Valor anterior fila uno por m1 más valor anterior fila dos por m2
                fA1[i] = (fA1[i] * m1) + (fA2[i] * m2); //Modificar el valor i de la fila de la matriz actual

                auxR1 += fA1[i] + "    ";
            }

            text += auxA1 + "|    " + (indep[f][0] * m1) + "\n"
                + auxA2 + "|    " + (indep[c][0] * m2) + "\n"
                + "-------->>> Nuevas filas " + (f + 1) + " <<<--------\n";

            //Valor anterior fila uno por m1 más valor anterior fila dos por m2
            indep[f][0] = (indep[f][0] * m1) + (indep[c][0] * m2); //Modificar el valor f de la fila de la matriz independiente

            text += auxR1 + "|    " + indep[f][0] + "\n\n";
        }

        text += "--> Reemplazar con los valores de las nuevas filas\n"
            + "--->>> Nueva matriz <<<---\n"
            + matrizATexto(sist)
            + "--->>> Nueva matriz indepentiente <<<---\n"
            + matrizATexto(indep) + "\n";
    }

    text += "--> Dividir las filas de la matriz de identidad entre su respectivo valor de la matriz:\n";

    for (let f = 0; f < cantFilas(matrizCoefs); f++) {
        text += "   --> Dividir el elemento indepentiente " + (f + 1) + " entre el valor (" + (f + 1) + ", " + (f + 1) + ") de la matriz principal (" + sist[f][f] + ")\n";

        indep[f][0] = indep[f][0] / sist[f][f]; //Modificar el valor f de la fila de la matriz indiependente
    }

    return {
        "res": indep,
        "text": text
    }
}

/**
 * Calcular los valores de las variables a partir de la información del sistema de ecuaciones proporcionada.
 * 
 * @param {Array<number>} matrizCoefs La matriz de los coeficientes del sistema.
 * @param {Array<number>} matrizIndep La matriz de los valores independientes del sistema.
 * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
 * si es válida, un arreglo bidimensinal con los valores de las variables en el orden recibido.
 */
function calcularSistPorCramer(matrizCoefs, matrizIndep) {
    if (cantFilas(matrizCoefs) != cantFilas(matrizIndep)) {
        alert("Para calcular el sistema, el numero de filas de la matriz de coeficientes y la independiente debe ser el mismo");
        return null;
    } else if (cantCols(matrizIndep) != 1) {
        alert("Para calcular el sistema, el numero de columnas de la matriz independiente debe ser 1");
        return null;
    }

    let dS = calcularDeterminante(matrizCoefs); //Calcular el determinante de la matriz de coeficientes

    if (dS["res"] == 0) {
        alert("Para calcular el sistema, el determinante de la matriz debe ser diferente de 0");
        return null;
    }

    let text = "--> Calcular el determinante de la matriz de coeficientes:\n"
        + dS["text"] + "\n"
        + "--->>> Determinante del sistema <<<---\n"
        + dS["res"] + "\n\n";

    let dets = [];
    let indep = [];

    for (let f = 0; f < cantFilas(matrizIndep); f++) {
        indep.push(matrizIndep[f][0]); //Crear un arreglo con los valores de la matriz independiente para usar como la columna que se va a reemplazar
    }

    for (let i = 0; i < cantCols(matrizCoefs); i++) {
        let m = reemplazarColumna(matrizCoefs, i, indep); //Crear la matriz de cada variable reemplazando su columna con los valores independientes
        let d = calcularDeterminante(m); //Calcular el determinate de la matriz de cada variable
        let aux = [d["res"]];

        text += "--> Construir la matriz de la variable " + (i + 1) + ":\n"
            + "   --> Reemplazar la columna " + (i + 1) + " con la matriz independiente:\n"
            + matrizATexto(m) + "\n"
            + "   --> Calcular el determinante de la matriz " + (i + 1) + ":\n"
            + d["text"] + "\n"
            + "--->>> Determinante de la matriz " + (i + 1) + " <<<---\n"
            + d["res"] + "\n\n";

        dets.push(aux); //Guardar el determinante de cada variable
    }

    let div = divMatrizEscalar(dets, dS["res"]); //Dividir cada determinante entre el determinante del sistema

    text += "--> Dividir los determinantes entre el determinante del sistema (" + dS["res"] + ")\n"
        + "--> Colocar los valores obtenidos en una nueva matriz";

    return {
        "res": div,
        "text": text
    }
}

/**
 * Calcular los valores de las variables a partir de la información del sistema de ecuaciones proporcionada.
 * 
 * @param {Array<number>} matrizCoefs La matriz de los coeficientes del sistema.
 * @param {Array<number>} matrizIndep La matriz de los valores independientes del sistema.
 * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
 * si es válida, un arreglo bidimensinal con los valores de las variables en el orden recibido.
 */
function calcularSistPorInversa(matrizCoefs, matrizIndep) {
    if (cantFilas(matrizCoefs) != cantFilas(matrizIndep)) {
        alert("Para calcular el sistema, el numero de filas de la matriz de coeficientes y la independiente debe ser el mismo");
        return null;
    } else if (cantCols(matrizIndep) != 1) {
        alert("Para calcular el sistema, el numero de columnas de la matriz independiente debe ser 1");
        return null;
    }

    let inv = calcularInversaPorAdjunta(matrizCoefs); //Calcular la inversa de la matriz de coeficientes

    if (inv === null) {
        return null;
    }

    let text = "--> Calcular la matriz inversa de la matriz de coeficientes por el metodo de la adjunta:\n"
        + inv["text"] + "\n"
        + "--->>> Matriz inversa de la matriz de coeficientes <<<---\n"
        + matrizATexto(inv["res"]) + "\n"
        + "--> Multiplicar por la matriz independiente:\n";

    let mult = multMatrizMatriz(inv["res"], matrizIndep); //Multiplicar la matriz inversa por la independiente

    text += mult["text"];

    return {
        "res": mult["res"],
        "text": text
    }
}

//* Operaciones básicas

/**
 * Multiplicar una matriz por otra matriz.
 * 
 * @param {Array<number>} m1 La primera matriz que será multiplicada.
 * @param {Array<number>} m2 La segunda matriz que será multiplicada.
 * @returns null si las matrices no son válidas (el numero de columnas de la primera no es igual al numero de filas de la segunda), 
 * si son válidas, un arreglo asociativo con dos elementos, 
 * "res", que será un arreglo bidimensinal con la matriz resultante, y 
 * "text", que será un string con el proceso de resolución.
 */
function multMatrizMatriz(m1, m2) {
    if (cantCols(m1) != cantFilas(m2)) {
        alert("Para poder multiplicarse, el numero de columnas de la primer matriz debe ser igual al numero de filas de la segunda matriz");
        return null;
    }

    let mat = [];
    let text = "";

    for (let f = 0; f < cantFilas(m1); f++) {
        let fila = []; //Será cada fila de la matriz resultante

        for (let c = 0; c < cantCols(m2); c++) {
            text += "--> Multiplicar todos los valores de la fila " + (f + 1) + " de la primera matriz por los de la columna " + (c + 1) + " de la segunda:\n"
                + "   "; //Indentado

            let v = 0; //El valor de cada elemento de la matriz resultante

            for (let i = 0; i < cantCols(m1); i++) {
                let e1 = m1[f][i], e2 = m2[i][c];

                v += e1 * e2; //Sumar factor por factor
                text += "(" + e1 + " * " + e2 + ") + ";
            }

            fila.push(v);

            text = text.substring(0, text.length - 3) + " = " + v + "\n"; //Quitar el último " + "
        }

        mat.push(fila);
    }

    return {
        "res": mat,
        "text": text
    }
}

/**
 * Multiplicar una matriz por un numero escalar.
 * 
 * @param {Array<number>} matriz La matriz que será multiplicar.
 * @param {number} escalar El numero por el que se va a multiplicar la matriz.
 * @returns Un arreglo bidimensinal con la matriz resultante.
 */
function multMatrizEscalar(matriz, escalar) {
    let mat = []; //Matriz resultante

    for (let f = 0; f < cantFilas(matriz); f++) {
        let fila = []; //Será cada fila de la matriz resultante

        for (let c = 0; c < cantCols(matriz); c++) {
            let v = (matriz[f][c] * escalar); //Multiplicar cada elemento de la matriz por el numero escalar proporcionado

            fila.push(v);
        }

        mat.push(fila);
    }

    return mat;
}

/**
 * Dividir una matriz entre un numero escalar.
 * 
 * @param {Array<number>} matriz La matriz que será dividida.
 * @param {number} escalar El numero por el que se va a dividir la Matriz.
 * @returns Un arreglo bidimensinal con la matriz resultante.
 */
function divMatrizEscalar(matriz, escalar) {
    let mat = []; //Matriz resultante

    for (let f = 0; f < cantFilas(matriz); f++) {
        let fila = []; //Será cada fila de la matriz resultante

        for (let c = 0; c < cantCols(matriz); c++) {
            let v = (matriz[f][c] / escalar);

            fila.push(v);
        }

        mat.push(fila);
    }

    return mat;
}

/**
 * Sumar una matriz por un numero escalar.
 * 
 * @param {Array<number>} matriz La matriz que será sumada.
 * @param {number} escalar El numero por el que se va a sumar la Matriz.
 * @returns Un arreglo bidimensinal con la matriz resultante.
 */
function sumaMatrizEscalar(matriz, escalar) {
    let mat = []; //Matriz resultante

    for (let f = 0; f < cantFilas(matriz); f++) {
        let fila = []; //Será cada fila de la matriz resultante

        for (let c = 0; c < cantCols(matriz); c++) {
            let v = (matriz[f][c] + escalar);

            fila.push(v);
        }

        mat.push(fila);
    }

    return mat;
}

/**
 * Restar una matriz por un numero escalar.
 * 
 * @param {Array<number>} matriz La matriz que será restar.
 * @param {number} escalar El numero por el que se va a restar la Matriz.
 * @returns Un arreglo bidimensinal con la matriz resultante.
 */
function restaMatrizEscalar(matriz, escalar) {
    let mat = []; //Matriz resultante

    for (let f = 0; f < cantFilas(matriz); f++) {
        let fila = []; //Será cada fila de la matriz resultante

        for (let c = 0; c < cantCols(matriz); c++) {
            let v = (matriz[f][c] - escalar);

            fila.push(v);
        }

        mat.push(fila);
    }

    return mat;
}
