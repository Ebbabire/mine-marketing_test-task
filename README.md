# Social Media Dashboard (Frontend Test Task)

A Vite + React + TypeScript social media dashboard showcasing **RTK Query**, **RHF + Zod**, and a **mock backend** with realistic async behavior.

### Tech stack
- **Build**: Vite + React + TypeScript
- **State**: Redux Toolkit + RTK Query
- **UI**: Tailwind (utility styling), Bootstrap 5 (grid via CDN), MUI (components)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Tests**: Vitest + React Testing Library

---

## Getting started

### Install

```bash
npm install
```

### Run the app

```bash
npm run dev
```

### Run tests

```bash
# watch mode
npm test

# CI mode (single run)
npm run test:run
```

---

## What’s implemented

### Dashboard
- **Connected Accounts** grid with modern card UI
- **Add / Edit** account flow (MUI Dialog + React Hook Form + Zod)
- **Delete** confirmation dialog
- **Loading skeleton** state to avoid layout shift and improve perceived performance
- Stats header cards + a demo chart card

### Data layer (mock backend)
This project intentionally runs without a real backend. Instead, it uses a small in-memory service that behaves like an API:
- `src/mocks/api.ts`: CRUD functions with a **500ms `setTimeout` delay** to simulate network latency
- `src/mocks/data/data.ts`: initial mock dataset

This lets us build and validate production-style UI behavior (loading, error handling, async flows) without standing up a server.

---

## Architecture decisions (the “why”)

### RTK Query instead of `useEffect` fetching
RTK Query is used for “server state” because it gives us production-grade behavior for free:
- **Caching + request deduping**: multiple components can request the same data without duplicate calls
- **Declarative refetching**: mutations invalidate tags → queries refresh automatically
- **Standardized async state**: consistent `isLoading`, `isError`, and `error` handling across the app

See: `src/features/dashboard/slices/dashboardApi.ts`

### React Hook Form + Zod (and why Controller with MUI)
MUI inputs are controlled components. RHF is optimized for uncontrolled inputs. We use **`Controller`** to bridge the two so:
- RHF remains the source of truth for form state and validation
- MUI receives the controlled `value` / `onChange` wiring it expects

See: `src/features/dashboard/components/AddEditAccountModal.tsx` and `src/utils/validation.ts`

### Styling: Tailwind + Bootstrap grid + MUI components
- **Bootstrap**: used strictly for the grid system (fast, familiar, predictable breakpoints)
- **MUI**: used for accessible building blocks (Dialog, buttons, AppBar, etc.)
- **Tailwind**: used for rapid layout/typography polish and micro-interactions

This combination is deliberate (per task requirements) and keeps each tool in its “sweet spot”.

---

## Folder structure

```
src/
  app/                         # Redux store + typed hooks
  components/                  # Shared layout/components
  features/
    dashboard/                 # Dashboard feature boundary
      components/              # Feature-specific UI
      slices/                  # RTK Query API slice (and future slices)
  mocks/                       # In-memory mock backend
  types/                       # Shared TypeScript types
  utils/                       # Validation + constants
tests/                         # All tests live outside src/
```

---

## Testing approach (minimal but strong)

The tests focus on “high value” regression points:
- **Schema unit tests**: `tests/utils/validation.test.ts`
- **Modal integration tests** (RTL): `tests/features/dashboard/AddEditAccountModal.test.tsx`
  - blocks duplicate platform creation
  - successful submit calls mutation + closes modal

The intent is to prove correctness where regressions are expensive: validation + modal flows.

---

## If I had more time (follow-ups)
- Add an a11y audit pass (focus management, ARIA labeling, keyboard navigation)
- Add more integration tests (delete confirm flow, edit flow, dashboard list refresh)

