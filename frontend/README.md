# Documentación del Frontend

## Instalacion de dependencias

Se debe instalar las dependencias ejecutando en consola el comando

```javascript
npm install
```

## Iniciacion de frontend

Para iniciar el frontend se debe ejecutar el comando en consola

```javascript
npm run dev
```

## Variables de entorno

En la carpeta frontend se debe crear un archivo .env que incluira lo siguiente:

```
VITE_API_URL=http://localhost:5173/api

```

## Estructura del Proyecto

La estructura del proyecto frontend está organizada para mantener el código modular, limpio y fácilmente mantenible. Utilizamos TypeScript para los tipos estáticos y mejorar la seguridad del código, con React y Vite como herramientas principales.

## 🚀 Tecnologías Utilizadas

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript**: Lenguaje de programación que extiende JavaScript añadiendo tipos estáticos.
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript**: Lenguaje de programación utilizado para la lógica del frontend.
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) **React**: Biblioteca para construir interfaces de usuario.
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) **Vite**: Herramienta de desarrollo rápida para proyectos de frontend.
- ![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) **Styled Components**: Librería para escribir estilos CSS en JavaScript.
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) **ESLint**: Herramienta para identificar y reportar patrones encontrados en el código ECMAScript/JavaScript.
- ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) **Prettier**: Formateador de código para mantener un estilo consistente.

# Estructura de Carpetas

La estructura del proyecto frontend está organizada de la siguiente manera:

```
src/
├── components/
│   ├── button.tsx
│   ├── cardEmployee.tsx
│   ├── loader.tsx
│   ├── modalEmployee.tsx
│   └── search.tsx
├── layouts/
│   └── adminLayout.tsx
├── pages/
│   ├── AdminDashboard.tsx
│   ├── EmployeeDashboard.tsx
│   ├── ForgetPassword.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── RegisterEmployee.tsx
│   ├── ResetPassword.tsx
│   └── SearchResults.tsx
├── services/
│   ├── authService.tsx
│   └── roleRedirect.tsx
├── styles/
│   ├── index.ts
│   └── loader.css
├── utilities/
│   └── interfaces.ts
├── App.tsx
├── main.tsx
├── index.css
└── index.html
```

# Lógica de Autenticación

El sistema de autenticación se maneja usando el localStorage para almacenar los datos del usuario logueado. El rol del usuario se guarda allí y se utiliza para determinar los permisos y la visualización de botones como el de "Actualizar".

# Verificación del Rol:

Al acceder a los diferentes componentes (como el modal), la aplicación revisa el rol del usuario logueado para determinar si se deben mostrar ciertas opciones, como los campos editables.

Ejemplo:

```javascript
const userRole = JSON.parse(localStorage.getItem("role") || "{}").role;

if (userRole === "admin") {
  // Mostrar opciones de edición
} else {
  // Solo lectura
}
```

# Servicios

authService.tsx:
Este archivo contiene las funciones que interactúan con la API backend. Incluye métodos para actualizar los datos del usuario, obtener la lista de empleados, etc.

Ejemplo:

```javascript
export const fetchPositions = async () => {
  try {
    const response = await axios.get(`${apiUrl}/positions`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo posiciones:", error);
  }
};
```

# Estilos

Los estilos se gestionan mediante un archivo de estilos centralizados para asegurar que los componentes mantengan una apariencia consistente. Los estilos están definidos en el archivo index.ts dentro de la carpeta styles. Ademas reciben props que afectan segun el caso un cambio de estilo haciendo cada componente modulable y reutilizable

Ejemplo de un botón estilizado utilizando una prop del texto del boton "Eliminar empleado":

```javascript
export const StyledButton =
  styled.button <
  StyledButtonProps >
  `
  background-color: ${({ color }) => color};
  color: white;
  font-weight: 600;
  padding: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "0.5rem 1rem" : "1rem"};
  border-radius: 8px;
  transition: background-color 0.3s, box-shadow 0.3s;
  cursor: pointer;
  width: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "auto" : "50%"};
  margin-left: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "10px" : "0"};
  align-self: ${({ $buttonText }) =>
    $buttonText === "Eliminar empleado" ? "center" : "stretch"};

  &:hover {
    background-color: ${({ color }) => color};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
```

### Conclusión

El frontend está diseñado para ser modular, con componentes reutilizables como el EmployeeModal, SearchResults, ActionButton, etc. La lógica de autorización se maneja utilizando el rol del usuario almacenado en localStorage, asegurando que solo los administradores puedan editar la información de los empleados. La autenticación y el acceso se gestionan adecuadamente, con todos los datos del usuario y el token siendo guardados y utilizados según sea necesario para las operaciones de la aplicación.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
