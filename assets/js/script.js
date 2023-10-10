// Lista de cuentas registradas en la aplicación
const cuentas = [];

// Función para crear una nueva cuenta bancaria
document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.querySelector(".sign-up");
  const modalSignUp = document.querySelector(".modal-signUp");
  const modalBg = document.querySelector(".modal-bg");
  const signUpForm = document.querySelector("#signUpForm");

  // Función para abrir el modal de registro
  function abrirModalRegistro() {
      modalSignUp.classList.add("modal-show");
      modalBg.classList.add("modal-show");
  }

  // Función para cerrar el modal de registro
  function cerrarModalRegistro() {
      modalSignUp.classList.remove("modal-show");
      modalBg.classList.remove("modal-show");
      // Restablecer los valores del formulario si es necesario
      signUpForm.reset();
  }

  // Función para manejar el envío del formulario de registro
  function crearCuenta() {
      const usuarioInput = signUpForm.querySelector('input[placeholder="Usuario"]');
      const saldoInicialInput = signUpForm.querySelector('input[placeholder="Saldo inicial"]');
      const contraseñaInput = signUpForm.querySelector('input[placeholder="Contraseña nueva"]');
      const confirmacionContraseñaInput = signUpForm.querySelector('input[placeholder="Confirmar contraseña"]');

      const usuario = usuarioInput.value;
      const saldoInicial = parseFloat(saldoInicialInput.value);
      const contraseña = contraseñaInput.value;
      const confirmacionContraseña = confirmacionContraseñaInput.value;

      if (saldoInicial < 100000) {
          alert("Saldo inicial debe ser de al menos $100,000");
          return;
      }

      if (contraseña !== confirmacionContraseña) {
          alert("La confirmación de contraseña no coincide.");
          return;
      }

      const mensaje = crearCuenta(usuario, saldoInicial, contraseña, confirmacionContraseña);

      if (mensaje === "Cuenta creada exitosamente.") {
          alert(mensaje);
          cerrarModalRegistro(); // Cerrar el modal después de crear la cuenta
      } else {
          alert(mensaje);
      }
  }

  // Agregar evento de clic para abrir el modal de registro
  signUpButton.addEventListener("click", abrirModalRegistro);

  // Agregar evento de clic para cerrar el modal de registro
  modalBg.addEventListener("click", function (e) {
      if (e.target === modalBg) {
          cerrarModalRegistro();
      }
  });

  // Agregar evento de clic para procesar el formulario de registro
  signUpForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Evitar que el formulario se envíe por defecto
     crearCuenta(); // Llamar a la función para procesar el registro
  });
});



// Función para realizar una consulta de saldo
function consultarSaldo(cuenta) {
  return `Saldo actual de ${cuenta.nombre}: $${cuenta.saldo}`;
}

// Función para realizar un retiro de dinero
function retirarDinero(cuenta, cantidad) {
  if (cantidad > 0 && cantidad <= cuenta.saldo && cantidad >= 10000) {
    cuenta.saldo -= cantidad;
    registrarTransaccion(cuenta, `Retiro de $${cantidad}`);
    return `Retiraste $${cantidad}. Saldo restante: $${cuenta.saldo}`;
  } else {
    return "Fondos insuficientes, cantidad no válida o el retiro es menor de $10,000";
  }
}

// Función para realizar una transferencia a otra cuenta
function transferirCuenta(origen, destinatario, cantidad) {
  if (
    cantidad > 0 &&
    cantidad <= origen.saldo &&
    cantidad >= 10000 &&
    cuentas.includes(destinatario)
  ) {
    origen.saldo -= cantidad;
    destinatario.saldo += cantidad;
    registrarTransaccion(origen, `Transferencia a ${destinatario.nombre} de $${cantidad}`);
    registrarTransaccion(destinatario, `Transferencia de ${origen.nombre} de $${cantidad}`);
    return `Transferencia exitosa. Saldo restante: $${origen.saldo}`;
  } else {
    return "Fondos insuficientes, cantidad no válida o destinatario no válido";
  }
}

// Función para realizar una consignación de dinero
function consignarDinero(cuenta, cantidad) {
  if (cantidad > 0 && cantidad >= 10000) {
    cuenta.saldo += cantidad;
    registrarTransaccion(cuenta, `Consignación de $${cantidad}`);
    return `Consignaste $${cantidad}. Saldo restante: $${cuenta.saldo}`;
  } else {
    return "Cantidad no válida o la consignación es menor de $10,000";
  }
}

// Función para registrar una transacción en el historial
function registrarTransaccion(cuenta, descripcion) {
  const fecha = new Date().toLocaleString();
  cuenta.historial.push({ fecha, descripcion });
}

// Función para iniciar sesión
let intentosFallidos = 0; 

function iniciarSesion(nombre, contraseña) {
  const cuenta = cuentas.find((c) => c.nombre === nombre);

  if (!cuenta) {
    return "Cuenta no encontrada";
  }

  if (cuenta.contraseña !== contraseña) {
    intentosFallidos++;

    if (intentosFallidos >= 3) {
      bloquearFormularioAcceso(); 
      return "Número máximo de intentos alcanzado. Formulario bloqueado.";
    }

    return `Contraseña incorrecta. Intentos restantes: ${3 - intentosFallidos}`;
  }

  intentosFallidos = 0; // Restablece los intentos fallidos si la contraseña es correcta

  return cuenta;
}

function bloquearFormularioAcceso() {
  // aqui luego definimos como vamos a hacer el bloqueo del formulario 
}


// // Ejemplo de uso
// function ejemploDeUso() {
//   const resultadoCreacion1 = crearCuenta("Usuario1", 100000, "contraseña1");
//   const resultadoCreacion2 = crearCuenta("Usuario2", 100000, "contraseña2");

//   console.log(resultadoCreacion1);
//   console.log(resultadoCreacion2);

//   const usuarioActual = iniciarSesion("Usuario1", "contraseña1");

//   if (usuarioActual) {
//     console.log("Inicio de sesión exitoso.");
//     console.log(consultarSaldo(usuarioActual));
//     console.log(retirarDinero(usuarioActual, 20000));
//     console.log(transferirCuenta(usuarioActual, cuentas[1], 30000));
//     console.log(consultarSaldo(usuarioActual));
//     console.log(consultarSaldo(cuentas[1]));
//     console.log(consignarDinero(usuarioActual, 15000));
//     console.log(consultarSaldo(usuarioActual));
//     console.log(usuarioActual.historial);
//   } else {
//     console.log("Inicio de sesión fallido.");
//   }
// }

// ejemploDeUso();
