class Matriz {

    #filas;
    #cols;
    #datos;

    /**
     * Copiar un arreglo bidimensional y devolver uno con los mismos valores.
     * 
     * @param {Array<number>} datos El arreglo bidimensional que se desa copiar.
     * @returns Un arreglo bidimensional con los mismos valores que el parámetro recibido.
     */
    static #copiarDatos(datos) {
        if (!checkArray(datos)) {
            return;
        }

        let result = [];
        let aux = datos.slice();

        for (let i = 0; i < datos.length; i++) {
            let a = aux[i].slice();

            result.push(a);
        }

        return result;
    }

    /**
     * Sustiruir los datos recibidos en la fila especificada en la matriz recibida.
     * 
     * @param {Matriz} matriz La matriz en la que serán reemplazados los datos.
     * @param {number} indice La fila de los nuevos datos.
     * @param {Array<number>} datos Una matriz de orden 1 x N, donde N es igual al numero de columnas de la martiz.
     * @returns Un objeto de tipo Matriz con los datos modificados.
     */
    static #reemplazarFila(matriz, indice, datos) {
        if (matriz.cols != datos.length) {
            alert("Para poder reemplazarse, el numero de valores en la fila debe ser el mismo");
            return null;
        }

        let dat = Matriz.#copiarDatos(matriz.#datos);

        dat[indice] = datos;

        return new Matriz(dat);
    }

    /**
     * Sustiruir los datos recibidos en la columna especificada en la matriz recibida.
     * 
     * @param {Matriz} matriz La matriz en la que serán reemplazados los datos.
     * @param {number} indice La fila de los nuevos datos.
     * @param {Array<number>} datos Una matriz de orden N x 1, donde N es igual al numero de filas de la martiz.
     * @returns Un objeto de tipo Matriz con los datos modificados.
     */
    static #reemplazarColumna(matriz, indice, datos) {
        if (matriz.filas != datos.length) {
            alert("Para poder reemplazarse, el numero de valores en la columna debe ser el mismo");
            return null;
        }

        let dat = Matriz.#copiarDatos(matriz.#datos);

        for (let f = 0; f < matriz.filas; f++) {
            dat[f][indice] = datos[f];
        }

        return new Matriz(dat);
    }

    /**
     * Construye una matriz de identidad del tamaño especificado.
     * 
     * @param {number} orden El numero de filas y columnas de la matriz de identidad.
     * @return Un objeto de tipo Matriz con los valores de una matriz de identidad.
     */
    static construirMatrizIdentidad(orden) {
        let dat = [];

        for (let f = 0; f < orden; f++) {
            let fila = [];

            for (let c = 0; c < orden; c++) {
                if (f == c) {
                    fila.push(1);
                } else {
                    fila.push(0);
                }
            }

            dat.push(fila);
        }

        return new Matriz(dat);
    }

    /**
     * Sumar una Matriz por un numero escalar.
     * 
     * @param {Matriz} matriz La matriz que será sumada.
     * @param {number} escalar El numero por el que se va a sumar la Matriz.
     * @returns La Matriz resultante.
     */
    static sumaMatrizEscalar(matriz, escalar) {
        if (!checkType(escalar, "number")) {
            return;
        }

        let dat = [];

        for (let f = 0; f < matriz.filas; f++) {
            let fila = [];

            for (let c = 0; c < matriz.cols; c++) {
                let v = (matriz.getElemento(f, c) + escalar);

                fila.push(v);
            }

            dat.push(fila);
        }

        return new Matriz(dat);
    }

    /**
     * Dividir una Matriz entre un numero escalar.
     * 
     * @param {Matriz} matriz La matriz que será dividida.
     * @param {number} escalar El numero por el que se va a dividir la Matriz.
     * @returns La Matriz resultante.
     */
    static divMatrizEscalar(matriz, escalar) {
        if (!checkType(escalar, "number")) {
            return;
        }

        let dat = [];

        for (let f = 0; f < matriz.filas; f++) {
            let fila = [];

            for (let c = 0; c < matriz.cols; c++) {
                let v = (matriz.getElemento(f, c) / escalar);

                fila.push(v);
            }

            dat.push(fila);
        }

        return new Matriz(dat);
    }

    /**
     * Multiplicar una Matriz por un numero escalar.
     * 
     * @param {Matriz} matriz La matriz que será multiplicar.
     * @param {number} escalar El numero por el que se va a multiplicar la Matriz.
     * @returns La Matriz resultante.
     */
    static multMatrizEscalar(matriz, escalar) {
        if (!checkType(escalar, "number")) {
            return;
        }

        let dat = [];

        for (let f = 0; f < matriz.filas; f++) {
            let fila = [];

            for (let c = 0; c < matriz.cols; c++) {
                let v = (matriz.getElemento(f, c) * escalar);

                fila.push(v);
            }

            dat.push(fila);
        }

        return new Matriz(dat);
    }

    //! Metodo erroneo
    /**
     * Multiplicar una Matriz por otra Matriz.
     * 
     * @param {Matriz} m1 La primera matriz que será multiplicada.
     * @param {Matriz} m2 La segunda matriz que será multiplicada.
     * @returns null si las matrices no son válidas (el numero de columnas de la primera no es igual al numero de filas de la segunda), 
     * si son válidas, un arreglo asociativo con dos elementos, 
     * "res", que será una objeto Matriz resultante, y 
     * "text", que será un string con el proceso de resolución.
     */
    static multMatrizMatriz(m1, m2) {
        if (m1.cols != m2.filas) {
            alert("Para poder multiplicarse, el numero de columnas de la primer matriz debe ser igual al numero de filas de la segunda matriz");
            return null;
        }

        let dat = [];
        let text = "";

        for (let f = 0; f < m1.filas; f++) {
            let fila = [];

            for (let c = 0; c < m2.cols; c++) {
                let v = 0;
                text += "--> Multiplicar todos los valores de la fila " + (f + 1) + " de la primera matriz por los de la columna " + (c + 1) + " de la segunda:\n";

                for (let i = 0; i < m1.cols; i++) {
                    let e1 = m1.getElemento(f, i), e2 = m2.getElemento(i, c);
                    v += e1 * e2;
                    text += "(" + e1 + " * " + e2 + ") + ";
                }

                fila.push(v);

                text = text.substring(0, text.length - 3) + " = " + v + "\n";
            }


            dat.push(fila);
        }

        return {
            "res": new Matriz(dat),
            "text": text
        }
    }

    /**
     * Calcular los valores de las variables a partir de la información del sistema de ecuaciones proporcionada.
     * 
     * @param {Matriz} matrizCoefs La matriz de los coeficientes del sistema.
     * @param {Matriz} matrizIndep La matriz de los valores independientes del sistema.
     * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
     * si es válida, un objeto Matriz con los valores de las variables en el orden recibido.
     */
    static sistPorInversa(matrizCoefs, matrizIndep) {
        if (matrizCoefs.filas != matrizIndep.filas) {
            alert("Para calcular el sistema, el numero de filas de la matriz de coeficientes y la independiente debe ser el mismo");
            return null;
        } else if (matrizIndep.cols > 1) {
            alert("Para calcular el sistema, el numero de columnas de la matriz independiente debe ser 1");
            return null;
        }

        let inv = matrizCoefs.calcularInversaPorDeterminante();

        if (inv === null) {
            return null;
        }
        let text = "-->Calcular la matriz inversa de la matriz de coeficientes:\n"
            + inv["text"]
            + "--->>>Matriz inversa de la matriz de coeficientes<<<---\n"
            + inv["res"].toString()
            + "--> Multiplicar por la matriz independiente:\n";

        let mult = Matriz.multMatrizMatriz(inv["res"], matrizIndep);

        text += mult["text"];

        return {
            "res": mult["res"],
            "text": text
        }
    }

    /**
     * Calcular los valores de las variables a partir de la información del sistema de ecuaciones proporcionada.
     * 
     * @param {Matriz} matrizCoefs La matriz de los coeficientes del sistema.
     * @param {Matriz} matrizIndep La matriz de los valores independientes del sistema.
     * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
     * si es válida, un objeto Matriz con los valores de las variables en el orden recibido.
     */
    static sistPorCramer(matrizCoefs, matrizIndep) {
        if (matrizCoefs.filas != matrizIndep.filas) {
            alert("Para calcular el sistema, el numero de filas de la matriz de coeficientes y la independiente debe ser el mismo");
            return null;
        } else if (matrizIndep.cols > 1) {
            alert("Para calcular el sistema, el numero de columnas de la matriz independiente debe ser 1");
            return null;
        }

        let dS = matrizCoefs.calcularDeterminante();

        if (dS["res"] == 0) {
            alert("Para calcular el sistema, el determinante de la matriz debe ser diferente de 0");
            return null;
        }

        let text = "-->Calcular el determinante de la matriz de coeficientes:\n"
            + dS["text"]
            + "--->>> Determinante del sistema <<<---\n"
            + dS["res"] + "\n";

        let dets = [];
        let indep = [];

        for (let f = 0; f < matrizIndep.filas; f++) {
            indep.push(matrizIndep.getElemento(f, 0));
        }

        for (let i = 0; i < matrizCoefs.cols; i++) {
            let m = Matriz.#reemplazarColumna(matrizCoefs, i, indep);
            let d = m.calcularDeterminante();
            let aux = [d["res"]];

            text += "--> Construir la matriz de la variable " + (i + 1) + ":\n"
                + "--> Reemplazar la columna " + (i + 1) + " con la matriz independiente:\n"
                + m.toString()
                + "--> Calcular el determinante de la matriz " + (i + 1) + ":\n"
                + d["text"]
                + "--->>> Determinante de la matriz " + (i + 1) + " <<<---\n"
                + d["res"] + "\n";

            dets.push(aux);
        }

        let div = Matriz.divMatrizEscalar(new Matriz(dets), dS["res"]);

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
     * @param {Matriz} matrizCoefs La matriz de los coeficientes del sistema.
     * @param {Matriz} matrizIndep La matriz de los valores independientes del sistema.
     * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
     * si es válida, un objeto Matriz con los valores de las variables en el orden recibido.
     */
    static sistPorGaussJordan(matrizCoefs, matrizIndep) {
        if (matrizCoefs.filas != matrizIndep.filas) {
            alert("Para calcular el sistema, el numero de filas de la matriz de coeficientes y la independiente debe ser el mismo");
            return null;
        } else if (matrizIndep.cols > 1) {
            alert("Para calcular el sistema, el numero de columnas de la matriz independiente debe ser 1");
            return null;
        }

        if (matrizCoefs.calcularDeterminante()["res"] == 0) {
            alert("Para calcular el sistema, el determinante de la matriz debe ser diferente de 0");
            return null;
        }

        // let matrizIdentidad = Matriz.construirMatrizIdentidad(this.filas);
        let sist = Matriz.#copiarDatos(matrizCoefs.#datos);
        let indep = Matriz.#copiarDatos(matrizIndep.#datos);
        let text = "--> Construir una matriz de identidad del tamano de la matriz:\n"
            // + matrizIdentidad.toString()
            + "--> Reducir los elementos que no estan en la diagonal principal:\n";

        for (let c = 0; c < matrizCoefs.cols; c++) {
            text += "--> Operar la columna " + (c + 1) + "\n";

            for (let f = 0; f < matrizCoefs.filas; f++) {
                if (f == c) { //Si está en la diagonal principal no operarlo
                    text += "--> No operar el elemento (" + (f + 1) + ", " + (c + 1) + ")\n";
                    continue;
                }

                let fA1 = sist[f]; //Fila de la matriz actual
                let fA2 = sist[c]; //Fila de la matriz actual
                let e1 = fA1[c]; //Elemento a reducir de la primer fila de matriz actual
                let e2 = fA2[c]; //Elemento a reducir de la primer fila de matriz actual
                let a = mcm(Math.abs(e1), Math.abs(e2)); //Minimo Comun Multiplo
                let m1 = Math.abs(a / e1);
                let m2 = ((e1 / Math.abs(e1)) == (e2 / Math.abs(e2))) ? Math.abs(a / e2) * -1 : Math.abs(a / e2); //Si son del mismo signo, hacerlo negativo, si no, positivo

                if (e1 == 0) { //Si ya esta reducido
                    text += "--> El elemento (" + (f + 1) + ", " + (c + 1) + ") ya esta reducido\n";
                    continue;
                }

                text += "--> Multiplicar la fila (" + (f + 1) + ") por " + m1 + " y la (" + (c + 1) + ") por " + m2 + " y sumar elemento por elemento\n";

                let auxA1 = "";
                let auxA2 = "";
                let auxI1 = "";
                let auxI2 = "";
                let auxR1 = "";
                let auxR2 = "";
                for (let i = 0; i < matrizCoefs.cols; i++) { //Para cada valor
                    auxA1 += (fA1[i] * m1) + "    ";
                    auxA2 += (fA2[i] * m2) + "    ";

                    fA1[i] = (fA1[i] * m1) + (fA2[i] * m2);

                    auxR1 += fA1[i] + "    ";
                }

                text += auxA1 + "|    " + (indep[f][0] * m1) + "\n"
                    + auxA2 + "|    " + (indep[c][0] * m2) + "\n"
                    + "------------------------------------\n";

                indep[f][0] = (indep[f][0] * m1) + (indep[c][0] * m2);

                text += auxR1 + "|    " + indep[f][0] + "\n";
            }

            text += "--> Reemplazar con los valores de las nuevas filas\n"
                + "--->>> Nueva matriz <<<---\n"
                + (new Matriz(sist)).toString()
                + "--->>> Nueva matriz indepentiente <<<---\n"
                + (new Matriz(indep)).toString();
        }

        text += "--> Dividir las filas de la matriz de identidad entre su respectivo valor de la matriz:\n";

        for (let f = 0; f < matrizCoefs.filas; f++) {
            text += "--> Dividir la el elemento indepentiente " + (f + 1) + " entre el valor (" + (f + 1) + ", " + (f + 1) + ") de la matriz principal (" + sist[f][f] + ")\n";

            // for (let c = 0; c < matrizCoefs.#cols; c++) {
            indep[f][0] = indep[f][0] / sist[f][f];
            // }
        }

        return {
            "res": new Matriz(indep),
            "text": text
        }
    }

    /**
     * Crear un objeto de tipo Matriz, que puede calcular su determinante, inversa, traspuesta, etc.
     * 
     * @param {Array<Array<number>>} datos Un arreglo bidimensional con los valores para construir la matriz.
     * @returns Un objeto de tipo Matriz para realizar diversos calculos.
     */
    constructor(datos) {
        if (!checkArray(datos)) {
            return;
        }

        this.#cols = this.#initFilas(datos);
        this.#filas = datos.length;
        this.#datos = datos;
    }

    #initFilas(datos) {
        let cantFilas = 0;

        for (let c = 0; c < datos.length; c++) {
            const fila = datos[c];

            checkArray(fila);

            for (let f = 0; f < fila.length; f++) {
                checkType(fila[f], "number");
            }

            if (cantFilas == 0) {
                cantFilas = fila.length;
            }

            if (fila.length != cantFilas) {
                throw "Todas las filas de la matriz deben tener la misma longitud";
            }
        }

        if (cantFilas == 0) {
            throw "Las filas deben tener al menos un dato";
        }

        return cantFilas;
    }

    /**
     * Calcula el determinante de esta Matriz, devolviendo el valor del resultado y el proceso.
     * 
     * @returns null si la matriz no es válida (no es cuadrada), 
     * si es válida, un arreglo asociativo con dos elementos, 
     * "res", que será un número con el valor del determinante, y 
     * "text", que será un string con el proceso de resolución.
     */
    calcularDeterminante(porSarrus) {
        if (this.#filas != this.#cols) { //Si la matriz no es cuadrada
            alert("Para calcular el determinante, la matriz debe ser cuadrada");
            return null;
        }

        if (porSarrus != false) {
            if ((this.#filas == 3) && (this.#cols == 3)) { //Si la matriz es de 3 x 3 y se puede calcular por Sarrus
                return this.calcularDeterminantePorSarrus();
            }
        }

        let res = NaN;
        let text;

        if (this.#filas == 2 && this.#cols == 2) { //Si la matriz es de dos por dos
            res = (this.getElemento(0, 0) * this.getElemento(1, 1)) - (this.getElemento(1, 0) * this.getElemento(0, 1));

            text = "(" + this.getElemento(0, 0) + " * " + this.getElemento(1, 1) + ") - (" + this.getElemento(1, 0) + " * " + this.getElemento(0, 1) + ") = " + res + "\n";
        } else { //Si la matriz es mas grande
            res = 0;
            text = "";
            let dets = [];
            let cofs = [];
            let signo = 1;
            const f = 0; //Solo procesar la primer fila

            for (let c = 0; c < this.#cols; c++) {
                let m = this.#eliminarFilaCol(f, c);
                let det = m.calcularDeterminante();

                text += "--> Calcular el determinante de la submatriz (" + (f + 1) + ", " + (c + 1) + "):\n";
                text += m.toString();
                text += det["text"];

                dets.push(det["res"]);

                cofs.push(this.getElemento(f, c));
            }

            text += "--> Multiplicar los determinantes por sus respectivos cofactores: \n";

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

                let v = cofs[i] * dets[i] * signo;

                res += v;

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

            text += "\n--> Sumar todos los valores obtenidos:\n" + aux + " = " + res + "\n";
        }

        return {
            "res": res,
            "text": text
        };
    }

    /**
     * Calcula el determinante de esta Matriz por el método de Sarrus, devolviendo el valor del resultado y el proceso.
     * La matriz debe se rde orden 3 x 3.
     * 
     * @returns null si la matriz no es válida (no es de 3 x 3), 
     * si es válida, un arreglo asociativo con dos elementos, 
     * "res", que será un número con el valor del determinante, y 
     * "text", que será un string con el proceso de resolución.
     */
    calcularDeterminantePorSarrus() {
        if ((this.#filas != 3) || (this.#cols != 3)) { //Si la matriz no es de 3 x 3
            alert("Para calcular el determinante por el metodo de Sarrus, la matriz debe ser de 3 x 3");
            return null;
        }

        let dat = Matriz.#copiarDatos(this.#datos); //Construir la matriz para calcular por Sarrus
        dat.push(Matriz.#copiarDatos(this.#datos)[0]);
        dat.push(Matriz.#copiarDatos(this.#datos)[1]);

        let mat = new Matriz(dat); //Crear la matriz para calcular por Sarrus
        let valores = [];

        let text = "--> Multiplicar las diagonales descendentes:\n";

        for (let d = 0; d < 3; d++) { //Diagonales descendentes
            let valor = 1;

            text += "(";

            for (let i = 0; i < 3; i++) {
                const e = mat.getElemento((i + d), i);

                valor *= e;

                text += e;

                if (i != 2) {
                    text += " * ";
                }
            }

            valores.push(valor);

            text += ")";

            if (d != 2) {
                text += " + ";
            }
        }

        text += "\n--> Multiplicar las diagonales ascendentes y multiplicar cada una por -1:\n";

        for (let d = 0; d < 3; d++) { //Diagonales ascendentes
            let valor = 1;

            text += "(";

            for (let c = 0, f = 2; c < 3; f--, c++) {
                const e = mat.getElemento((f + d), c);

                valor *= e;

                text += e;

                text += " * ";
            }

            valores.push(valor * -1);

            text += "-1)";

            if (d != 2) {
                text += " + "
            }
        }

        let res = 0;

        text += "\n--> Sumar todos los valores obtenidos:\n";

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
            res += v;
        }

        text += " = " + res + "\n";

        return {
            "res": res,
            "text": text
        }
    }

    /**
     * Construye la matriz adjunta de esta Matriz, devolviendo el valor del resultado y el proceso.
     * 
     * @returns null si la matriz no es válida (no es cuadrada), 
     * si es válida, un arreglo asociativo con dos elementos, 
     * "res", que será una objeto Matriz que es la adjunta, y 
     * "text", que será un string con el proceso de resolución.
     */
    calcularAdjunta() {
        if (this.#filas != this.#cols) { //Si la matriz no es cuadrada
            alert("Para calcular la adjunta, la matriz debe ser cuadrada");
            return null;
        }

        let text = "";

        let dets = [];

        for (let f = 0; f < this.#filas; f++) {
            let signo = (f % 2 == 0) ? 1 : -1;
            let aux = [];

            for (let c = 0; c < this.#cols; c++) {
                let mat = this.#eliminarFilaCol(f, c);
                let det = mat.calcularDeterminante();

                text += "--> Calcular el determinante de la submatriz (" + (f + 1) + ", " + (c + 1) + "):\n"
                    + mat.toString()
                    + det["text"]
                    + "--->>> Determinante <<<---\n"
                    + det["res"] + "\n";

                aux.push(det["res"] * signo);

                signo *= -1;
            }

            dets.push(aux);
        }

        let matB = new Matriz(dets);
        let tras = matB.calcularTraspuesta();

        text += "--> Colocar los valores segun su posicion en una nueva matriz, intercalando un signo positivo y uno negativo:\n";
        text += matB.toString();
        text += "--> Construir la traspuesta de la nueva matriz:\n";
        text += tras["text"];

        return {
            "res": tras["res"],
            "text": text
        }
    }

    /**
     * Construye la matriz inversa de esta Matriz utilizando el método de Gauss-Jordan, devolviendo el valor del resultado y el proceso.
     * 
     * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
     * si es válida, un arreglo asociativo con dos elementos, 
     * "res", que será una objeto Matriz que es la inversa, y 
     * "text", que será un string con el proceso de resolución.
     */
    calcularInversaPorGaussJordan() {
        if (this.#filas != this.#cols) { //Si la matriz no es cuadrada
            alert("Para calcular la inversa, la matriz debe ser cuadrada");
            return null;
        }

        if (this.calcularDeterminante()["res"] == 0) {
            alert("Para calcular la inversa, el determinante de la matriz debe ser diferente de 0");
            return null;
        }

        let matrizIdentidad = Matriz.construirMatrizIdentidad(this.filas);
        let sist = new Matriz(Matriz.#copiarDatos(this.#datos)).#datos;
        let iden = matrizIdentidad.#datos;
        let text = "--> Construir una matriz de identidad del tamano de la matriz:\n"
            + matrizIdentidad.toString()
            + "--> Reducir los elementos que no estan en la diagonal principal:\n";

        for (let c = 0; c < this.#cols; c++) {
            text += "--> Operar la columna " + (c + 1) + "\n";

            for (let f = 0; f < this.#filas; f++) {
                if (f == c) { //Si está en la diagonal principal no operarlo
                    text += "--> No operar el elemento (" + (f + 1) + ", " + (c + 1) + ")\n";
                    continue;
                }

                let fA1 = sist[f]; //Fila de la matriz actual
                let fI1 = iden[f]; //Fila de la matriz de identidad
                let fA2 = sist[c];
                let fI2 = iden[c];
                let e1 = fA1[c]; //Elemento a reducir de la primer fila de matriz actual
                let e2 = fA2[c]; //Elemento a reducir de la primer fila de matriz actual
                let a = mcm(Math.abs(e1), Math.abs(e2)); //Minimo Comun Multiplo
                let m1 = Math.abs(a / e1);
                let m2 = ((e1 / Math.abs(e1)) == (e2 / Math.abs(e2))) ? Math.abs(a / e2) * -1 : Math.abs(a / e2); //Si son del mismo signo, hacerlo negativo, si no, positivo

                if (e1 == 0) { //Si ya esta reducido
                    text += "--> El elemento (" + (f + 1) + ", " + (c + 1) + ") ya esta reducido\n";
                    continue;
                }

                text += "--> Multiplicar la fila (" + (f + 1) + ") por " + m1 + " y la (" + (c + 1) + ") por " + m2 + " y sumar elemento por elemento\n";

                let auxA1 = "";
                let auxA2 = "";
                let auxI1 = "";
                let auxI2 = "";
                let auxR1 = "";
                let auxR2 = "";
                for (let i = 0; i < this.#cols; i++) { //Para cada valor
                    auxA1 += (fA1[i] * m1) + "    ";
                    auxA2 += (fA2[i] * m2) + "    ";
                    auxI1 += (fI1[i] * m1) + "    ";
                    auxI2 += (fI2[i] * m2) + "    ";

                    fA1[i] = (fA1[i] * m1) + (fA2[i] * m2);
                    fI1[i] = (fI1[i] * m1) + (fI2[i] * m2);

                    auxR1 += fA1[i] + "    ";
                    auxR2 += fI1[i] + "    ";
                }

                text += auxA1 + "|    " + auxI1 + "\n"
                    + auxA2 + "|    " + auxI2 + "\n"
                    + "------------------------------------\n"
                    + auxR1 + "|    " + auxR2 + "\n";
            }

            text += "--> Reemplazar con los valores de las nuevas filas\n"
                + "--->>> Nueva matriz <<<---\n"
                + (new Matriz(sist)).toString()
                + "--->>> Nueva matriz de identidad <<<---\n"
                + (new Matriz(iden)).toString();
        }

        text += "--> Dividir las filas de la matriz de identidad entre su respectivo valor de la matriz:\n";

        for (let f = 0; f < this.#filas; f++) {
            text += "--> Dividir la fila " + (f + 1) + " entre el valor (" + (f + 1) + ", " + (f + 1) + ") de la matriz principal (" + sist[f][f] + ")\n";

            for (let c = 0; c < this.#cols; c++) {
                iden[f][c] = iden[f][c] / sist[f][f];
            }
        }

        return {
            "res": new Matriz(iden),
            "text": text
        }
    }

    /**
     * Construye la matriz inversa de esta Matriz utilizando el método de determinantes, devolviendo el valor del resultado y el proceso.
     * 
     * @returns null si la matriz no es válida (no es cuadrada o su determinante es 0), 
     * si es válida, un arreglo asociativo con dos elementos, 
     * "res", que será una objeto Matriz que es la inversa, y 
     * "text", que será un string con el proceso de resolución.
     */
    calcularInversaPorDeterminante() {
        if (this.#filas != this.#cols) { //Si la matriz no es cuadrada
            alert("Para calcular la inversa, la matriz debe ser cuadrada");
            return null;
        }

        let d = this.calcularDeterminante();

        if (d["res"] == 0) {
            alert("Para calcular la inversa, el determinante de la matriz debe ser diferente de 0");
            return null;
        }

        let a = this.calcularAdjunta();

        let text = "--> Calcular el determinante de la matriz:\n"
            + d["text"]
            + "--->>> Determinante de la matriz <<<---\n"
            + d["res"]
            + "\n--> Calcular la adjunta de la matriz:\n"
            + a["text"]
            + "--->>> Matriz adjunta <<<---\n"
            + a["res"].toString()
            + "--> Dividir cada elemento de la adjunta entre el determinante de la matriz (" + d["res"] + ")\n";

        return {
            "res": Matriz.divMatrizEscalar(a["res"], d["res"]),
            "text": text
        }
    }

    /**
     * Construye la matriz traspuesta de esta Matriz, devolviendo el valor del resultado y el proceso.
     * 
     * @returns Un arreglo asociativo con dos elementos, 
     * "res", que será una objeto Matriz que es la traspuesta, y 
     * "text", que será un string con el proceso de resolución.
     */
    calcularTraspuesta() {
        let text = "";

        let dat = [];

        for (let f = 0; f < this.#filas; f++) {
            let aux = [];

            for (let c = 0; c < this.#cols; c++) {
                aux.push(this.getElemento(c, f));
                text += "--> Mover el valor " + this.getElemento(f, c) + ", de (" + (f + 1) + ", " + (c + 1) + ") a (" + (c + 1) + ", " + (f + 1) + ")\n";
            }

            dat.push(aux);
        }

        return {
            "res": new Matriz(dat),
            "text": text
        };
    }

    /**
     * Convierte los datos contenidos en esta matriz en fracciones.
     * 
     * @returns Un string con los datos valores de esta Matriz en forma de fracciones.
     */
    convertirAFracciones() {
        let text = "";

        for (let f = 0; f < this.#filas; f++) {
            for (let c = 0; c < this.#cols; c++) {
                let e = obtenerFraccion(this.getElemento(f, c));

                text += "(" + e["numer"] + " / " + e["denom"] + ")    ";
            }

            text += "\n";
        }

        return text;
    }

    /**
     * Obtener los datos en la fila deseada.
     * @param {number} fila El indice de la fila que se desa obtener.
     * @returns Un arreglo con los datos de la fila deseada.
     */
    getFila(fila) {
        return Matriz.#copiarDatos(this.#datos)[fila];
    }

    /**
     * Obtener los datos en la columna deseada.
     * @param {number} fila El indice de la columna que se desa obtener.
     * @returns Un arreglo con los datos de la columna deseada.
     */
    getColumna(col) {
        let dat = Matriz.#copiarDatos(this.#datos);
        let result = [];

        for (let f = 0; f < dat.length; f++) {
            result.push(dat[f][col]);
        }

        return result;
    }

    #eliminarFilaCol(fila, col) {
        if (!this.#validarFila(fila) || !this.#validarCol(col)) {
            return;
        }

        let result = Matriz.#copiarDatos(this.#datos);

        result.splice(fila, 1);

        for (let f = 0; f < (this.#filas - 1); f++) {
            result[f].splice(col, 1);
        }

        return new Matriz(result);
    }

    #eliminarFila(fila) {
        if (!this.#validarFila(fila)) {
            return;
        }

        let result = this.#datos.slice();
        result.splice(fila, 1);

        return new Matriz(result);
    }

    #eliminarColumna(col) {
        if (!this.#validarCol(col)) {
            return;
        }

        let result = Matriz.#copiarDatos(this.#datos);
        for (let f = 0; f < this.#filas; f++) {
            result[f].splice(col, 1);
        }

        return new Matriz(result);
    }

    #validarFila(fila) {
        if ((fila > this.#filas - 1) || (fila < 0)) {
            alert("Fila debe ser un numero entre 0 y " + (this.#filas - 1) + ", recibido: " + fila);
            return false;
        } else {
            return true;
        }
    }

    #validarCol(col) {
        if ((col > this.#cols - 1) || (col < 0)) {
            alert("Columna debe ser un numero entre 0 y " + (this.#cols - 1) + ", recibido: " + col);
            return false;
        } else {
            return true;
        }
    }

    /**
     * Imprimir en consola los valores de esta Matriz.
     */
    imprimir() {
        console.log(this.toString());
    }

    /**
     * Obtener los valores de esta Matriz en formato de texto.
     * 
     * @returns Un string con los valores de esta Matriz.
     */
    toString() {
        let mat = "";

        for (let f = 0; f < this.#filas; f++) {
            for (let c = 0; c < this.#cols; c++) {
                mat += this.getElemento(f, c) + "    ";
            }
            mat += "\n";
        }

        return mat;
    }

    getElemento(fila, col) {
        if (!this.#validarFila(fila) || !this.#validarCol(col)) {
            return;
        }

        return this.#datos[fila][col];
    }

    get datos() {
        return this.#datos;
    }

    set filas(cantFilas) {
        alert("No se puede modificar la cantidad de filas de una matriz");
    }

    get filas() {
        return this.#filas;
    }

    set cols(cantCols) {
        alert("No se puede modificar la cantidad de columnas de una matriz");
    }

    get cols() {
        return this.#cols;
    }

}

function checkType(val, expected) {
    if (typeof (expected) != "string") {
        throw "DataTypeError: la variable deberia ser de tipo string, recibido " + typeof (expected);
    }

    if (typeof (val) != expected) {
        throw "DataTypeError: la variable deberia ser de tipo " + expected + ", recibido " + typeof (val);
    }

    return true;
}

function checkArray(array) {
    if (!Array.isArray(array)) { //Comprobar arrays
        throw "DataTytpeError: la variable deberia ser de tipo Array, recibido " + typeof (array);
    }

    return true;
}

function mcd(a, b) {
    return (b === 0) ? a : mcd(b, a % b);
};

function mcm(a, b) {
    return a * b / mcd(a, b);
};

function smallestCommons(arr) {
    arr = arr.sort();
    var arr2 = Array.from(new Array(arr[1] - arr[0] + 1), function (_, i) { return i + arr[0] });
    //reducimos el array calculando cada numero por el mcm anterior.
    return arr2.reduce(function (a, b) {
        // document.write("a " + a + " b " + b + " = " + mcm(a, b) + "<br>");
        return mcm(a, b)
    });
}

/**
 * Convertir un numero decimal a fraccion.
 * 
 * @param {number} frac El numero decimal que se quiere convertir a fraccion.
 * @param {number} tol La tolerancia de error pertmitida.
 * @returns Un arreglo asociativo con dos elementos, "numer" y "denom", que serán el numerador y denominador de "frac".
 */
function obtenerFraccion(frac, tol) {
    if (tol === undefined) {
        tol = 0.00001;
    }

    let original = frac;
    let it = 0;
    let denom = 1, last_d = 0, numer;

    while (it < 20) {
        frac = 1 / (frac - Math.floor(frac))
        let _d = denom;
        denom = Math.floor(denom * frac + last_d);
        last_d = _d;
        numer = Math.ceil(original * denom)

        if (Math.abs((numer / denom) - original) < tol) {
            break;
        }
        it++;
    }

    return { "numer": numer, "denom": denom };
};

//! Funciones para convertir a fracciones no utilizadas
/*
function obtFraccion(dec) {
    let den = Math.pow(contarDecimales(dec % 1), 10);
    let num = (dec % 1) * den;
    let mcd = EuclidesMCD(den , num);

    /*
    if (num == 0) { //Si 'dec' es entero
        return parseInt(dec);
    }
    *

    console.log(dec + " a fraccion: (" + (num / mcd) + " / " + (den / mcd) + "), mcd = " + mcd);
}

function EuclidesMCD(n1, n2) {
    let nAux; //auxiliar
    n1 = Math.abs(n1); //tomamos valor absoluto
    n2 = Math.abs(n2);
    let i1 = Math.max(n1, n2); //i1 = el más grande
    let i2 = Math.min(n1, n2); //i2 = el más pequeño

    do {
        nAux = i2; //guardar divisor
        i2 = i1 % i2; //resto pasa a divisor
        i1 = nAux; //divisor pasa a dividendo
    } while (i2 !== 0);

    return i1; //ultimo resto no nulo
}

function contarDecimales(num) {
    if (Math.floor(num) === num) {
        return 0;
    }

    return num.toString().split(".")[1].length || 0;
}
*/
