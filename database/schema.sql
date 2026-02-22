-- 1. Tabla de Usuarios (Para el registro y login)
CREATE TABLE Usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL, -- Aquí guardarás las contraseñas hasheadas
    telefono VARCHAR(20),
    direccion_envio TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Categorías (Opcional pero recomendada para escalar)
CREATE TABLE Categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

-- 3. Tabla de Productos (El catálogo)
CREATE TABLE Productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT, -- Aquí puedes incluir detalles del material, medidas, etc.
    precio DECIMAL(10, 2) NOT NULL, -- Formato para moneda (ej. 150.50)
    stock INT NOT NULL DEFAULT 0,
    id_categoria INT,
    imagen_url VARCHAR(255), -- Ruta de la imagen en tu carpeta assets
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_categoria)
);

-- 4. Tabla de Pedidos (La compra final general)
CREATE TABLE Pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    estado ENUM('Pendiente', 'Pagado', 'Enviado', 'Entregado') DEFAULT 'Pendiente',
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- 5. Tabla de Detalles del Pedido (Qué compró exactamente en cada pedido)
CREATE TABLE Detalles_Pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL, -- Se guarda por si el precio del producto cambia en el futuro
    FOREIGN KEY (id_pedido) REFERENCES Pedidos(id_pedido) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES Productos(id_producto)
);