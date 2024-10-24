document.addEventListener("DOMContentLoaded", function () {
    //Accedemos al contenedor donde se mostrara los estudiantes
    const containerEstudiantes = document.querySelector(
        "#idContainerEstudiantes");
  
    //Accedemos a cada boton por medio de la API DOM
    const btnAddEstudiante = document.querySelector("#idBtnAgregarEstudiante");
    const btnViewEstudiantes = document.querySelector("#idBtnMostrarEstudiantes");
  
    //Agregamos el evento click a los botones, adicionalmente
    //se le asigna la funcion que realizara la operacion
    btnAddEstudiante.addEventListener("click", addEstudiantes);
    btnViewEstudiantes.addEventListener("click", viewEstudiantes);
  
    //Arreglo de forma global
    let arrayEstudiantes = new Array();
  
    //creando funciones
    function addEstudiantes() {
        const inputCarnet = document
            .querySelector("#inputCarnet")
            .value.toString().trim() //detecta que no tienen que haber espacios en blanco
            .toUpperCase();
        const inputNombre = document
            .querySelector("#inputNombre")
            .value.toString().trim() //trim para los espacios en blanco
            .toUpperCase();
        const inputApellidos = document
            .querySelector("#inputApellidos")
            .value.toString().trim() //cadena vacia y va a dar error
            .toUpperCase();
        console.log(inputApellidos);
  
        if (inputCarnet != "" && inputNombre != "" && inputApellidos != "") {
            const estudiante={
                carnet: inputCarnet,
                nombre: inputNombre,
                apellidos: inputApellidos
            };

            //arrayEstudiantes.push(
            //    new Array(inputCarnet, inputNombre, inputApellidos)
            //);

            arrayEstudiantes.push(estudiante)
            alert("Se registro el nuevo estudiante");
            //Limpiando campos del formulario
            document.querySelector("#inputCarnet").value = "";
            document.querySelector("#inputNombre").value = "";
            document.querySelector("#inputApellidos").value = "";
            document.querySelector("#inputCarnet").focus();
            viewEstudiantes()
        } else {
            alert("Faltan campos que completar");
        }
    }

    function viewEstudiantes() {
        //Validando que existan estudiantes registrados
        let totalEstudiantes = arrayEstudiantes.length;
        if (totalEstudiantes > 0) {
            let carnet;
            let nombres;
            let apellidos;
            let table = `<table class='table table-light table-striped'>`;
            table += "<thead>";
            table += "<tr>";
            table += "<th scope='col' style='width: 5%;'>#</th>";
            table += "<th scope='col' style='width: 15%;'>Carnet</th>";
            table += "<th scope='col'>Nombres</th>";
            table += "<th scope='col'>Apellidos</th>";
            table += "</tr>";
            table += "</thead>";
            table += "<tbody>";

            let i=0;

            //Recorrer un arreglo sin necesidad de obtener su tamao
            for (const estudiante of arrayEstudiantes){
                i++;
                let {carnet, nombre, apellidos} =estudiante; //coincidir con cada nombre que tenemos en los objetos
                table += "<tr>";
                table += `<td scope='row' style='font-weight: bold;'>${i}</td>`;
                table += `<td>${carnet}</td>`;
                table += `<td>${nombre}</td>`;
                table += `<td>${apellidos}</td>`;
                table += "</tr>";
            }
      
            table += "</tbody>";
            table += "</table>";
            containerEstudiantes.innerHTML = table;
        } else {
          alert("No se han registrado estudiantes");
        }
    }
});
      
  