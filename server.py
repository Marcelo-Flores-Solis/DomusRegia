from flask import Flask, render_template, request, redirect, url_for, flash
from database.connection import get_db_connection
app = Flask(__name__, template_folder='templates', static_folder='assets', static_url_path='/assets')

app.secret_key = 'clave_secreta_domus_regia' 



@app.route('/')
def inicio():
    """Ruta para la página principal."""
    return render_template('index.html')

@app.route('/catalogo')
def catalogo():
    """Ruta para el catálogo (Aquí vivirá tu integración con Ecwid)."""
    return render_template('catalogo.html')

@app.route('/login')
def login():
    """Ruta para mostrar el formulario de inicio de sesión."""
    return render_template('login.html')

@app.route('/registro')
def registro():
    """Ruta para mostrar el formulario de creación de cuenta."""
    return render_template('registro.html')



@app.route('/procesar_registro', methods=['POST'])
def procesar_registro():
    """Recibe los datos del formulario de registro."""
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        correo = request.form.get('correo')
        password = request.form.get('password')
        direccion = request.form.get('direccion')
        
        print(f"Nuevo registro recibido: {nombre}, {correo}") 
        
        return redirect(url_for('login'))

@app.route('/procesar_login', methods=['POST'])
def procesar_login():
    """Recibe los datos del formulario de inicio de sesión."""
    if request.method == 'POST':
        correo = request.form.get('correo')
        password = request.form.get('password')
        
        print(f"Intento de login: {correo}") 
        
        
        return redirect(url_for('inicio'))


if __name__ == '__main__':
    app.run(debug=True, port=5000)