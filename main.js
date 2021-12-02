
main();

function main() {
    let opcion = prompt("Que desea realizar?\n\n"
        + " 1.  Sumar matriz y escalar\n"
        + " 2.  Restar matriz y escalar\n"
        + " 3.  Producto de matriz por escalar\n"
        + " 4.  Cociente de matriz por escalar\n"
        + " 5.  Producto de matriz por matriz\n"
        + " 6.  Determinante de matriz\n"
        + " 7.  Traspuesta de matriz\n"
        + " 8.  Adjunta de matriz\n"
        + " 9.  Inversa por Gauss-Jordan\n"
        + " 10. Inversa por adjunta\n"
        + " 11. Sistema por Gauss-Jordan\n"
        + " 12. Sistema por Cramer\n"
        + " 13. Sistema por matriz inversa\n"
        + " 14. Salir"
    );

    let matriz1 = null;
    let matriz2 = null;
    let numero = null;
    let resultado = null;

    switch (opcion) {
        case "1": //Sumar matriz y escalar
            console.log("\n\n- - - > > > Operacion " + opcion + ": Sumar matriz y escalar");
            matriz1 = pedirDatosDeMatriz();
            numero = pedirNumero();

            resultado = sumaMatrizEscalar(matriz1, numero);
            break;
        case "2": //Restar matriz y escalar
            console.log("\n\n- - - > > > Operacion " + opcion + ": Restar matriz y escalar");
            matriz1 = pedirDatosDeMatriz();
            numero = pedirNumero();

            resultado = restaMatrizEscalar(matriz1, numero);
            break;
        case "3": //Producto de matriz por escalar
            console.log("\n\n- - - > > > Operacion " + opcion + ": Producto de matriz por escalar");
            matriz1 = pedirDatosDeMatriz();
            numero = pedirNumero();

            resultado = multMatrizEscalar(matriz1, numero);
            break;
        case "4": //Cociente de matriz por escalar
            console.log("\n\n- - - > > > Operacion " + opcion + ": Cociente de matriz por escalar");
            matriz1 = pedirDatosDeMatriz();
            numero = pedirNumero();

            resultado = divMatrizEscalar(matriz1, numero);
            break;
        case "5": //Producto de matriz por matriz
            console.log("\n\n- - - > > > Operacion " + opcion + ": Producto de matriz por matriz");
            matriz1 = pedirDatosDeMatriz();
            matriz2 = pedirDatosDeMatriz();

            resultado = multMatrizMatriz(matriz1, matriz2);
            break;
        case "6": //Determinante de matriz
            console.log("\n\n- - - > > > Operacion " + opcion + ": Determinante de matriz");
            matriz1 = pedirDatosDeMatriz();

            resultado = calcularDeterminante(matriz1);
            break;
        case "7": //Traspuesta de matriz
            console.log("\n\n- - - > > > Operacion " + opcion + ": Traspuesta de matriz");
            matriz1 = pedirDatosDeMatriz();

            resultado = calcularTraspuesta(matriz1);
            break;
        case "8":  //Adjunta de matriz
            console.log("\n\n- - - > > > Operacion " + opcion + ": Adjunta de matriz");
            matriz1 = pedirDatosDeMatriz();

            resultado = calcularAdjunta(matriz1);
            break;
        case "9":  //Inversa por Gauss-Jordan
            console.log("\n\n- - - > > > Operacion " + opcion + ": Inversa por Gauss-Jordan");
            matriz1 = pedirDatosDeMatriz();

            resultado = calcularInversaPorGaussJordan(matriz1);
            break;
        case "10":  //Inversa por adjunta
            console.log("\n\n- - - > > > Operacion " + opcion + ": Inversa por adjunta");
            matriz1 = pedirDatosDeMatriz();

            resultado = calcularInversaPorAdjunta(matriz1);
            break;
        case "11":  //Sistema por Gauss-Jordan
            console.log("\n\n- - - > > > Operacion " + opcion + ": Sistema por Gauss-Jordan");
            matriz1 = pedirDatosDeMatriz();
            matriz2 = pedirDatosDeMatriz();

            resultado = calcularSistPorGaussJordan(matriz1, matriz2);
            break;
        case "12":  //Sistema por Cramer
            console.log("\n\n- - - > > > Operacion " + opcion + ": Sistema por Cramer");
            matriz1 = pedirDatosDeMatriz();
            matriz2 = pedirDatosDeMatriz();

            resultado = calcularSistPorCramer(matriz1, matriz2);
            break;
        case "13":  //Sistema por matriz inversa
            console.log("\n\n- - - > > > Operacion " + opcion + ": Sistema por matriz inversa");
            matriz1 = pedirDatosDeMatriz();
            matriz2 = pedirDatosDeMatriz();

            resultado = calcularSistPorInversa(matriz1, matriz2);
            break;
        case "14":  //Salir
            console.log("\n\n- - - > > > Opcion " + opcion + ": Salir");
            alert("Gracias por usar el programa");
            return; //No volver a preguntar
        default:
            alert("Opcion no valida");
    }

    if (resultado != null) {
        if (matriz1 != null) { //Si se utilizó en la operación realizada, mostrarlo
            console.log("Matriz: ");
            console.log(matrizATexto(matriz1));
        }
        if (matriz2 != null) { //Si se utilizó en la operación realizada, mostrarlo
            console.log("Matriz: ");
            console.log(matrizATexto(matriz2));
        }
        if (numero != null) { //Si se utilizó en la operación realizada, mostrarlo
            console.log("Numero = " + numero);
        }

        if (typeof (resultado["res"]) == "number") { //Si el resultado es un número
            console.log(resultado["text"]); //Mostrar el desarrollo
            console.log("\n - - - > > > RESULTADO < < < - - -");
            console.log(resultado["res"]);
        } else if (resultado["res"] != undefined) { //Si el resultado es una matriz que requirió desarrollo
            console.log(resultado["text"]); //Mostrar el desarrollo
            console.log("\n - - - > > > RESULTADO < < < - - -");
            console.log(matrizATexto(resultado["res"]));
        } else { //Si el resultado es una matriz que no requirió desarrollo (Opciones 1 a 4)
            console.log("\n - - - > > > RESULTADO < < < - - -");
            console.log(matrizATexto(resultado));
        }
    }

    main(); //Volver a preguntar después de cada operación
}
