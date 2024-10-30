document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.forms["frmRegistro"];
    const button = formulario.elements["btnRegistro"];
    const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
    const bodyModal = document.getElementById("idBodyModal");

    button.onclick = () => {
        if (validarFormulario()) {
            recorrerFormulario();
        }
    };

    function validarFormulario() {
        const nombre = formulario["idNombre"].value.trim();
        const apellidos = formulario["idApellidos"].value.trim();
        const fechaNac = formulario["idFechaNac"].value;
        const correo = formulario["idCorreo"].value.trim();
        const password = formulario["idPassword"].value;
        const passwordRepetir = formulario["idPasswordRepetir"].value;
        const pais = formulario["idCmPais"].value;
        const intereses = document.querySelectorAll('input[type="checkbox"]:checked');
        const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked');

        if (!nombre || !apellidos || !fechaNac || !correo || !password || !passwordRepetir) {
            alert('Por favor, complete todos los campos obligatorios.');
            return false;
        }

        const fechaNacimiento = new Date(fechaNac);
        const fechaActual = new Date();
        if (fechaNacimiento > fechaActual) {
            alert('La fecha de nacimiento no puede ser mayor a la fecha actual.');
            return false;
        }

        const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexCorreo.test(correo)) {
            alert('Por favor, ingrese un correo electrónico válido.');
            return false;
        }

        if (password !== passwordRepetir) {
            alert('Las contraseñas no coinciden.');
            return false;
        }

        if (intereses.length === 0) {
            alert('Seleccione al menos un interés.');
            return false;
        }

        if (!carreraSeleccionada) {
            alert('Por favor, seleccione una carrera.');
            return false;
        }

        if (pais === 'Seleccione una opcion') {
            alert('Por favor, seleccione un país de origen.');
            return false;
        }

        return true;
    }

    function recorrerFormulario() {
        let totText = 0;
        let totRadio = 0;
        let totCheck = 0;
        let totDate = 0;
        let totSelect = 0;
        let totFile = 0;
        let totPass = 0;
        let totEmail = 0;

        const elementos = formulario.elements;
        const totalElementos = elementos.length;

        for (let index = 0; index < totalElementos; index++) {
            let elemento = elementos[index];
            let tipoElemento = elemento.type;
            let tipoNode = elemento.nodeName;

            if (tipoElemento === "text" && tipoNode === "INPUT") totText++;
            else if (tipoElemento === "password" && tipoNode === "INPUT") totPass++;
            else if (tipoElemento === "email" && tipoNode === "INPUT") totEmail++;
            else if (tipoElemento === "radio" && tipoNode === "INPUT") totRadio++;
            else if (tipoElemento === "checkbox" && tipoNode === "INPUT") totCheck++;
            else if (tipoElemento === "file" && tipoNode === "INPUT") totFile++;
            else if (tipoElemento === "date" && tipoNode === "INPUT") totDate++;
            else if (tipoNode === "SELECT") totSelect++;
        }

        const resultado = `
            Total de input[type="text"] = ${totText}<br>
            Total de input[type="password"] = ${totPass}<br>
            Total de input[type="email"] = ${totEmail}<br>
            Total de input[type="radio"] = ${totRadio}<br>
            Total de input[type="checkbox"] = ${totCheck}<br>
            Total de input[type="file"] = ${totFile}<br>
            Total de input[type="date"] = ${totDate}<br>
            Total de select = ${totSelect}<br>
        `;

        bodyModal.innerHTML = resultado;
        modal.show();
    }
});
