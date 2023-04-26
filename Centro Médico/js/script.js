let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

//Realiza el cambio de icono al presionar en el menú
menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
}

// Obtener el formulario y los campos
const form = document.querySelector('form');
const nombre = document.querySelector('input[name="Nombre"]');
const telefono = document.querySelector('input[name="Teléfono"]');
const correo = document.querySelector('input[name="Correo Eletrónico"]');
const fecha = document.querySelector('input[name="Fecha a Reservar"]');
const mensaje = document.querySelector('textarea[name="Mensaje"]');

// Agregar un evento de escucha para el envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevenir el envío del formulario por defecto
  event.stopPropagation(); // Detener la propagación del evento

  // Validar los campos
  if (nombre.value.length < 3) {
    alert('Por favor, ingrese un nombre válido.');
    nombre.focus();
    return false;
  }

  if (!/^\d{10}$/.test(telefono.value)) {
    alert('Por favor, ingrese un número de teléfono válido.');
    telefono.focus();
    return false;
  }

  // Envíar la información del formulario usando fetch API
  fetch(form.action, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Nombre: nombre.value,
      Teléfono: telefono.value,
      'Correo Eletrónico': correo.value,
      'Fecha a Reservar': fecha.value,
      Mensaje: mensaje.value
    })
  })
  .then(response => {
    // Mostrar un mensaje de confirmación cuando se envía el formulario con éxito
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: '¡Gracias!',
        text: 'Su cita ha sido agendada.',
        width: 600,
        height: 400,
        confirmButtonColor: '#16a085',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) { 
          form.reset();
        } 
      });
    }
  }).catch(error => {
    console.error(error);
    alert('Lo siento, ha ocurrido un error al enviar el formulario.');
    });
 });