# App de inventarios

## Estructura de carpetas
```
APP_INVENTARIOS_PHONE/
│
├── public/                    # Archivos públicos como imágenes, favicon, etc.
├── src/
│   ├── app/                   # Sistema de rutas App Router
│   │   ├── (public)/          # Layouts/páginas públicas
│   │   ├── (private)/         # Layouts/páginas privadas
│   │   ├── layout.tsx         # Layout raíz
│   │   ├── page.tsx           # Página principal
│   │   └── globals.css        # Estilos globales
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/                # Botones, inputs, modales, etc.
│   │   ├── shared/            # Componentes compartidos como Navbar/Footer
│   │   └── section/           # Secciones específicas de la aplicación
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Funciones helper y utilidades
│   ├── schemas/               # Tipos usando zod
│   ├── services/              # Peticiones a la api
└── └── config/                # Configuración general (envíos, constantes, etc.)
```

## Tecnologías

- **Next.js** 15.3.0 - Framework de React para aplicaciones web.
- **React** 19.0.0 - Biblioteca para construir interfaces de usuario.
- **React DOM** 19.0.0 - Renderizado de componentes React en el DOM.
- **Axios** 1.8.4 - Cliente HTTP para realizar peticiones a APIs.
- **Zod** 3.24.2 - Validación y tipado de datos.
- **Tailwind CSS** 4 - Framework de utilidades CSS.
- **TypeScript** 5 - Superset de JavaScript con tipado estático.
- **Lucide** 0.487.0 - Iconos SVG modernos y personalizables.
- **ESLint** 9 - Herramienta para identificar y reportar patrones problemáticos en el código.
- **ShadCN** - Componentes accesibles y estilizados para React.