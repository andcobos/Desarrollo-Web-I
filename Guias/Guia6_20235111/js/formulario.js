// Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

// Componente modal
const idModal = document.getElementById("idModal");

// Arreglo global de pacientes
let arrayPaciente = [];

/*
Creando una función para que limpie el formulario
siempre que se cargue la página o cuando se presione
el botón limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();
};

/*
Función para validar el ingreso del paciente
*/

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo = 
        inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true
        ? "Mujer"
        : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        // Agregando información al arreglo paciente
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );

        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        // Llamando al componente de Bootstrap
        toast.show();

        // Limpiando formulario
        limpiarForm();
    } else {
        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        // Llamando al componente de Bootstrap
        toast.show();
    }
};

// Función que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 0;

    arrayPaciente.forEach((element) => {
        $fila += `<tr>
                    <td scope="row" class="text-center fw-bold">${contador + 1}</td>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td>${element[2]}</td>
                    <td>${element[3]}</td>
                    <td>${element[4]}</td>
                    <td>${element[5]}</td>
                    <td>
                        <button type="button" class="btn btn-primary" onclick="editarPaciente(${contador})">
                            <i class="bi bi-pencil-square"></i>
                        </button>
                        <button type="button" class="btn btn-danger" onclick="eliminarPaciente(${contador})">
                            <i class="bi bi-trash3-fill"></i>
                        </button>
                    </td>
                </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <tr>
                            <th scope="col" class="text-center" style="width:5%;">#</th>
                            <th scope="col" class="text-center" style="width:15%;">Nombre</th>
                            <th scope="col" class="text-center" style="width:15%;">Apellido</th>
                            <th scope="col" class="text-center" style="width:10%;">Fecha nacimiento</th>
                            <th scope="col" class="text-center" style="width:10%;">Sexo</th>
                            <th scope="col" class="text-center" style="width:10%;">País</th>
                            <th scope="col" class="text-center" style="width:25%;">Dirección</th>
                            <th scope="col" class="text-center" style="width:10%;">Opciones</th>
                        </tr>
                        ${imprimirFilas()}
                    </table>
                  </div>`;
    document.getElementById("idTablaPacientes").innerHTML = $table;
};

// Función que elimina un paciente del array y actualiza la tabla
function eliminarPaciente(index) {
    // Eliminar paciente por índice
    arrayPaciente.splice(index, 1);
    // Actualizar la tabla de pacientes después de la eliminación
    imprimirPacientes();
}

// Función que edita un paciente del array y carga la información en el formulario
function editarPaciente(index) {
    // Obtener datos del paciente seleccionado
    const paciente = arrayPaciente[index];

    // Cargar los datos en el formulario
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else {
        inputRdFemenino.checked = true;
    }
    cmbPais.value = [...cmbPais.options].find(option => option.text === paciente[4]).value;
    inputDireccion.value = paciente[5];

    // Eliminar paciente del array para que se pueda editar al hacer clic en "Guardar Datos"
    arrayPaciente.splice(index, 1);
}


// Contador global de los option correspondiente al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        // Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "País agregado correctamente";
        // Llamando al componente de Bootstrap
        toast.show();
    } else {
        // Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        // Llamando al componente de Bootstrap
        toast.show();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar función al momento de cargar la página HTML
limpiarForm();
