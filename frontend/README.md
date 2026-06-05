# 🚖 VehicleSphere Dashboard - Frontend Client

### Modern React + Vite Analytics Dashboard & Booking Console.

[![React](https://img.shields.io/badge/React-v19.2.6-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v8.0.12-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Material UI](https://img.shields.io/badge/Material_UI-v9.0.1-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-v2.12.0-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4.3.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Router](https://img.shields.io/badge/React_Router-v7.17.0-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)

---

## 📖 Table of Contents
1. [Introduction](#-introduction)
2. [Tech Stack & Architecture](#-tech-stack--architecture)
3. [Path Aliases & Imports](#-path-aliases--imports)
4. [Folder Structure](#-folder-structure)
5. [Development & Setup](#-development--setup)

---

## 🔍 Introduction

**VehicleSphere Client** is a state-of-the-art React dashboard designed to visualize massive vehicle bookings, manage system administrators, coordinate rides logistics, and execute interactive multi-field searches.

Built with React 19 and Vite 8, this frontend project leverages styling harmony between Material UI's design framework and TailwindCSS's utility styling pipeline.

---

## 🛠 Tech Stack & Architecture

- **Core & Setup**: React 19, Vite 8 for fast hot-reloading and asset bundles.
- **Routing**: `react-router-dom` for application flows, dashboard authentication guards, and role permissions.
- **State Management**: Redux Toolkit & React-Redux for global store, analytics cache, and auth session persistence.
- **Form Handling & Validation**: Formik coupled with Yup schemas for bulletproof input checks.
- **HTTP Client**: Axios configured with interceptors for header token injections and dynamic CORS.
- **UX & Utilities**: `react-hot-toast` for micro-animations and status notifications, `react-helmet-async` for SEO metadata.

---

## ⚡ Path Aliases & Imports

Native import aliases are set up in [vite.config.js](file:///d:/Vehicle_Bookings/frontend/vite.config.js) and mapped in [jsconfig.json](file:///d:/Vehicle_Bookings/frontend/jsconfig.json) to keep code clean and modular:

| Alias | Target Directory | Description |
| :--- | :--- | :--- |
| `@` | `/src` | Root src directory |
| `@components` | `/src/components` | Shared reusable UI components |
| `@features` | `/src/features` | Feature-specific slices and modules |
| `@hooks` | `/src/hooks` | Reusable custom React hooks |
| `@layouts` | `/src/layouts` | Main layout wrappers (e.g. Sidebar, Navbar) |
| `@pages` | `/src/pages` | Routed view pages |
| `@routes` | `/src/routes` | Routes configurations andguards |
| `@services` | `/src/services` | Axios client and API services |
| `@store` | `/src/store` | Redux store setup and slice index |
| `@utils` | `/src/utils` | Pure utility helper functions |
| `@constants` | `/src/constants` | Shared enums and static configs |

Example import:
```javascript
import Navbar from '@components/Navbar';
import { useAuth } from '@hooks/useAuth';
```

---

## 📂 Folder Structure

```bash
frontend/
│── public/                   # Static public assets
│── src/
│   ├── assets/               # Local images, SVG assets
│   ├── components/           # Shared global components
│   ├── constants/            # Common constants & configurations
│   ├── features/             # Redux slices and features
│   ├── hooks/                # Global custom hooks
│   ├── layouts/              # Core layout containers (Sidebar, Navbar)
│   ├── pages/                # View layouts and route entrypages
│   ├── routes/               # Navigation configs & guards
│   ├── services/             # Axios and external API helpers
│   ├── store/                # Redux configuration
│   ├── utils/                # General helpers & formatting
│   ├── App.jsx               # App container
│   ├── index.css             # Main styling entry (Tailwind layers)
│   └── main.jsx              # App entry mount file
│── eslint.config.js          # ESLint config setup
│── jsconfig.json             # JS path resolution configs
│── postcss.config.js         # PostCSS configuration
│── tailwind.config.js        # TailwindCSS utility theme configuration
│── vite.config.js            # Vite build and server config
└── package.json              # Project dependencies manifest
```

---

## ⚙ Development & Setup

### 1. Install Dependencies
Ensure you have Node.js installed, navigate to the frontend folder, and execute:
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The application will launch locally (typically at `http://localhost:5173`).

### 3. Production Build
To create an optimized production bundle:
```bash
npm run build
```
The output files will be compiled into the `dist/` directory.

### 4. Code Quality & Formatting
Run ESLint check:
```bash
npm run lint
```
