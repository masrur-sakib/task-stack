# Task Manager

A modern, responsive task management application built with Next.js 14 and TypeScript. It features a Kanban board for visualizing tasks by status, a project sidebar for switching between projects, drag-and-drop task status updates, and a secure mock authentication system.

---

## Live Demo Credentials

| Field    | Value            |
| -------- | ---------------- |
| Email    | `admin@demo.com` |
| Password | `password123`    |

---

## Features

- **Authentication** — Secure login and logout with mock credentials stored in localStorage
- **Project List** — Sidebar displaying all projects with active project highlighted
- **Kanban Board** — Three-column board (To Do, In Progress, Done) per project
- **Drag & Drop** — Drag task cards between columns to update their status
- **Responsive UI** — Works on desktop and mobile screens
- **Static Task Data** — Tasks loaded from a local JSON file for zero-latency access
- **React Query** — Efficient data fetching with caching for the project list API
- **Zustand State** — Lightweight, predictable global state management

---

## Tech Stack

| Technology                                   | Version | Purpose                                        |
| -------------------------------------------- | ------- | ---------------------------------------------- |
| [Next.js](https://nextjs.org)                | 14+     | React framework, App Router, API routes        |
| [TypeScript](https://www.typescriptlang.org) | 5+      | Type safety across the entire codebase         |
| [Tailwind CSS](https://tailwindcss.com)      | 4+      | Utility-first styling                          |
| [Zustand](https://zustand-demo.pmnd.rs)      | 5+      | Client-side global state management            |
| [TanStack Query](https://tanstack.com/query) | 5+      | Server state, caching, loading/error handling  |
| [Axios](https://axios-http.com)              | 1+      | HTTP client with request/response interceptors |

---

## Folder Structure

```
task-stack/
├── public/                         # Static assets
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx        # Login page  →  /login
│   │   ├── (dashboard)/
│   │   │   └── dashboard/
│   │   │       └── page.tsx        # Dashboard   →  /dashboard
│   │   ├── layout.tsx              # Root layout, wraps all pages in Providers
│   │   ├── page.tsx                # Root route, redirects to /dashboard
│   │   └── providers.tsx           # ReactQuery + Zustand bootstrap (client-side only)
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginForm.tsx       # Email/password login form
│   │   ├── kanban/
│   │   │   ├── KanbanBoard.tsx     # Renders three columns for the selected project
│   │   │   ├── KanbanColumn.tsx    # Individual column with drag-and-drop drop zone
│   │   │   └── TaskCard.tsx        # Draggable task card showing title and priority
│   │   ├── projects/
│   │   │   ├── ProjectItem.tsx     # Single project row with active highlight
│   │   │   └── ProjectList.tsx     # Sidebar list of all projects
│   │   └── ui/
│   │       ├── Badge.tsx           # Priority badge (high / medium / low)
│   │       ├── EmptyState.tsx      # Empty column placeholder
│   │       └── Spinner.tsx         # Loading spinner
│   │
│   ├── data/
│   │   └── tasks.json              # Static task data for all projects
│   │
│   ├── hooks/
│   │   ├── useProjects.ts          # React Query hook — fetches project list from API
│   │   └── useTasks.ts             # Reads tasks from Zustand store
│   │
│   ├── lib/
│   │   └── auth.ts                 # Mock login/logout, localStorage read/write helpers
│   │
│   ├── services/
│   │   └── api.ts                  # Axios instance with auth interceptors + projectApi
│   │
│   ├── store/
│   │   └── useAppStore.ts          # Zustand store: user, selectedProject, tasks, actions
│   │
│   └── types/
│       └── index.ts                # All TypeScript interfaces and type definitions
│
├── .gitignore
├── next.config.ts
├── package.json
├── tailwind.config.ts              # Not needed for Tailwind v4 (auto-detected)
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

Check your versions:

```bash
node -v
npm -v
```

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/task-stack.git
cd task-stack
```

**2. Install dependencies**

```bash
npm install
```

**3. Run the development server**

```bash
npm run dev
```

**4. Open in your browser**

```
http://localhost:3000
```

You will be redirected to `/login`. Use the demo credentials to sign in.

### Build for Production

```bash
npm run build
npm start
```

---

---

## API Reference

### Projects

| Method | Endpoint                                     | Description        |
| ------ | -------------------------------------------- | ------------------ |
| GET    | `https://api.mockfly.dev/mocks/.../projects` | Fetch all projects |

### Tasks

Tasks are served from a local static file:

```
src/data/tasks.json
```

No network request is made for tasks — they are loaded into Zustand on app mount.

---

## Authentication

Authentication is implemented as a **mock system** suitable for demos and interviews. Credentials are hardcoded in `src/lib/auth.ts`.

| Email          | Password    | Name       |
| -------------- | ----------- | ---------- |
| admin@demo.com | password123 | Admin User |
| dev@demo.com   | password123 | Dev User   |

On login, a Base64-encoded user object is stored in `localStorage` as `auth_token`. The Zustand store rehydrates this on page load.

---

## State Management

The application uses two state layers:

| Layer        | Tool        | What it manages                                                    |
| ------------ | ----------- | ------------------------------------------------------------------ |
| Server state | React Query | Project list fetching, caching, loading and error states           |
| Client state | Zustand     | Logged-in user, selected project, all tasks, drag-and-drop updates |

```
User action
    │
    ▼
Zustand store  ←──  updateTaskStatus(taskId, newStatus)
    │
    ▼
useTasks hook  ──►  KanbanBoard  ──►  KanbanColumn  ──►  TaskCard
```

---

## Drag and Drop

Drag and drop is implemented using the **native HTML5 Drag and Drop API** — no external library required.

- `TaskCard` sets `draggable={true}` and writes the `taskId` to `dataTransfer` on drag start
- `KanbanColumn` listens for `onDragEnter`, `onDragLeave`, `onDragOver`, and `onDrop`
- A `dragCounter` ref prevents flickering caused by `dragLeave` firing on child elements
- On drop, `updateTaskStatus` is called in Zustand which instantly moves the card

---

## Key Design Decisions

| Decision           | Choice                         | Reason                                                           |
| ------------------ | ------------------------------ | ---------------------------------------------------------------- |
| App Router         | Next.js 14 App Router          | Modern routing with layouts, route groups, and server components |
| Route groups       | `(auth)` and `(dashboard)`     | Organize pages without affecting URLs, support separate layouts  |
| No config file     | Tailwind v4                    | v4 auto-detects files — `tailwind.config.ts` is not needed       |
| Local tasks        | `tasks.json`                   | Zero latency, no CORS issues, easy to extend                     |
| Zustand over Redux | Zustand                        | No boilerplate, no Provider needed, simple API                   |
| Axios interceptors | Centralized in `api.ts`        | One place to attach auth headers and handle 401 globally         |
| `mounted` guard    | `useState(false)` in dashboard | Prevents SSR/client hydration mismatch from localStorage reads   |
| Drag counter ref   | `useRef(0)` in KanbanColumn    | Prevents flickering when dragging over child elements            |

---

## Scripts

| Script      | Command         | Description                        |
| ----------- | --------------- | ---------------------------------- |
| Development | `npm run dev`   | Start dev server at localhost:3000 |
| Build       | `npm run build` | Create optimised production build  |
| Start       | `npm start`     | Run the production build           |
| Lint        | `npm run lint`  | Run ESLint across the project      |

---

## Future Improvements

- Add real authentication with [NextAuth.js](https://next-auth.js.org)
- Persist task status changes to a backend or database
- Add ability to create, edit, and delete tasks
- Add task due dates and assignees
- Implement smooth drag animations with [Framer Motion](https://www.framer.com/motion)
- Add unit and integration tests with [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com)
- Dark mode support
