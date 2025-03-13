## Estructura del Proyecto

La estructura del proyecto frontend está organizada para mantener el código modular, limpio y fácilmente mantenible. Utilizamos TypeScript para los tipos estáticos y mejorar la seguridad del código, con React y Vite como herramientas principales.

# Estructura de Carpetas

    src/
    ├── components/
    │ ├── EmployeeModal/
    │ ├── Header/
    │ ├── Sidebar/
    │ └── ...
    ├── pages/
    │ ├── Home/
    │ ├── Login/
    │ ├── Dashboard/
    │ └── ...
    ├── services/
    │ ├── api.ts
    │ └── auth.ts
    ├── styles/
    │ ├── index.ts
    │ └── ...
    └── utilities/
    ├── interfaces.ts
    └── helpers.ts

# Componentes Principales

1. EmployeeModal:
   Este componente permite la visualización y edición de la información de los empleados. Dependiendo del rol del usuario logueado, el modal habilitará o deshabilitará la opción de editar los datos.

# Funcionalidad:

Permite mostrar la información del empleado (nombre, puesto, email, fecha de nacimiento).
Si el usuario logueado tiene el rol de "admin", podrá editar el nombre y puesto.
El botón de "Actualizar" solo es visible si el rol del usuario es "admin".
Props:

isOpen: Booleano que indica si el modal está abierto o cerrado.
employee: Objeto del empleado cuyo perfil se quiere editar.
positions: Array de posiciones disponibles para asignar al empleado.
onUpdate: Función que maneja la actualización de los datos del empleado.
onClose: Función que maneja el cierre del modal.
Lógica de actualización:

Se verifica el rol del usuario logueado (guardado en el localStorage).
Si el rol es "admin", el modal permite editar el nombre y puesto del empleado.
El modal se cierra una vez que el admin realiza la actualización.

```javascript
const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  employee,
  positions,
  onUpdate,
  onClose,
}) => {
  const [newFirstName, setNewFirstName] = useState < string > "";
  const [newPosition, setNewPosition] = useState < string > "";

  const userRole = JSON.parse(localStorage.getItem("user") || "{}").role;

  useEffect(() => {
    if (employee) {
      setNewFirstName(employee.firstName);
      setNewPosition(employee.position);
    }
  }, [employee]);

  const handleUpdate = () => {
    if (employee) {
      console.log(employee._id, newFirstName, newPosition);
      onUpdate(employee._id, newFirstName, newPosition);
      onClose();
    }
  };

  if (!isOpen || !employee) return null;

  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalHeader>Editar Empleado</ModalHeader>
        <ModalInput
          type="text"
          value={newFirstName}
          onChange={(e) => setNewFirstName(e.target.value)}
          placeholder="Nuevo nombre"
        />
        <ModalInput
          type="text"
          value={employee.lastName}
          readOnly
          placeholder="Apellido"
        />
        <ModalInput
          type="text"
          value={employee.email}
          readOnly
          placeholder="Email"
        />
        <ModalInput
          type="text"
          value={new Date(employee.birthDate).toLocaleDateString("es-ES")}
          readOnly
          placeholder="Fecha de nacimiento"
        />
        <ModalSelect
          value={newPosition}
          onChange={(e) => setNewPosition(e.target.value)}
        >
          <option value="">Seleccione una posición</option>
          {positions.map((position, index) => (
            <option key={index} value={position}>
              {position}
            </option>
          ))}
        </ModalSelect>
        {userRole === "admin" && (
          <Button onClick={handleUpdate}>Actualizar</Button>
        )}
      </ModalContent>
    </Modal>
  );
};
```

2. SearchResults:
   Este componente muestra la lista de empleados y permite abrir el EmployeeModal para editar los datos de un empleado.

# Funcionalidad:

Muestra una lista de empleados.
Al hacer clic sobre un empleado, abre el modal con la opción de editar la información (solo si el rol es admin).

```javascript
const SearchResults: React.FC<SearchResultsProps> = ({
  employees,
  positions,
}) => {
  const [selectedEmployee, setSelectedEmployee] =
    (useState < Employee) | (null > null);
  const [isModalOpen, setIsModalOpen] = useState < boolean > false;

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const handleUpdateEmployee = (
    employeeId: string,
    newFirstName: string,
    newPosition: string
  ) => {
    // Lógica para manejar la actualización del empleado.
  };

  return (
    <div>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id} onClick={() => handleEmployeeClick(employee)}>
            {employee.firstName} - {employee.position}
          </li>
        ))}
      </ul>

      {selectedEmployee && (
        <EmployeeModal
          isOpen={isModalOpen}
          employee={selectedEmployee}
          positions={positions}
          onUpdate={handleUpdateEmployee}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
```

# Lógica de Autenticación

El sistema de autenticación se maneja usando el localStorage para almacenar los datos del usuario logueado. El rol del usuario se guarda allí y se utiliza para determinar los permisos y la visualización de botones como el de "Actualizar".

# Verificación del Rol:

Al acceder a los diferentes componentes (como el modal), la aplicación revisa el rol del usuario logueado para determinar si se deben mostrar ciertas opciones, como los campos editables.

Ejemplo:

```javascript
const userRole = JSON.parse(localStorage.getItem("user") || "{}").role;

if (userRole === "admin") {
  // Mostrar opciones de edición
} else {
  // Solo lectura
}
```

# Servicios

api.ts:
Este archivo contiene las funciones que interactúan con la API backend. Incluye métodos para actualizar los datos del usuario, obtener la lista de empleados, etc.

```javascript
export const updateUser = async (
  token: string,
  userId: string,
  updateData: any
) => {
  const response = await fetch(`/api/employees/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar usuario");
  }
};
```

auth.ts:
Este archivo contiene la lógica para autenticar a los usuarios, manejar el login y almacenar el token de acceso en el localStorage.

# Estilos

Los estilos se gestionan mediante un archivo de estilos centralizados para asegurar que los componentes mantengan una apariencia consistente. Los estilos están definidos en el archivo index.ts dentro de la carpeta styles.

Ejemplo de un botón estilizado:

```javascript
export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
```

### Conclusión

El frontend está diseñado para ser modular, con componentes reutilizables como el EmployeeModal y SearchResults. La lógica de autorización se maneja utilizando el rol del usuario almacenado en localStorage, asegurando que solo los administradores puedan editar la información de los empleados. La autenticación y el acceso se gestionan adecuadamente, con todos los datos del usuario y el token siendo guardados y utilizados según sea necesario para las operaciones de la aplicación.

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
