let lista = document.getElementById("lista");
let carrito = [];
let precioTotal = 0;

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto) => {
      // Traer productos del json y Crear las Cards
      const li = document.createElement("li");
      li.innerHTML = `
        <img class="fotoProducto" src="img/prenda${producto.id}.PNG"/>
        <div class="contenedorInfo">
            <div class="contenedorTitulo">
                <b class="titulo">${producto.prenda} ${producto.equipo}</b>
                <p class="precio">$${producto.precio}</p>
            </div>
            <div class="contenedorComprar">
                <button class="botonComprar" id="botonComprar${producto.id}">Comprar</button>
            </div>
        </div>
      `;
      li.className = "card";
      lista.append(li);

      let botonComprar = document.getElementById(`botonComprar${producto.id}`);

      // Agregar los productos al array caarrito cuando se toca el boton comprar
      const agregarAlCarrito = (id) => {
        let item = data.find((item) => item.id === id);
        carrito.push(item);
        precioTotal += item.precio;
        mostrarCarrito(item);
        Toastify({
          style: { background: "#10ac84" },
          text: "Producto agregado al carrito",
          gravity: "bottom",
          duration: 3000,
        }).showToast();
      };

      botonComprar.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
      });
    });
  });

const modalContent = document.getElementById("modal-content");
const modalBody = document.getElementById("modal-body");

const mostrarCarrito = (item) => {
  const div = document.createElement("div");
  div.innerHTML = `
        <p class="prendasCarrito">Prenda: ${item.prenda} ${item.equipo} Precio: ${item.precio}</p>`;
  div.className = "modal-body p-2";
  modalBody.append(div);
  const precio = document.getElementById("precioTotal");
  precio.textContent = `Total: $${precioTotal}`;
};


const check = document.getElementById("exampleCheck1");

class Usuario {
  constructor(email, nombre, contraseña) {
    this.email = email;
    this.nombre = nombre;
    this.contraseña = contraseña;
  }
}

const iniciarSesion = document.getElementById("botonInicioSesion");
const inicioSesion = document.getElementById("inicioSesion");
const ladoDerecho = document.getElementById("ladoDerecho");

const agregarUsuario = (event) => {
  const usuarios = [];
  // Traemos Mail, nombre y contraseña
  const mail = document.getElementById("exampleInputEmail1").value;
  const nombre = document.getElementById("exampleInputName1").value;
  const contraseña = document.getElementById("exampleInputPassword1").value;

  // Los cargamos en el array y subimos al local storage
  usuarios.push(new Usuario(mail, nombre, contraseña));

  //Si el boton recordar esta activado subimos el usuario al local storage
  if (check.checked) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  } else {
    //Sino no recargamos automaticamente la pagina y ocultamos el form
    event.preventDefault();
    const form = document.getElementById("form");
    form.classList.add("form-close");
    const formContainer = document.getElementById("contenedorModal");
    formContainer.style.opacity = "0";
    formContainer.style.visibility = "hidden";
  }

  //Creamos el mensaje de bienvenida
  const bienvenida = document.createElement("p");
  bienvenida.textContent = `Hola, ${nombre}`;
  ladoDerecho.append(bienvenida);
  inicioSesion.remove();
  bienvenida.className = "bienvenida";
};

iniciarSesion.addEventListener("click", agregarUsuario);


//Al abrir la pagina se fija si hay algo en el local storage para mostrarlo en la pagina
window.addEventListener("load", () => {
  let usuariosAlmacenados = localStorage.getItem("usuarios");
  if (usuariosAlmacenados) {
    let usuarios = JSON.parse(usuariosAlmacenados);

    const unicoUsuario = usuarios[0];
    const bienvenida = document.createElement("p");
    bienvenida.textContent = `Hola, ${unicoUsuario.nombre}`;
    ladoDerecho.append(bienvenida);
    inicioSesion.remove();
    bienvenida.className = "bienvenida";
  }
});
