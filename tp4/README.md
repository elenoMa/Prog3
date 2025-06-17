# Proyecto de Prueba Vite

Este proyecto consiste en una aplicación web que muestra un listado de personas. Está dividido en dos partes: un backend (API) y un frontend (interfaz de usuario).

## Backend

El backend está desarrollado con Express y sigue una estructura MVC (Modelo-Vista-Controlador). Para inicializarlo, sigue estos pasos:

1. Navega a la carpeta del backend:
   ```sh
   cd Backend
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Inicia el servidor:
   ```sh
   node app.js
   ```

El servidor estará disponible en [http://localhost:3001](http://localhost:3001) y expone la ruta `/personas` que devuelve un listado de personas.

## Frontend

El frontend está desarrollado con React y Vite. Para inicializarlo, sigue estos pasos:

1. Navega a la carpeta del frontend:
   ```sh
   cd Frontend
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```sh
   npm run dev
   ```

La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

## Estructura del Proyecto

- **Backend**: Contiene la API desarrollada con Express, siguiendo la estructura MVC.
- **Frontend**: Contiene la interfaz de usuario desarrollada con React y Vite, con componentes para mostrar el listado de personas.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: React, Vite

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
