
import mysql.connector
from mysql.connector import Error

def get_db_connection():
    """
    Establece y retorna una conexión a la base de datos MySQL.
    Asegúrate de cambiar 'tu_contraseña' por la contraseña real de tu MySQL.
    """
    try:
        connection = mysql.connector.connect(
            host='localhost',       #
            database='domus_regia', 
            user='root',            
            password='tu_contraseña' 
        )
        
        if connection.is_connected():
            print("Conexión exitosa a la base de datos MySQL")
            return connection

    except Error as e:
        print(f"Error al conectar con MySQL: {e}")
        return None