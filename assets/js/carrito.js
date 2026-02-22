
// guardado
let carrito = JSON.parse(localStorage.getItem('domus_carrito')) || [];

// numero de articulos en el carrito
function actualizarContador() {
    const contador = document.getElementById('cart-count');
    if (contador) {
        
        const totalArticulos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
        contador.innerText = totalArticulos;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();


    const botonesAgregar = document.querySelectorAll('.btn-add-cart');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {

            const card = e.target.closest('.producto-card');
            const nombre = card.querySelector('h4').innerText;
            const precioTexto = card.querySelector('.precio').innerText;
            

            const precio = parseFloat(precioTexto.replace('S/ ', ''));
            const imagen = card.querySelector('img').src;


            agregarAlCarrito({ nombre, precio, imagen, cantidad: 1 });
        });
    });
});


function agregarAlCarrito(nuevoProducto) {

    const index = carrito.findIndex(p => p.nombre === nuevoProducto.nombre);
    
    if (index !== -1) {

        carrito[index].cantidad += 1;
    } else {

        carrito.push(nuevoProducto);
    }


    localStorage.setItem('domus_carrito', JSON.stringify(carrito));
    
    actualizarContador();
    

    alert(`¡Se agregó "${nuevoProducto.nombre}" a tu carrito!`);
}


document.addEventListener('DOMContentLoaded', () => {
   
    if (document.getElementById('contenedor-carrito')) {
        renderizarCarrito();
    }
});

function renderizarCarrito() {
    const contenedor = document.getElementById('contenedor-carrito');
    const resumenSubtotal = document.getElementById('resumen-subtotal');
    const resumenIgv = document.getElementById('resumen-igv');
    const resumenTotal = document.getElementById('resumen-total');


    if (carrito.length === 0) {
        contenedor.innerHTML = '<p style="padding: 2rem 0; color: #666;">Tu carrito está vacío. <a href="/catalogo" style="color: #B4A27D; font-weight: bold;">Explorar el catálogo</a></p>';
        resumenSubtotal.innerText = 'S/ 0.00';
        resumenIgv.innerText = 'S/ 0.00';
        resumenTotal.innerText = 'S/ 0.00';
        return;
    }

 
    contenedor.innerHTML = '';
    let subtotal = 0;

    
    carrito.forEach((producto, index) => {
        const totalProducto = producto.precio * producto.cantidad;
        subtotal += totalProducto;

        contenedor.innerHTML += `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="item-detalles">
                    <h4>${producto.nombre}</h4>
                    <p>Precio unitario: S/ ${producto.precio.toFixed(2)}</p>
                </div>
                <div class="item-cantidad">
                    <input type="number" value="${producto.cantidad}" min="1" onchange="actualizarCantidad(${index}, this.value)">
                </div>
                <div class="item-precio">
                    <p>S/ ${totalProducto.toFixed(2)}</p>
                    <button class="btn-eliminar" onclick="eliminarProducto(${index})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    resumenSubtotal.innerText = `S/ ${subtotal.toFixed(2)}`;
    resumenIgv.innerText = `S/ ${igv.toFixed(2)}`;
    resumenTotal.innerText = `S/ ${total.toFixed(2)}`;
}

// cantidad
function actualizarCantidad(index, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad);
    if (nuevaCantidad >= 1) {
        carrito[index].cantidad = nuevaCantidad;
        localStorage.setItem('domus_carrito', JSON.stringify(carrito));
        renderizarCarrito(); 
        actualizarContador(); 
    }
}

// eliminar producto
function eliminarProducto(index) {
    carrito.splice(index, 1); 
    localStorage.setItem('domus_carrito', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContador();
}