# 💎 Jade

**The first stone for joyful builders.**  
A solid, reliable, ready-to-dev full-stack starter designed to scale with ambitious projects.

Jade provides a polished foundation with strong defaults, modern tooling, and a clean monorepo architecture — so you can focus on building features, not wiring infrastructure.

## Getting started

To get this party started locally, install the dependencies:

```sh
pnpm install
```

Start the API server:

```sh
pnpm -C apps/api dev
```

Start the frontend (in a different terminal window):

```sh
pnpm -C apps/web dev
```

To run all tests (unit + e2e):

```sh
pnpm tests
```

## What’s included

Jade is a pnpm-powered monorepo built with Turborepo, designed for type-safe, full-stack development.

It ships with:

- a backend API
- a frontend application
- a shared design system
- shared tooling and configs
- testing at multiple levels
- CI ready out of the box

## Tooling & stack

- Monorepo: [Turborepo](https://turborepo.com/docs)
- Package manager: [pnpm](https://pnpm.io/)
- Backend: Node.js, Fastify
- Frontend: Vite, React, Tailwind CSS, TanStack Query
- Design system: React, Tailwind CSS, Storybook
- Type safety: Shared TypeScript configs & API schemas
- Testing:
  - Unit & integration tests (API)
  - End-to-end tests with Playwright
- Code quality: ESLint, Prettier
- CI: GitHub Actions (typecheck, lint, format, tests on every PR)

## Project structure

```text
├── apps/
│   ├── api/                # Backend API (Node.js + Fastify)
│   └── web/                # Frontend app (Vite + React + Tailwind + TanStack Query)
│
├── packages/
│   ├── api-client/         # Shared data schemas & API types (API ↔ frontend)
│   ├── css-config/         # Design tokens & Tailwind theme configuration
│   ├── ui/                 # Design system (React + Tailwind + Storybook)
│   ├── eslint-config/      # Shared ESLint configuration
│   ├── typescript-config/  # Shared TypeScript configuration
│   ├── typescript-utils/   # Reusable TypeScript utilities
│   └── tests-e2e/          # End-to-end tests (Playwright)
│
├── scripts/                # Utility scripts (e.g. E2E test runner)
├── .github/                # CI workflows (typecheck, lint, format, tests)
│
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Philosophy

Jade starters are meant to be kept, not thrown away after an MVP.

The goal is to provide:

- strong, opinionated defaults
- clear separation of concerns
- scalable patterns that don’t fight you later
- a joyful developer experience from day one

Hope you'll enjoy building on Jade.
