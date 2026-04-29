# Mis Deberes (React + Vite + Tailwind)

React + TypeScript project configured with `strict: true`.

## Requirements

- Node.js 18+ (20+ recommended)
- npm

## Installation

```bash
npm install
```

## Development

Start the local dev server:

```bash
npm run dev
```

Vite will print a local URL (for example `http://localhost:5173`).

## Production build

```bash
npm run build
```

Generated files are written to `dist/`.

## Build preview

```bash
npm run preview
```

## Testing

### Unit + integration (Vitest + Testing Library)

Run the test suite once:

```bash
npm run test
```

Watch mode for development:

```bash
npm run test:watch
```

Coverage (generates `text` and `html` reports):

```bash
npm run test:coverage
```

### UI functional E2E (Playwright)

Run E2E tests:

```bash
npm run e2e
```

Interactive mode:

```bash
npm run e2e:ui
```

## Recommended CI checklist

- Run `npm run test` on every Pull Request.
- Run `npm run test:coverage` and publish the HTML coverage artifact.
- Run `npm run build` to prevent packaging regressions.
- Run `npm run e2e` on the main branch and/or nightly.
- Block merges if any test or build job fails.

## Key structure

- `src/App.tsx`: main app component.
- `src/main.tsx`: React entry point.
- `src/index.css`: base styles + Tailwind.
- `tailwind.config.js`: Tailwind configuration.
- `vite.config.ts`: Vite configuration.
- `src/test/setup.ts`: global Testing Library setup.
- `e2e/`: Playwright UI functional tests.

