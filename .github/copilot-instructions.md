# Aura Corporativa - Guía de Arquitectura y Contexto para GitHub Copilot

Este repositorio es una solución Full-Stack compuesta por una aplicación web moderna (Frontend) y una API RESTful empresarial (Backend). Sigue estas directrices para mantener coherencia arquitectónica, tipado estricto y mejores prácticas.

---

## 1. Estructura y Tecnologías del Proyecto

```
Aura Corporativa/
├── Backend/                 # API REST en Laravel 12 (PHP 8.2+)
│   ├── app/
│   │   ├── Http/Controllers/ # AuthController, ContactoController, ServicioController
│   │   └── Models/          # User, Contacto, Servicio
│   ├── database/migrations/ # Esquemas de base de datos
│   └── routes/api.php       # Rutas de la API (Sanctum)
├── Frontend/                # SPA en React 19 + TypeScript + Vite
│   ├── src/
│   │   ├── components/      # Componentes UI de Landing Page
│   │   ├── data/            # Datos estáticos y fallbacks
│   │   ├── services/        # Clientes HTTP y servicios API
│   │   ├── types/           # Interfaces TypeScript
│   │   └── App.tsx          # Componente principal
└── .github/copilot-instructions.md
```

---

## 2. Convenciones y Reglas del Backend (Laravel)

- **Controladores y Respuestas:** Usa siempre respuestas estructuradas `response()->json($data, $status)`.
- **Validación:** Emplea `FormRequest` para endpoints con mutaciones complejas (`store`, `update`).
- **Autenticación:** Las rutas protegidas residen bajo el middleware `auth:sanctum`.
- **Nombres de Campos en BD (Snake Case):**
  - `servicios`: `id`, `titulo`, `slug`, `descripcion`, `descripcion_corta`, `incluye` (json), `icono`, `orden`, `activo`.
  - `contactos`: `id`, `nombre`, `email`, `telefono`, `empresa`, `tipo` (`contacto`|`cotizacion`), `mensaje`, `leido`.
- **Seguridad:** Sanitizar entradas, proteger contra inyecciones SQL usando Eloquent y validar CORS para clientes autorizados.

---

## 3. Convenciones y Reglas del Frontend (React + TypeScript)

- **Estilos:** Tailwind CSS v4. Usa la paleta corporativa principal:
  - Rojo Primario: `#DC2626` / `text-red-600` / `bg-red-600`
  - Acentos Oscuros: `slate-900`, `slate-800`, `slate-600`
  - Fondos Suaves: `bg-slate-50/70`, `bg-white`
- **Iconos:** Importa exclusivamente desde `lucide-react`.
- **Tipado:** Tipa estrictamente todas las `props`, `states` y respuestas de API sin utilizar `any`.
- **Resiliencia en Red:** Toda llamada asíncrona a la API debe manejar estados de:
  1. `loading` (indicador de carga / skeleton / disabled en botones).
  2. `error` (mensaje amigable al usuario con fallback seguro).
  3. `success` (confirmación visual o toast).
- **Variables de Entorno:** Accede a la API mediante `import.meta.env.VITE_API_BASE_URL`.

---

## 4. Contratos de Datos Clave (DTOs / Tipos)

### Contacto / Lead Submission
```typescript
export interface LeadPayload {
  nombre: string;
  email: string;
  telefono?: string;
  empresa?: string;
  tipo?: 'contacto' | 'cotizacion';
  mensaje: string;
}

export interface ContactoResponse {
  id: number;
  nombre: string;
  email: string;
  telefono: string | null;
  empresa: string | null;
  tipo: 'contacto' | 'cotizacion';
  mensaje: string;
  leido: boolean;
  created_at: string;
}
```

### Servicio
```typescript
export interface ServicioDTO {
  id: number | string;
  titulo: string;
  slug: string;
  descripcion: string;
  descripcion_corta?: string;
  incluye: string[];
  icono?: string;
  orden?: number;
  activo?: boolean;
}
```
