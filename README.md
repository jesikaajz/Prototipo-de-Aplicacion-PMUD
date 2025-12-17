# 🚀 API de Gestión de Programadores

**Prototipo funcional desarrollado con Django y Django REST Framework**
 Descripción

API RESTful para la gestión de programadores, desarrollada como prototipo funcional para informe práctico. Permite realizar operaciones CRUD completas sobre una base de datos de programadores.

 Características Principales

-  **API RESTful completa** con todos los métodos HTTP
-  **CRUD completo**: Create, Read, Update, Delete
-  **Serialización automática** JSON ↔ Modelos Django
-  **Panel de administración** integrado
-  **Doble interfaz**: API JSON + Página web HTML
-  **Validación automática** de datos
-  **Documentación automática** de endpoints

Estructura del Proyecto

api/
├── models.py # Definición del modelo Programmer
├── serializers.py # Serializador para JSON
├── views.py # Vistas (ViewSet y vistas web)
├── urls.py # Configuración de rutas
├── admin.py # Registro en panel admin
└── tests.py # Pruebas unitarias

2. Instalar dependencias

pip install django djangorestframework

3. Configurar base de datos

# Aplicar migraciones
python manage.py makemigrations
python manage.py migrate

# Crear superusuario (opcional)
python manage.py createsuperuser


4. Ejecutar servidor
python manage.py runserver

Ejemplo: Crear un programador

curl -X POST http://localhost:8000/api/programmers/ \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": "Ada Lovelace",
    "nickname": "Ada",
    "age": 36,
    "is_active": true
  }'
Ejemplo: Obtener todos los programadores

curl -X GET http://localhost:8000/api/programmers/

Ejemplo: Actualizar un programador

curl -X PATCH http://localhost:8000/api/programmers/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "age": 37
  }'
