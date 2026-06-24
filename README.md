# 🛒 E-Commerce React App - Proyecto Universitario

Este es un proyecto de desarrollo Frontend que simula una tienda en línea completamente funcional. Fue construido de forma nativa utilizando **React 18** y **Vite**, consumiendo los datos públicos de la API de Platzi (*Fake Store API*) y aplicando los lineamientos técnicos solicitados por la materia.

## 🚀 Características Principales

- **Navegación Dinámica:** Arquitectura basada en rutas con *React Router DOM v6* (incluye manejo de páginas 404).
- **Consumo de API:** Conexión asíncrona mediante la API nativa `fetch()` a los endpoints oficiales de Platzi.
- **Estado Global:** Implementación de múltiples contextos con *Context API* para el manejo agnóstico del carrito y el flujo de sesiones.
- **Diseño Responsivo:** Interfaz moderna y consistente construida sobre el framework estético **Material UI (MUI v5)**.
- **Abstracción de Lógica:** Centralización de llamadas asíncronas y efectos secundarios a través de *Custom Hooks* reutilizables.

---

## 🛠️ Stack Tecnológico Obligatorio

- **React 18** & **Vite** (Entorno de desarrollo rápido)
- **React Router DOM v6** (Estrategia de enrutamiento por objetos)
- **Material UI (MUI)** & **Emotion** (Estilos y componentes UI)
- **Context API** (Manejo del estado global)
- **Hooks Nativos:** `useState`, `useEffect`, `useContext`, `useSearchParams`, `useParams`
- **JavaScript ES6+** & **Fetch API Nativa**

---

## 📂 Estructura del Proyecto

```text
src/
├── components/     # Bloques de interfaz reutilizables (ej. Footer)
├── contexts/       # Cerebro de la app (CartContext y UserContext)
├── hooks/          # Custom Hooks abstractos (useProducts y useCategories)
├── layouts/        # Estructura visual de contenedor principal (MainLayout con Navbar)
├── pages/          # Las 8 pantallas completas mapeadas por las rutas
├── routes/         # Configuración centralizada de React Router
├── services/       # Módulo con las peticiones fetch nativas (platziApi)
├── App.jsx         # Orquestador global de proveedores y enrutador
└── main.jsx        # Punto de entrada raíz de la aplicación React
```

---

## 🖥️ Páginas del Sistema

1. **Home (`/`):** Banner destacado de bienvenida, carrusel/lista de categorías y renderizado dinámico de 8 productos recomendados de forma aleatoria.
2. **Productos (`/productos`):** Catálogo total con soporte para buscador por términos en tiempo real (`useState`) y filtros cruzados por categorías.
3. **Detalle de Producto (`/producto/:id`):** Captura de parámetros variables para renderizar la descripción completa, precio, categoría y acción de compra.
4. **Login (`/login`):** Formulario controlado con validaciones de campos y simulación de sesión autenticada vinculada al estado global.
5. **Registro (`/registro`):** Formulario con validación cruzada de credenciales (passwords coincidentes) persistido localmente.
6. **Carrito (`/carrito`):** Desglose de ítems seleccionados, manipulación incremental de unidades por artículo, cálculo automatizado de subtotales/totales y vaciado total.
7. **Perfil (`/perfil`):** Panel privado que expone los datos del usuario activo y el conteo del carro de compras. Cuenta con restricción condicional si la sesión no está iniciada.
8. **Contacto (`/contacto`):** Formulario estructurado para recabar consultas de soporte con confirmación visual de envío exitoso (`Alert`).

---

## ⚙️ Instalación y Arranque Rápido

Para levantar el proyecto en tu entorno local, sigue estos comandos en tu terminal:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Martin-Varela4/ecommerce-react.git
   cd ecommerce-react
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar servidor en modo desarrollo:**
   ```bash
   npm run dev
   ```
   *Abre en tu navegador la dirección por defecto indicada por Vite:* `http://localhost:5173/`

---

## 💡 Credenciales de Prueba (Simulación Login)
Para testear el sistema de autenticación sin necesidad de registrar un usuario desde cero, puedes usar las credenciales configuradas por defecto:
- **Email:** `admin@admin.com`
- **Contraseña:** `123456`
