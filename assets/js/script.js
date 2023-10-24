
var cuentaPrueba={
  nombre: "anfevasa",
  numeroCuenta: 12345678,
  saldo:10000000,
  contraseña: "123",
  historial:[]  
}

// Variables globales
var estaLoggeado = false;
var usuarioActual = {};
const cuentas = [cuentaPrueba];
let intentosFallidos = 0;



// Abrir-cerrar modal de registro-ingreso
document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.querySelector(".sign-up");
  const logInButton = document.querySelector(".log-in");
  const signOutButton = document.querySelector(".sign-out");
  const modalBg = document.querySelector(".modal-bg");
  const signUpToLogIn = document.querySelector("#signUp-to-logIn");
  const logInToSignUp = document.querySelector("#logIn-to-signUp");
  const signUpForm = document.querySelector("#signUpForm");
  const logInForm = document.querySelector("#iniciarSesionForm");
  const consultarSaldoBtn = document.querySelector('.consultarSaldoBtn');
  const transferirBtn = document.querySelector('.transferirBtn');
  const consignarBtn = document.querySelector('.consignarBtn');
  const retirarBtn = document.querySelector('.retirarBtn')

  // cerrar-abrir-intercambiar-reiniciar ambos formularios
  modalBg.addEventListener("click", cerrarModal);
  signUpButton.addEventListener("click", abrirModalRegistro);
  logInButton.addEventListener("click", abrirModalAcceder);
  logInToSignUp.addEventListener("click", abrirModalRegistro);
  signUpToLogIn.addEventListener("click", abrirModalAcceder);


  // Gestión de sesión
  signUpForm.addEventListener("submit", envioCrearCuenta);
  logInForm.addEventListener("submit", envioInicioSesion);
  signOutButton.addEventListener("click", envioCerrarSesion);
  
  
  // Gestión de servicios
  consultarSaldoBtn.addEventListener("click", consultarSaldo);
  transferirBtn.addEventListener("click", transferirCuenta);
  consignarBtn.addEventListener("click", consignarDinero);
  retirarBtn.addEventListener("click", retirarDinero);

});


//Funciones con solo lógica
function crearCuenta(usuario,  saldoInicial,  contraseña,  confirmacionContraseña) {
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
    numeroCuenta: Math.floor(Math.random()*100000000),
    saldo: saldoInicial,
    contraseña: contraseña,
    historial: [],
  };

  cuentas.push(nuevaCuenta);
  iniciarSesion(usuario,contraseña);
  visualWelcome();
  estaLoggeado=true;
  return "Cuenta creada exitosamente.";
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
    usuarioActual=cuenta;
    return true;
  }
}

function cerrarSesion() {
  usuarioActual={  };
  visualWelcome();
  estaLoggeado=false;
}




//Funciones HTML

//----------------Modales---------------
function abrirModalAcceder() {
  const modalSignUp = document.querySelector(".modal-signUp");
  const modalLogIn = document.querySelector(".modal-logIn");
  const modalBg = document.querySelector(".modal-bg");
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
  const modalBg = document.querySelector(".modal-bg");
  const signUpForm = document.querySelector("#signUpForm");

  modalSignUp.classList.remove("modal-show");
  modalLogIn.classList.remove("modal-show");
  modalBg.classList.remove("modal-show");
  modalBg.classList.add("modal-not-show");
  signUpForm.reset();
}

function abrirModalRegistro() {
  const modalBg = document.querySelector(".modal-bg");
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
  const modalBg = document.querySelector(".modal-bg");
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

    const usuarioInput = signUpForm.querySelector(
      'input[name="Usuario"]'
    ).value;
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

  const usuarioInput = document.querySelector(
    '#iniciarSesionForm input[type="text"]'
  ).value;
  const contraseñaInput = document.querySelector(
    '#iniciarSesionForm input[type="password"]'
  ).value;

  if(iniciarSesion(usuarioInput,contraseñaInput)){    
    visualWelcome();
    estaLoggeado=true;
    console.log("Queda log: "+estaLoggeado);
  }
  
}

function bloquearFormularioAcceso() {
  const logInOutDiv = document.querySelector(".log-in-out");
  logInOutDiv.style.display = 'none';

  cerrarModalAcceso();
}

function envioCerrarSesion() {
  cerrarSesion();
}

function visualWelcome() {
    console.log(estaLoggeado);
    const welcomeUser = document.querySelector(".welcome");    
    const logInOutDiv = document.querySelector(".log-in-out");
    const signOutSpan = document.querySelector(".sign-out");
    const nombreUsuarioH = document.querySelector("#nombreUsuario");

    if(estaLoggeado){
      welcomeUser.style.display = 'none';
      signOutSpan.style.display = 'none';
      logInOutDiv.style.display = 'flex';
    }else{

      welcomeUser.style.display = 'flex';
      signOutSpan.style.display = 'flex';
      logInOutDiv.style.display = 'none';
      nombreUsuarioH.textContent = usuarioActual.nombre;

      cerrarModalAcceso();
    }
}


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
    registrarTransaccion(
      origen,
      `Transferencia a ${destinatario.nombre} de $${cantidad}`
    );
    registrarTransaccion(
      destinatario,
      `Transferencia de ${origen.nombre} de $${cantidad}`
    );
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
