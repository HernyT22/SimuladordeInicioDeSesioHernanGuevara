 // Definición de la clase Perfil
 class Perfil {
    constructor(nombre, gmail, contraseña, edad, domicilio) {
        this.nombre = nombre;
        this.gmail = gmail;
        this.contraseña = contraseña;
        this.edad = edad;
        this.domicilio = domicilio;
    }

    obtenerInformacion() {
        return `Nombre: ${this.nombre}, Gmail: ${this.gmail}, Edad: ${this.edad}, Domicilio: ${this.domicilio}`;
    }
}

// Creación de instancias de Perfil
const perfil1 = new Perfil("Juan Pérez", "juan@gmail.com", "contraseña123", 30, "123 Calle Principal");
const perfil2 = new Perfil("María López", "maria@gmail.com", "claveSegura456", 28, "456 Avenida Secundaria");
const perfil3 = new Perfil("Pedro Ramírez", "pedro@gmail.com", "miPass789", 35, "789 Calle Principal");

// Comprobación de si el usuario está logueado al cargar la página
window.addEventListener('DOMContentLoaded', (event) => {
    const estaLogueado = localStorage.getItem('logueado');

    if (estaLogueado === 'true') {
        // El usuario está logueado, obtener los datos del perfil desde el localStorage
        const nombreUsuario = localStorage.getItem('nombreUsuario');
        const correoElectrónico = localStorage.getItem('correoElectronico');
        const edad = localStorage.getItem('edad');
        const domicilio = localStorage.getItem('domicilio');

        // Mostrar los datos del perfil
        mostrarPerfil({
            nombre: nombreUsuario,
            gmail: correoElectrónico,
            edad: edad,
            domicilio: domicilio
        });

        // Ocultar el formulario de inicio de sesión
        document.getElementById('loginForm').style.display = 'none';
        // Mostrar el botón de Cerrar Sesión
        document.getElementById('cerrarSesion').style.display = 'block';
    }
});

// Agregar un controlador de eventos al botón de inicio de sesión
const botonIniciarSesión = document.getElementById('iniciar');

botonIniciarSesión.addEventListener('click', function() {
    // Obtener los valores ingresados por el usuario
    const correoElectrónico = document.getElementById('gmail').value;
    const contraseña = document.getElementById('contraseña').value;

    // Utilizar un bucle for...of para buscar el perfil correspondiente
    let perfilEncontrado = null;

    for (const perfil of [perfil1, perfil2, perfil3]) {
        if (perfil.gmail === correoElectrónico && perfil.contraseña === contraseña) {
            perfilEncontrado = perfil;
            break;
        }
    }

    if (perfilEncontrado) {
        alert('Inicio de sesión exitoso');

        // Mostrar los datos del perfil y almacenarlos en el localStorage
        mostrarPerfil(perfilEncontrado);

        // Ocultar el formulario de inicio de sesión
        document.getElementById('loginForm').style.display = 'none';
        // Mostrar el botón de Cerrar Sesión
        document.getElementById('cerrarSesion').style.display = 'block';
    } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
});

// Agregar un controlador de eventos al botón de cerrar sesión
const botonCerrarSesión = document.getElementById('cerrarSesion');

botonCerrarSesión.addEventListener('click', function() {
    // Eliminar los datos de sesión del localStorage
    localStorage.clear();

    // Recargar la página actual para simular el cierre de sesión
    location.reload();
});

// Función para mostrar el perfil en la página y almacenar datos en el localStorage
function mostrarPerfil(perfil) {
    // Almacenar los datos de perfil en el localStorage
    localStorage.setItem('logueado', 'true');
    localStorage.setItem('nombreUsuario', perfil.nombre);
    localStorage.setItem('correoElectronico', perfil.gmail);
    localStorage.setItem('edad', perfil.edad);
    localStorage.setItem('domicilio', perfil.domicilio);

    // Mostrar los datos del perfil en la página
    const contenedorPerfil = document.getElementById('perfilContainer');

    const perfilInfo = document.createElement('div');
    perfilInfo.innerHTML = `
        <h2>Perfil del Usuario</h2>
        <p>Nombre: ${perfil.nombre}</p>
        <p>Correo Electrónico: ${perfil.gmail}</p>
        <p>Edad: ${perfil.edad}</p>
        <p>Domicilio: ${perfil.domicilio}</p>
    `;

    contenedorPerfil.appendChild(perfilInfo);
}