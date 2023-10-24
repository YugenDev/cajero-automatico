var cuentasDePrueba = [
  {
    nombre: "anfevasa",
    numeroCuenta: 12345678,
    saldo: 9884200,
    contraseña: "123",
    historial: [
      {
        tipo: "Consignación",
        destinatario: 12345678,
        cantidad: 50000,
        fecha: "24/10/2023, 1:29:10",
      },
      {
        tipo: "Retiro",
        destinatario: 12345678,
        cantidad: -70000,
        fecha: "24/10/2023, 1:29:16",
      },
      {
        tipo: "Transferencia",
        origen: 12345678,
        destinatario: 23456789,
        cantidad: 65800,
        fecha: "24/10/2023, 1:29:51",
      },
      {
        tipo: "Transferencia",
        origen: 12345678,
        destinatario: 78901234,
        cantidad: 90000,
        fecha: "24/10/2023, 1:30:14",
      },
      {
        tipo: "Transferencia",
        origen: 12345678,
        destinatario: 56789012,
        cantidad: 25000,
        fecha: "24/10/2023, 1:30:28",
      },
      {
        tipo: "Consignación",
        destinatario: 12345678,
        cantidad: 65000,
        fecha: "24/10/2023, 1:30:39",
      },
      {
        tipo: "Retiro",
        destinatario: 12345678,
        cantidad: -25000,
        fecha: "24/10/2023, 1:30:45",
      },
      {
        tipo: "Transferencia",
        origen: 56789012,
        destinatario: 12345678,
        cantidad: 45000,
        fecha: "24/10/2023, 1:31:52",
      },
    ],
  },
  {
    nombre: "usuario2",
    numeroCuenta: 23456789,
    saldo: 5365800,
    contraseña: "password2",
    historial: [
      {
        tipo: "Transferencia",
        origen: 12345678,
        destinatario: 23456789,
        cantidad: 65800,
        fecha: "24/10/2023, 1:29:51",
      },
      {
        tipo: "Transferencia",
        origen: 56789012,
        destinatario: 23456789,
        cantidad: 300000,
        fecha: "24/10/2023, 1:32:15",
      },
    ],
  },
  {
    nombre: "usuario3",
    numeroCuenta: 34567890,
    saldo: 7552000,
    contraseña: "password3",
    historial: [
      {
        tipo: "Transferencia",
        origen: 56789012,
        destinatario: 34567890,
        cantidad: 52000,
        fecha: "24/10/2023, 1:31:39",
      },
    ],
  },
  {
    nombre: "usuario4",
    numeroCuenta: 45678901,
    saldo: 3000000,
    contraseña: "password4",
    historial: [],
  },
  {
    nombre: "usuario5",
    numeroCuenta: 56789012,
    saldo: 1623000,
    contraseña: "password5",
    historial: [
      {
        tipo: "Transferencia",
        origen: 12345678,
        destinatario: 56789012,
        cantidad: 25000,
        fecha: "24/10/2023, 1:30:28",
      },
      {
        tipo: "Consignación",
        destinatario: 56789012,
        cantidad: 15000,
        fecha: "24/10/2023, 1:31:13",
      },
      {
        tipo: "Retiro",
        destinatario: 56789012,
        cantidad: -95000,
        fecha: "24/10/2023, 1:31:19",
      },
      {
        tipo: "Transferencia",
        origen: 56789012,
        destinatario: 34567890,
        cantidad: 52000,
        fecha: "24/10/2023, 1:31:39",
      },
      {
        tipo: "Transferencia",
        origen: 56789012,
        destinatario: 12345678,
        cantidad: 45000,
        fecha: "24/10/2023, 1:31:52",
      },
      {
        tipo: "Transferencia",
        origen: 56789012,
        destinatario: 23456789,
        cantidad: 300000,
        fecha: "24/10/2023, 1:32:15",
      },
      {
        tipo: "Consignación",
        destinatario: 56789012,
        cantidad: 75000,
        fecha: "24/10/2023, 1:32:42",
      },
    ],
  },
  {
    nombre: "usuario6",
    numeroCuenta: 67890123,
    saldo: 1500000,
    contraseña: "password6",
    historial: [],
  },
  {
    nombre: "usuario7",
    numeroCuenta: 78901234,
    saldo: 9090000,
    contraseña: "password7",
    historial: [
      {
        tipo: "Transferencia",
        origen: 12345678,
        destinatario: 78901234,
        cantidad: 90000,
        fecha: "24/10/2023, 1:30:14",
      },
    ],
  },
  {
    nombre: "usuario8",
    numeroCuenta: 89012345,
    saldo: 4500000,
    contraseña: "password8",
    historial: [],
  },
  {
    nombre: "usuario9",
    numeroCuenta: 90123456,
    saldo: 6000000,
    contraseña: "password9",
    historial: [],
  },
  {
    nombre: "usuario10",
    numeroCuenta: 12334567,
    saldo: 7500000,
    contraseña: "password10",
    historial: [],
  },
];

// Variables globales
var estaLoggeado = false;
var usuarioActual = {};
const cuentas = [...cuentasDePrueba];
let intentosFallidos = 0;

// Abrir-cerrar modal de registro-ingreso
document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.querySelector(".sign-up");
  const logInButton = document.querySelector(".log-in");
  const signOutButton = document.querySelector(".sign-out");

  const modalBgAccount = document.querySelector("#modal-account");
  const signUpToLogIn = document.querySelector("#signUp-to-logIn");
  const logInToSignUp = document.querySelector("#logIn-to-signUp");
  const signUpForm = document.querySelector("#signUpForm");
  const logInForm = document.querySelector("#iniciarSesionForm");

  const consultarSaldoBtn = document.querySelector(".consultarSaldoBtn");
  const transferirBtn = document.querySelector(".transferirBtn");
  const consignarBtn = document.querySelector(".consignarBtn");
  const retirarBtn = document.querySelector(".retirarBtn");

  const modalBgServices = document.querySelector("#modal-services");
  const consignarForm = document.querySelector("#consignarForm");
  const retirarForm = document.querySelector("#retirarForm");
  const transferirForm = document.querySelector("#transferirForm");

  // cerrar-abrir-intercambiar-reiniciar ambos formularios
  modalBgAccount.addEventListener("click", cerrarModal);
  signUpButton.addEventListener("click", abrirModalRegistro);
  logInButton.addEventListener("click", abrirModalAcceder);
  logInToSignUp.addEventListener("click", abrirModalRegistro);
  signUpToLogIn.addEventListener("click", abrirModalAcceder);

  // Gestión de sesión
  signUpForm.addEventListener("submit", envioCrearCuenta);
  logInForm.addEventListener("submit", envioInicioSesion);
  signOutButton.addEventListener("click", envioCerrarSesion);

  // Gestión de servicios
  consignarBtn.addEventListener("click", abrirModalConsignar);
  consultarSaldoBtn.addEventListener("click", abrirModalConsultarSaldo);
  transferirBtn.addEventListener("click", abrirModalTransferencia);
  retirarBtn.addEventListener("click", abrirModalRetirar);

  // Formularios servicios
  modalBgServices.addEventListener("click", cerrarModalServicios);
  consignarForm.addEventListener("submit", envioConsignar);
  retirarForm.addEventListener("submit", envioRetiro);
  transferirForm.addEventListener("submit", envioTransferencia);
});

//Funciones con solo lógica

//-----Gestión sesión-----
function crearCuenta(
  usuario,
  saldoInicial,
  contraseña,
  confirmacionContraseña
) {
  if (saldoInicial < 100000) {
    alert("Saldo inicial debe ser de al menos $100,000");
    return "Saldo inicial debe ser de al menos $100,000";
  }

  const usuarioRegExp = /^[a-zA-Z_]{4,}$/;
  if (!usuario.match(usuarioRegExp)) {
    alert(
      "Nombre de usuario no válido. Debe contener al menos 4 caracteres alfanuméricos."
    );
    return "Nombre de usuario no válido";
  }
  const contrasenaRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!contrasenaRegExp.test(contraseña)) {
    alert(
      "La contraseña debe contener al menos 8 caracteres con al menos una mayúscula, una minúscula y un dígito."
    );
    return "Contraseña no válida";
  }

  if (contraseña !== confirmacionContraseña) {
    alert("La confirmación de contraseña no coincide.");
    return "La confirmación de contraseña no coincide.";
  }

  const nuevaCuenta = {
    nombre: usuario,
    numeroCuenta: Math.floor(Math.random() * 100000000),
    saldo: saldoInicial,
    contraseña: contraseña,
    historial: [],
  };

  cuentas.push(nuevaCuenta);
  iniciarSesion(usuario, contraseña);
  visualWelcome();
  estaLoggeado = true;
  return `Cuenta creada exitosamente.\nTu número de cuenta es el N° ${nuevaCuenta.numeroCuenta}`;
}

function iniciarSesion(usuario, contraseña) {
  const cuenta = cuentas.find((c) => c.nombre === usuario);
  if (!cuenta) {
    alert("Cuenta no encontrada");
    return false;
  }

  if (cuenta.contraseña !== contraseña) {
    intentosFallidos++;

    if (intentosFallidos >= 3) {
      bloquearFormularioAcceso();
      alert("Número máximo de intentos alcanzado. Formulario bloqueado.");
      return false;
    }

    alert(`Contraseña incorrecta. Intentos restantes: ${3 - intentosFallidos}`);
  } else {
    // Loggeo exitoso
    intentosFallidos = 0;
    usuarioActual = cuenta;
    return true;
  }
}

function cerrarSesion() {
  usuarioActual = {};
  visualWelcome();
  estaLoggeado = false;
}

//Funciones HTML

//----------------Modales cuentas---------------
function abrirModalAcceder() {
  const modalSignUp = document.querySelector(".modal-signUp");
  const modalLogIn = document.querySelector(".modal-logIn");
  const modalBg = document.querySelector("#modal-account");
  const modalTitle = document.querySelector(".modal-title");

  modalSignUp.classList.add("modal-not-show");
  modalSignUp.classList.remove("modal-show");
  modalLogIn.classList.add("modal-show");
  modalLogIn.classList.remove("modal-not-show");
  modalTitle.textContent = "INICIAR SESIÓN";
  modalBg.classList.add("modal-show");
}

function cerrarModalAcceso() {
  const modalSignUp = document.querySelector(".modal-signUp");
  const modalLogIn = document.querySelector(".modal-logIn");
  const modalBg = document.querySelector("#modal-account");
  const signUpForm = document.querySelector("#signUpForm");

  modalSignUp.classList.remove("modal-show");
  modalLogIn.classList.remove("modal-show");
  modalBg.classList.remove("modal-show");
  modalBg.classList.add("modal-not-show");
  signUpForm.reset();
}

function abrirModalRegistro() {
  const modalBg = document.querySelector("#modal-account");
  const modalSignUp = document.querySelector(".modal-signUp");
  const modalLogIn = document.querySelector(".modal-logIn");
  const modalTitle = document.querySelector(".modal-title");

  modalSignUp.classList.add("modal-show");
  modalSignUp.classList.remove("modal-not-show");
  modalLogIn.classList.add("modal-not-show");
  modalLogIn.classList.remove("modal-show");
  modalTitle.textContent = "CREAR CUENTA";
  modalBg.classList.add("modal-show");
}

function cerrarModalRegistro() {
  const modalBg = document.querySelector("#modal-account");
  const signUpForm = document.querySelector("#signUpForm");
  const modalSignUp = document.querySelector(".modal-signUp");

  modalSignUp.classList.remove("modal-show");
  modalBg.classList.remove("modal-show");
  modalBg.classList.add("modal-not-show");
  signUpForm.reset();
}

function cerrarModal(e) {
  const modalBg = document.querySelector(".modal-bg");

  if (e.target === modalBg) {
    cerrarModalRegistro();
    cerrarModalAcceso();
  }
}

//--------------Gestión de sesión---------
function envioCrearCuenta(e) {
  e.preventDefault();

  const usuarioInput = signUpForm.querySelector('input[name="Usuario"]').value;
  const saldoInicialInput = parseFloat(
    signUpForm.querySelector('input[name="Saldo inicial"]').value
  );
  const contraseñaInput = signUpForm.querySelector(
    'input[name="Contraseña nueva"]'
  ).value;
  const confirmacionContraseñaInput = signUpForm.querySelector(
    'input[name="Confirmar contraseña"]'
  ).value;

  const mensaje = crearCuenta(
    usuarioInput,
    saldoInicialInput,
    contraseñaInput,
    confirmacionContraseñaInput
  );

  if (mensaje === "Cuenta creada exitosamente.") {
    alert(mensaje);

    cerrarModalRegistro();
  } else {
    alert(mensaje);
  }
}

function envioInicioSesion(e) {
  e.preventDefault();

  const logInForm = document.querySelector("#iniciarSesionForm");
  const usuarioInput = document.querySelector(
    '#iniciarSesionForm input[type="text"]'
  ).value;
  const contraseñaInput = document.querySelector(
    '#iniciarSesionForm input[type="password"]'
  ).value;

  if (iniciarSesion(usuarioInput, contraseñaInput)) {
    document.querySelector(".profile-pic").src =
      "https://thispersondoesnotexist.com/";
    visualWelcome();
    estaLoggeado = true;
    logInForm.reset();
  }
}

function bloquearFormularioAcceso() {
  const logInOutDiv = document.querySelector(".log-in-out");
  logInOutDiv.style.display = "none";

  cerrarModalAcceso();
}

function envioCerrarSesion() {
  cerrarSesion();
}

function visualWelcome() {
  const welcomeUser = document.querySelector(".welcome");
  const logInOutDiv = document.querySelector(".log-in-out");
  const signOutSpan = document.querySelector(".sign-out");
  const nombreUsuarioH = document.querySelector("#nombreUsuario");

  if (estaLoggeado) {
    welcomeUser.style.display = "none";
    signOutSpan.style.display = "none";
    logInOutDiv.style.display = "flex";
  } else {
    welcomeUser.style.display = "flex";
    signOutSpan.style.display = "flex";
    logInOutDiv.style.display = "none";
    nombreUsuarioH.textContent = usuarioActual.nombre;

    cerrarModalAcceso();
  }
}

//---------- Abrir modal servicio ------------
function abrirModalConsignar() {
  if (estaLoggeado) {
    const modalBg = document.querySelector("#modal-services");
    const modalTitle = document.querySelector(".services-modal-title");
    modalBg.style.display = "flex";
    document.querySelector(".div__consignar").style.display = "flex";
    document.querySelector(".div__transferir").style.display = "none";
    document.querySelector(".div__consultar-saldo").style.display = "none";
    document.querySelector(".div__retirar").style.display = "none";

    modalTitle.textContent = "CONSIGNAR";
    modalBg.classList.add("modal-show");
  } else {
    abrirModalAcceder();
  }
}
function abrirModalRetirar() {
  if (estaLoggeado) {
    const modalBg = document.querySelector("#modal-services");
    const modalTitle = document.querySelector(".services-modal-title");
    modalBg.style.display = "flex";
    document.querySelector(".div__consignar").style.display = "none";
    document.querySelector(".div__transferir").style.display = "none";
    document.querySelector(".div__consultar-saldo").style.display = "none";
    document.querySelector(".div__retirar").style.display = "flex";

    modalTitle.textContent = "RETIRAR";
    modalBg.classList.add("modal-show");
  } else {
    abrirModalAcceder();
  }
}
function abrirModalTransferencia() {
  if (estaLoggeado) {
    const modalBg = document.querySelector("#modal-services");
    const modalTitle = document.querySelector(".services-modal-title");
    modalBg.style.display = "flex";
    document.querySelector(".div__consignar").style.display = "none";
    document.querySelector(".div__transferir").style.display = "flex";
    document.querySelector(".div__consultar-saldo").style.display = "none";
    document.querySelector(".div__retirar").style.display = "none";

    modalTitle.textContent = "TRANSFERIR DINERO";
    modalBg.classList.add("modal-show");
  } else {
    abrirModalAcceder();
  }
}
function abrirModalConsultarSaldo() {
  if (estaLoggeado) {
    const modalBg = document.querySelector("#modal-services");
    const modalTitle = document.querySelector(".services-modal-title");
    modalBg.style.display = "flex";
    document.querySelector(".div__consignar").style.display = "none";
    document.querySelector(".div__transferir").style.display = "none";
    document.querySelector(".div__consultar-saldo").style.display = "flex";
    document.querySelector(".div__retirar").style.display = "none";

    modalTitle.textContent = "CONSULTAR SALDO";

    document.querySelector("#mostrar-cuenta-numero").textContent =
      "Cuenta N°" + usuarioActual.numeroCuenta;
    document.querySelector("#mostrar-cuenta-saldo").textContent =
      "$ " + usuarioActual.saldo;

    const contenedorHistorial = document.querySelector(".contenedor-historial");
    contenedorHistorial.innerHTML = "";

    usuarioActual.historial.forEach((t) => {
      var transacciónArticle = document.createElement("article");
      transacciónArticle.classList.add("resumen-transaccion");

      var tipoDiv = document.createElement("div");
      var cantidadDiv = document.createElement("div");

      var tipoP = document.createElement("p");
      tipoP.textContent = t.tipo;
      tipoDiv.appendChild(tipoP);

      var cantidadP = document.createElement("p");
      if (t.tipo == "Transferencia") {
        var cuentaP = document.createElement("p");

        if (t.origen == usuarioActual.numeroCuenta) {
          cuentaP.textContent = "Hacia: " + t.destinatario;
          tipoDiv.appendChild(cuentaP);

          cantidadP.style.color = "red";
          cantidadP.textContent = "$ -" + t.cantidad;
          cantidadDiv.appendChild(cantidadP);
        } else {
          cuentaP.textContent = "Desde: " + t.origen;
          tipoDiv.appendChild(cuentaP);

          cantidadP.style.color = "green";
          cantidadP.textContent = "$ " + t.cantidad;
          cantidadDiv.appendChild(cantidadP);
        }
      } else if (t.tipo == "Retiro") {
        cantidadP.style.color = "red";
        cantidadP.textContent = "$ " + t.cantidad;
        cantidadDiv.appendChild(cantidadP);
      } else if (t.tipo == "Consignación") {
        cantidadP.style.color = "green";
        cantidadP.textContent = "$ " + t.cantidad;
        cantidadDiv.appendChild(cantidadP);
      }

      var fechaP = document.createElement("p");
      fechaP.textContent = t.fecha;
      cantidadDiv.appendChild(fechaP);

      transacciónArticle.appendChild(tipoDiv);
      transacciónArticle.appendChild(cantidadDiv);
      contenedorHistorial.appendChild(transacciónArticle);
    });

    modalBg.classList.add("modal-show");
  } else {
    abrirModalAcceder();
  }
}

function cerrarModalServicios(e) {
  const modalBg = document.querySelector("#modal-services");
  if (e.target == modalBg) {
    modalBg.style.display = "none";
    document.querySelector(".div__consignar").style.display = "none";
    document.querySelector(".div__transferir").style.display = "none";
    document.querySelector(".div__consultar-saldo").style.display = "none";
    document.querySelector(".div__retirar").style.display = "none";
  }
}
function cerrarModalServiciosForzado() {
  const modalBg = document.querySelector("#modal-services");
  modalBg.style.display = "none";
  document.querySelector(".div__consignar").style.display = "none";
  document.querySelector(".div__transferir").style.display = "none";
  document.querySelector(".div__consultar-saldo").style.display = "none";
  document.querySelector(".div__retirar").style.display = "none";
}

//----------- Envío servicios ---------

function envioConsignar(e) {
  e.preventDefault();

  const consignarForm = document.querySelector("#consignarForm");
  const cantidadInput = Number(
    consignarForm.querySelector('input[name="cantidad"]').value
  );

  if (consignarDinero(cantidadInput)) {
    alert(
      `COMPROBANTE DE CONSIGNACIÓN\n\nSe han consignado $ ${cantidadInput} a tu cuenta N° ${usuarioActual.numeroCuenta}\nTu nuevo saldo es de: $ ${usuarioActual.saldo}\n\nPara revisar todos tu movimientos, revisa el servicio de consultar saldo`
    );
    consignarForm.reset();
    cerrarModalServiciosForzado();
  }
}
function envioRetiro(e) {
  e.preventDefault();

  const retirarForm = document.querySelector("#retirarForm");
  const cantidadInput = Number(
    retirarForm.querySelector('input[name="cantidad"]').value
  );

  if (retirarDinero(cantidadInput)) {
    alert(
      `COMPROBANTE DE RETIRO\n\nSe han RETIRADO $ ${cantidadInput} de tu cuenta N° ${usuarioActual.numeroCuenta}\nTu nuevo saldo es de: $ ${usuarioActual.saldo}\n\nPara revisar todos tu movimientos, revisa el servicio de consultar saldo`
    );
    retirarForm.reset();
    cerrarModalServiciosForzado();
  }
}
function envioTransferencia(e) {
  e.preventDefault();

  const transferirForm = document.querySelector("#transferirForm");

  const destinatarioInput = Number(
    transferirForm.querySelector('input[name="cuentaDestino"]').value
  );
  const cantidadInput = Number(
    transferirForm.querySelector('input[name="cantidad"]').value
  );

  if (transferirCuenta(destinatarioInput, cantidadInput)) {
    alert(
      `COMPROBANTE DE TRANSFERENCIA\n\nSe han TRANSFERIDO $ ${cantidadInput} de tu cuenta N° ${usuarioActual.numeroCuenta} a la cuenta N° ${destinatarioInput}\nTu nuevo saldo es de: $ ${usuarioActual.saldo}\n\nPara revisar todos tu movimientos, revisa el servicio de consultar saldo`
    );
    transferirForm.reset();
    cerrarModalServiciosForzado();
  }
}

// Función para realizar una consulta de saldo
function consultarSaldo(cuenta) {
  return `Saldo actual de ${cuenta.nombre}: $${cuenta.saldo}`;
}

// Función para realizar un retiro de dinero
function retirarDinero(cantidad) {
  if (
    cantidad > 0 &&
    cantidad <= usuarioActual.saldo - 10000 &&
    cantidad >= 10000
  ) {
    usuarioActual.saldo -= cantidad;
    registrarTransaccion(null, usuarioActual, cantidad * -1, "Retiro");
    return true;
  } else {
    alert(
      "Fondos insuficientes, cantidad no válida o el retiro es menor de $10,000"
    );
  }
}

// Función para realizar una consignación de dinero
function consignarDinero(cantidad) {
  if (cantidad >= 10000) {
    usuarioActual.saldo += cantidad;
    registrarTransaccion(null, usuarioActual, cantidad, "Consignación");
    return true;
  } else {
    return alert("No puedes consignar menos de $10,000");
  }
}

// Transferencia
function transferirCuenta(numeroCuentaDestino, cantidad) {
  const destinatario = cuentas.find(
    (c) => c.numeroCuenta === numeroCuentaDestino
  );
  if (
    destinatario !== undefined &&
    cantidad > 0 &&
    cantidad <= usuarioActual.saldo &&
    cantidad >= 10000
  ) {
    usuarioActual.saldo -= cantidad;
    destinatario.saldo += cantidad;
    registrarTransaccion(
      usuarioActual,
      destinatario,
      cantidad,
      "Transferencia"
    );
    return true;
  } else {
    alert("Fondos insuficientes, cantidad no válida o destinatario no válido");
  }
}

// Función para registrar una transacción en el historial
function registrarTransaccion(origen, destinatario, cantidad, tipo) {
  const fecha = new Date().toLocaleString();
  let nuevaTransacción = {
    tipo,
    origen: origen?.numeroCuenta,
    destinatario: destinatario.numeroCuenta,
    cantidad,
    fecha,
  };
  origen?.historial.push(nuevaTransacción);
  destinatario.historial.push(nuevaTransacción);
}
