# 🕌 Mosque Tahfidz Management — Frontend

Modern web dashboard for the **Mosque Tahfidz Management System** — a teacher & admin portal to manage Quran memorization (tahfidz) programs. Built with React, TypeScript, and TailwindCSS v4.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Dev Server](#running-the-dev-server)
  - [Building for Production](#building-for-production)
- [Pages & Routes](#pages--routes)
- [Feature Modules](#feature-modules)
- [State Management](#state-management)
- [Scripts](#scripts)
- [License](#license)

---

## Features

- **Dashboard** — Real-time summary statistics and weekly activity charts (Recharts)
- **Student Management** — CRUD operations with search, filter, sort, and pagination (TanStack Table)
- **Mentor Management** — View mentors and their assigned students
- **Progress Tracking** — Record and manage daily Quran memorization progress with bulk entry
- **History** — Browse and filter past progress records
- **Global Search** — Command palette–style search across all entities (cmdk)
- **Activity Logs** — Admin audit trail of system events
- **Image Upload** — Profile and cover image management via Cloudinary
- **Authentication** — JWT-based login with role-aware routing (admin / mentor)
- **Responsive Design** — Desktop sidebar + mobile bottom navigation
- **Toast Notifications** — Rich feedback via Sonner
- **Form Validation** — Schema-driven validation with Zod v4 + React Hook Form

---

## Tech Stack

| Category               | Technology                                                                       |
| ---------------------- | -------------------------------------------------------------------------------- |
| **Language**           | TypeScript 6.0                                                                   |
| **Framework**          | [React 19](https://react.dev/)                                                   |
| **Build Tool**         | [Vite 8](https://vite.dev/)                                                      |
| **Styling**            | [TailwindCSS v4](https://tailwindcss.com/) + [DaisyUI 5](https://daisyui.com/)   |
| **Routing**            | [React Router v7](https://reactrouter.com/)                                      |
| **Data Fetching**      | [TanStack Query v5](https://tanstack.com/query)                                  |
| **Tables**             | [TanStack Table v8](https://tanstack.com/table)                                  |
| **Forms**              | [React Hook Form v7](https://react-hook-form.com/) + [Zod v4](https://zod.dev/)  |
| **State Management**   | [Zustand v5](https://zustand.docs.pmnd.rs/)                                      |
| **HTTP Client**        | [Axios](https://axios-http.com/)                                                 |
| **Charts**             | [Recharts v3](https://recharts.org/)                                             |
| **Command Palette**    | [cmdk](https://cmdk.paco.me/)                                                    |
| **Toasts**             | [Sonner](https://sonner.emilkowal.dev/)                                          |
| **Icons**              | [React Icons](https://react-icons.github.io/react-icons/)                        |
| **Date Utilities**     | [date-fns v4](https://date-fns.org/)                                             |
| **Linting**            | ESLint + typescript-eslint                                                       |

---

## Architecture

The project follows a **feature-driven architecture** with clear separation between shared infrastructure and domain-specific modules.

```text
Entry (main.tsx) → Providers → BrowserRouter → AppRouter → Pages → Features
```

### Key Patterns

- **Feature modules** — Each domain (auth, students, dashboard, etc.) is self-contained with its own components, hooks, types, and utilities
- **Shared components** — Reusable UI primitives (`ui/`), layout shells, form fields, and navigation
- **Custom hooks** — API calls encapsulated with TanStack Query hooks per feature
- **Zustand stores** — Lightweight global state for auth and sidebar
- **Zod schemas** — Type-safe form validation colocated in `validations/`
- **Path aliases** — `@/*` maps to `src/*` for clean imports

---

## Project Structure

```markdown
mosque-tahfidz-management/
├── public/
│   └── logo.ico                       # Favicon
├── src/
│   ├── app/
│   │   ├── providers.tsx              # QueryClient, Toaster, DevTools
│   │   └── router.tsx                 # Route definitions
│   ├── components/
│   │   ├── form/
│   │   │   └── FormField.tsx          # Reusable form field wrapper
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx          # Authenticated layout shell
│   │   │   ├── AppHeader.tsx          # Top navigation bar
│   │   │   └── AppSidebar.tsx         # Desktop sidebar navigation
│   │   ├── navigation/
│   │   │   └── MobileBottomNav.tsx    # Mobile bottom tab bar
│   │   ├── shared/
│   │   │   └── modal.tsx             # Reusable modal dialog
│   │   └── ui/
│   │       ├── EmptyState.tsx         # Empty data placeholder
│   │       ├── LoadingSkeleton.tsx     # Loading skeleton components
│   │       ├── Pagination.tsx         # Pagination controls
│   │       ├── ResponsiveTable.tsx    # Mobile-friendly table wrapper
│   │       ├── SearchBar.tsx          # Search input component
│   │       ├── Table.tsx             # Base table component
│   │       └── TrendIndicator.tsx     # Stat trend arrows
│   ├── constants/
│   │   └── mockData.ts               # Reference/mock data
│   ├── features/
│   │   ├── activityLog/              # Admin audit log
│   │   ├── auth/                     # Login, authentication hooks
│   │   ├── dashboard/               # Dashboard stats & charts
│   │   ├── mentor/                  # Mentor list & management
│   │   ├── mentorDetail/            # Individual mentor profile
│   │   ├── progressTracking/        # Progress entry & management
│   │   ├── search/                  # Global search (cmdk)
│   │   ├── studentDetail/           # Individual student profile
│   │   ├── students/                # Student list & table
│   │   └── upload/                  # Image upload hooks
│   ├── lib/
│   │   ├── api.ts                    # Axios instance configuration
│   │   └── react-query.ts           # QueryClient configuration
│   ├── pages/                        # Page-level route components
│   ├── stores/
│   │   ├── authStore.ts              # Authentication state (Zustand)
│   │   └── sidebarStore.ts           # Sidebar toggle state (Zustand)
│   ├── styles/
│   │   └── globals.css               # Global styles & Tailwind config
│   ├── utils/
│   │   └── cn.ts                     # clsx + tailwind-merge helper
│   ├── validations/
│   │   ├── auth.ts                   # Login/auth Zod schemas
│   │   ├── mentor.ts                # Mentor form Zod schemas
│   │   └── student.ts               # Student form Zod schemas
│   └── main.tsx                      # Application entry point
├── index.html                        # HTML template
├── vite.config.ts                    # Vite + TailwindCSS plugin config
├── tsconfig.json                     # TypeScript base config
├── tsconfig.app.json                 # App-specific TS config (path aliases)
├── eslint.config.js                  # ESLint flat config
├── package.json                      # Dependencies & scripts
└── .example.env                      # Environment variable template
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/mosque-tahfidz-management.git
cd mosque-tahfidz-management

# Install dependencies
npm install
# or
pnpm install
```

### Environment Variables

Copy the example file and set your backend API URL:

```bash
cp .example.env .env
```

| Variable             | Description                      | Example                                 |
| -------------------- | -------------------------------- | --------------------------------------- |
| `VITE_API_BASE_URL`  | Backend API base URL             | `http://localhost:3010/api/v1`          |

### Running the Dev Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

To expose on your local network:

```bash
npm run dev -- --host
```

### Building for Production

```bash
npm run build
```

The production bundle will be output to the `dist/` directory.

---

## Pages & Routes

| Path               | Page               | Auth Required | Description                         |
| ------------------ | ------------------ | ------------- | ----------------------------------- |
| `/login`           | LoginPage          | ❌            | User login                          |
| `/`                | DashboardPage      | ✅            | Overview stats & weekly charts      |
| `/students`        | StudentsPage       | ✅            | Student list with table & filters   |
| `/students/add`    | AddStudentPage     | ✅            | Create new student form             |
| `/students/:id`    | StudentDetailPage  | ✅            | Individual student profile          |
| `/mentor`          | MentorPage         | ✅            | Mentor list                         |
| `/mentor/add`      | AddMentorPage      | ✅            | Create new mentor form              |
| `/mentor/:id`      | MentorDetailPage   | ✅            | Individual mentor profile           |
| `/progress`        | ProgressPage       | ✅            | Record memorization progress        |
| `/history`         | HistoryPage        | ✅            | Browse past progress records        |
| `/search`          | SearchPage         | ✅            | Global entity search                |
| `/settings`        | SettingsPage       | ✅            | User settings                       |

All authenticated routes are wrapped inside the `AppLayout` component which provides the sidebar, header, and mobile navigation.

---

## Feature Modules

Each feature module under `src/features/` follows a consistent internal structure:

| Directory      | Contents                                       |
| -------------- | ---------------------------------------------- |
| `components/`  | Feature-specific UI components                 |
| `hooks/`       | TanStack Query hooks for API calls             |
| `types/`       | TypeScript interfaces and type definitions     |
| `constants/`   | Feature-scoped constants                       |
| `utils/`       | Feature-scoped helper functions                |

### Module Overview

| Module              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `auth`              | Login form, authentication hooks, session management     |
| `dashboard`         | Summary statistics cards, weekly activity charts         |
| `students`          | Student table (TanStack Table), filters, search          |
| `studentDetail`     | Individual student profile and progress history          |
| `mentor`            | Mentor list, CRUD operations                             |
| `mentorDetail`      | Mentor profile with assigned students                    |
| `progressTracking`  | Progress entry forms, bulk creation, progress management |
| `search`            | Command palette search across entities (cmdk)            |
| `activityLog`       | Admin-only audit log viewer                              |
| `upload`            | Image upload hooks (Cloudinary integration)              |

---

## State Management

| Store          | Library        | Purpose                                    |
| -------------- | --------       | ------------------------------------------ |
| `authStore`    | Zustand        | User session, authentication state         |
| `sidebarStore` | Zustand        | Sidebar open/close toggle                  |
| Server state   | TanStack Query | API data caching, sync, and mutations      |

---

## Scripts

| Command           | Description                                |
| ----------------- | ------------------------------------------ |
| `npm run dev`     | Start Vite dev server                      |
| `npm run build`   | Type-check and build for production        |
| `npm run preview` | Preview the production build locally       |
| `npm run lint`    | Run ESLint across the project              |

---

## License

This project is proprietary. All rights reserved.
