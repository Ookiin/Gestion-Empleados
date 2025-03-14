# Documentación del Backend

## Instalacion de dependencias

Se debe instalar las dependencias ejecutando en consola el comando

```javascript
npm install
```

## Iniciacion de servidor

Para iniciar el servidor se debe ejecutar el comando en consola

```javascript
npm start
```

## Variables de entorno

En la carpeta backend se debe crear un archivo .env que incluira lo siguiente:

```
PORT=5000
  # Puerto en el que la app correrá. Cambia este valor si el puerto 5000 está ocupado.
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.avvzz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# URI de conexión a la base de datos MongoDB (Atlas)
JWT_SECRET=<clave_secreta>
# Clave secreta para generar y verificar los tokens JWT. Genera una clave secreta única.
EMAIL_USER=<correo_de_envio>
# Correo electrónico desde el que se enviarán los correos (para recuperar contraseñas, por ejemplo)
EMAIL_PASS=<contraseña_correo>
# Contraseña de la cuenta de correo (para enviar correos)
RESET_URL=http://localhost:5173
# URL a la que se redirigirá el usuario para resetear la contraseña. Cambia según tu entorno.
API_POSITIONS=https://ibillboard.com/api/positions
# URL de la API para obtener las posiciones disponibles

```

### Notas Importantes:

````PORT: Este valor indica el puerto en el que la aplicación frontend se ejecutará. Si ya tienes otra aplicación utilizando ese puerto, puedes cambiarlo a otro disponible en tu máquina.

MONGO_URI: Es la URI para conectar con tu base de datos en MongoDB Atlas. Si estás utilizando una base de datos local o diferente, ajusta esta URI.

JWT_SECRET: Debes generar una clave secreta única para usarla en la autenticación de los usuarios con JWT.

EMAIL_USER y EMAIL_PASS: Son las credenciales de la cuenta de correo electrónico que se usará para enviar correos, como para el restablecimiento de contraseñas.

RESET_URL: La URL a la que se enviará el enlace de restablecimiento de contraseña.

API_POSITIONS: URL de la API externa que contiene las posiciones de trabajo.```

## Introducción

Este backend está diseñado para gestionar empleados, sus posiciones y usuarios asociados. Está basado en Node.js con Express y MongoDB como base de datos. Utiliza JWT para la autenticación y bcrypt para la encriptación de contraseñas. La API sigue el patrón RESTful y proporciona funcionalidades para CRUD (crear, leer, actualizar y eliminar) de empleados.

## 🚀 Tecnologías Utilizadas

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) **Express**: Framework web minimalista para Node.js.
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB**: Base de datos NoSQL para almacenar la información de empleados y usuarios.
- ![Mongoose](https://img.shields.io/badge/Mongoose-AA0000?style=for-the-badge) **Mongoose**: ORM para interactuar con MongoDB.
- ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white) **JWT (JSON Web Token)**: Para la autenticación y autorización de los usuarios.
- ![BcryptJS](https://img.shields.io/badge/BcryptJS-4A90E2?style=for-the-badge) **BcryptJS**: Para la encriptación de contraseñas de los usuarios.
- ![Passport](https://img.shields.io/badge/Passport-3B5998?style=for-the-badge&logo=passport&logoColor=white) **Passport**: Middleware de autenticación.

## Estructura del Proyecto

        backend/
        ├── config/
        │   └── db.js
        │
        ├── controllers/
        |   ├── authController.js
        |   └── employeeController.js
        │
        ├── middleware/
        │   └── authMiddleware.js
        │
        ├── models/
        │   ├── Employee.js
        │   └── User.js
        │
        ├── routes/
        │   ├── authRoutes.js
        │   ├── employeeRoutes.js
        │   └── positionsRoutes.js
        │
        ├── utils/
        │   └── generateToken.js
        │
        └── server.js

## Descripción de las Carpetas y Archivos

    config/: Contiene la configuración de la base de datos, como la conexión con MongoDB.

    controllers/: Almacena la lógica de controladores para manejar las solicitudes HTTP.

        ├── authController.js: Controlador encargado de la autenticación y generación de tokens JWT.
        └── employeeController.js: Controlador que maneja la lógica de los empleados.

    middleware/: Contiene middlewares que se ejecutan antes de las solicitudes para protección y validaciones.
        └── authMiddleware.js: Middleware que protege rutas verificando el token JWT.

    models/: Define los esquemas de la base de datos usando Mongoose.
        ├── Employee.js: Modelo de empleados.
        └── User.js: Modelo de usuarios.

    routes/: Contiene los archivos donde se definen las rutas de la API.
        ├── authRoutes.js: Rutas relacionadas con la autenticación de usuarios.
        ├── employeeRoutes.js: Rutas para la gestión de empleados.
        └── positionsRoutes.js: Rutas para la obtencion de las posiciones de la API.

    utils/: Funciones auxiliares reutilizables.
        └── generateToken.js: Función para generar tokens JWT para autenticación.

    server.js: Archivo principal que inicia el servidor Express y configura la API.

### Middleware

El middleware utilizado en este backend incluye la verificación del token JWT para autenticar las solicitudes.

authMiddleware.js
Este middleware, llamado protect, se asegura de que las solicitudes entrantes estén acompañadas de un token JWT válido.
Las rutas que lo requieran se les introduce el protect para que si o si requieran un token JWT para procesar la respuesta.

Ejemplo:

La ruta de Login no utiliza protect porque obviamente no tiene token al no haber usuario logueado.
Ahora para recuperar contraseña o cerrar sesion se requiere el protect

```javascript
router.post("/login", loginUser);

router.post("/logout", protect, logoutUser);

router.post("/forgot-password", protect, requestPasswordReset);
````

## Rutas (Endpoints)

1. POST /api/auth/login
   Método: POST

Descripción: Permite a los usuarios iniciar sesión proporcionando sus credenciales. Si las credenciales son correctas, se devuelve un token JWT.

2. GET /api/employees
   Método: GET

Descripción: Obtiene la lista de todos los empleados registrados en el sistema. Requiere autenticación.

3. GET /api/employees/search?name=${nombre o apellido de empleado}
   Método: GET

Descripción: Obtiene la información de un empleado específico utilizando su ID. Requiere autenticación.

4. PUT /api/employees/:id/update
   Método: PUT

Descripción: Actualiza la información de un empleado (por ejemplo, su puesto de trabajo). Requiere autenticación.

5. DELETE /api/employees/:id
   Método: DELETE

Descripción: Elimina un empleado del sistema. Requiere autenticación.

6. POST /api/auth/register
   Método: POST

Descripción: Permite crear un usuario admin proporcionando la información necesaria. La información del admin se guarda en la base de datos como usuario pero no como empleado.

7. POST /api/auth/logout
   Método: POST

Descripción: Permite a los usuarios cerrar sesión. Requiere autenticación.

8. POST /api/auth/forgot-password
   Método: POST

Descripción: Permite a los usuarios solicitar un restablecimiento de contraseña. Se envía un correo electrónico con un enlace para restablecer la contraseña.

9. POST /api/auth/reset-password/:token
   Método: POST

Descripción: Permite a los usuarios restablecer su contraseña utilizando un token proporcionado en el enlace de restablecimiento de contraseña.

10. POST /api/auth/createEmployee
    Método: POST

Descripción: Permite crear al admin un empleado proporcionando la información necesaria. La información del empleado se guarda en la base de datos como usuario y como empleado, separando la informacion sensible de seguridad como contraseña, tokens, de la informativa.

# Conclusión

Este backend proporciona un sistema de autenticación y autorización mediante JWT, además de una gestión de empleados y usuarios asociada a MongoDB. Las rutas están protegidas por middleware de autenticación, asegurando que solo los usuarios válidos puedan acceder a los recursos.
