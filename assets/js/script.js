// Lista de cuentas registradas en la aplicación
const cuentas = [];

// Función para crear una nueva cuenta bancaria
document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.querySelector(".sign-up");
  const logInButton = document.querySelector(".log-in");
  const modalSignUp = document.querySelector(".modal-signUp");
  const modalLogIn = document.querySelector(".modal-logIn");
  const modalTitle = document.querySelector(".modal-title");
  const modalBg = document.querySelector(".modal-bg");
  const signUpForm = document.querySelector("#signUpForm");
  const signUpToLogIn = document.querySelector("#signUp-to-logIn");
  const logInToSignUp = document.querySelector("#logIn-to-signUp");

  function abrirModalAcceder() {
    modalSignUp.classList.add("modal-not-show");
    modalSignUp.classList.remove("modal-show");
    modalLogIn.classList.add("modal-show");
    modalLogIn.classList.remove("modal-not-show");
    modalTitle.textContent = "INICIAR SESIÓN";
    modalBg.classList.add("modal-show");
  }

  function abrirModalRegistro() {
    modalSignUp.classList.add("modal-show");
    modalSignUp.classList.remove("modal-not-show");
    modalLogIn.classList.add("modal-not-show");
    modalLogIn.classList.remove("modal-show");
    modalTitle.textContent = "CREAR CUENTA";
    modalBg.classList.add("modal-show");
  }

  function cerrarModalRegistro() {
    modalSignUp.classList.remove("modal-show");
    modalBg.classList.remove("modal-show");
    modalBg.classList.add("modal-not-show");
    signUpForm.reset();
  }

  function crearCuenta(usuario, saldoInicial, contraseña, confirmacionContraseña) {
    if (saldoInicial < 100000) {
      alert("Saldo inicial debe ser de al menos $100,000");
      return "Saldo inicial debe ser de al menos $100,000";
    }

    if (contraseña !== confirmacionContraseña) {
      alert("La confirmación de contraseña no coincide.");
      return "La confirmación de contraseña no coincide.";
    }

    const nuevaCuenta = {
      nombre: usuario,
      saldo: saldoInicial,
      contraseña: contraseña,
      historial: [],
    };

    cuentas.push(nuevaCuenta);
    console.log(cuentas); // Mostrar cuentas actualizadas en la consola
    return "Cuenta creada exitosamente.";
  }

  signUpButton.addEventListener("click", abrirModalRegistro);

  modalBg.addEventListener("click", function (e) {
    if (e.target === modalBg) {
      cerrarModalRegistro();
    }
  });

  logInToSignUp.addEventListener("click", abrirModalRegistro);
  signUpToLogIn.addEventListener("click", abrirModalAcceder);
  logInButton.addEventListener("click", abrirModalAcceder);
  
  const signUp = document.querySelector(".singUpForm");

  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("formulario enviado")
    const usuarioInput = signUpForm.querySelector('input[placeholder="Usuario"]');
    const saldoInicialInput = signUpForm.querySelector('input[placeholder="Saldo inicial"]');
    const contraseñaInput = signUpForm.querySelector('input[placeholder="Contraseña nueva"]');
    const confirmacionContraseñaInput = signUpForm.querySelector('input[placeholder="Confirmar contraseña"]');

    const usuario = usuarioInput.value;
    const saldoInicial = parseFloat(saldoInicialInput.value);
    const contraseña = contraseñaInput.value;
    const confirmacionContraseña = confirmacionContraseñaInput.value;

    const mensaje = crearCuenta(usuario, saldoInicial, contraseña, confirmacionContraseña);

    if (mensaje === "Cuenta creada exitosamente.") {
      alert(mensaje);
      cerrarModalRegistro();
    } else {
      alert(mensaje);
    }

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
