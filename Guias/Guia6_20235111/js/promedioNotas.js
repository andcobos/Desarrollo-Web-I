//Accedemos al contenedor donde se mostrara los estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

//Accedemos a cada boton por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

//Agregamos el evento click a los botones, adicionalmente
//se le asigna la funcion que realizará la operación
btnPromedio.addEventListener("click", generarEstudiantes);

function generarEstudiantes() {
    //Utilizaremos un arreglo para guardar la información del estudiante
    let arrayEstudiante = new Array();
  
    let totalEstudiantes = document.querySelector(
        "#inputNumeroEstudiantes"
    ).value;
    let contador = 1;
  
    // Utilizaremos un while para recorrer el total de estudiantes
    let estudiante,
        calificacion,
        convertir = 0;
    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);
  
        //Verificando que sea un valor entero positivo
        //y que se encuentre en el rango de 0 - 10
        do {
            calificacion = prompt(
                `Ingrese la calificación del estudiante ${contador}`
            );
            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);

        arrayEstudiante.push([estudiante, parseFloat(calificacion).toFixed(2)]);
  
        // Asignando los valores al arreglo
       // arrayEstudiante[contador - 1] = new Array(
        //    estudiante,
        //    parseFloat(calificacion).toFixed(2) //devuelve un string con el toFixed
       // );

        contador++;
    }
  
    

    //Recorriendo el arreglo con for..of
    //Verificaremos cual es el promedio de las calificaciones
    //y cual de los estudiantes posee la calificación más alta
    
    let calificacionAlta = 0,
        promedio = 0,
        mejorEstudiante = '';
  
    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = parseFloat(indice[1]);
  
        //Imprimiendo lista de estudiantes
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;
  
        //Verificación de calificación más alta
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            mejorEstudiante = nombre;
        }
  
        //Calculando el promedio
        promedio += parseFloat(nota);
    }
    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con mejor calificación:</b> ${mejorEstudiante}</p>`;
  
    //Imprimiendo resultado
    containerEstudiantes.innerHTML = listado;
}
  