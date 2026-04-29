---
name: add-topics-exercises-tdd
description: Add new school topics or exercise types in this project using strict TDD. Use when the user asks to create a new tema, section, or exercise, or to extend generators/validators/UI flow while keeping Redux, architecture, and tests aligned.
---
# Add Topics/Exercises with TDD First

## Purpose
Use this workflow to add a new topic/section/exercise in `misdeberes` without regressions.

Hard rule: write failing tests first, then implement, then refactor.

## Project Map (what usually changes)
- Types and contracts: `src/features/app/types.ts`
- Domain generation: `src/domain/generators/exerciseGenerators.ts`
- Domain validation: `src/domain/validators/exerciseValidators.ts`
- State and navigation: `src/features/app/appSlice.ts`, `src/hooks/useExerciseController.ts`, `src/App.tsx`
- UI routing and screens:
  - `src/pages/ExercisesPage.tsx`
  - `src/pages/exercises/MathExercisesSection.tsx`
  - `src/pages/exercises/EnglishExercisesSection.tsx`
  - `src/pages/exercises/math/*` or `src/pages/exercises/english/*`
- Tests:
  - Unit: `src/domain/**/*.test.ts`, `src/features/**/*.test.ts`
  - Integration: `src/**/*.test.tsx`
  - E2E: `e2e/*.spec.ts`

## Workflow

Copy this checklist and keep it updated during execution:

```md
TDD progress:
- [ ] 1) Define contract change (types + section name)
- [ ] 2) Add/adjust unit tests (generators + validators) first
- [ ] 3) Run tests and confirm they fail for the new behavior
- [ ] 4) Implement minimal production code
- [ ] 5) Add/adjust integration tests (App/controller/actions)
- [ ] 6) Add/adjust Playwright E2E for user flow
- [ ] 7) Refactor safely (styles/tokens/duplication) with tests green
- [ ] 8) Run full verification suite
```

### 1) Define contract first
- Add or update section/exercise types in `src/features/app/types.ts`.
- Keep discriminated unions explicit (`type: '...'`) and consistent.
- If a new sidebar section exists, ensure `Section` union includes it.

### 2) Tests first (must fail)
- Start with domain unit tests:
  - Add cases to `exerciseGenerators.test.ts` for output invariants.
  - Add cases to `exerciseValidators.test.ts` for success/error paths.
- Then integration tests:
  - `useExerciseController.test.ts`: generation trigger + checking flow.
  - `App.test.tsx` and/or `ExerciseActions.test.tsx`: navigation/action behavior.
- If feature is user-facing, add E2E in `e2e/*.spec.ts`.

### 3) Implement minimal code
- Update generator and validator implementations.
- Wire section handling in `useExerciseController.ts` and section router components.
- Add UI component(s) only after domain tests define expected behavior.
- Reuse `src/styles/tokens.ts` and `src/styles/variants.ts` for consistency.

### 4) Refactor with protection
- Remove duplication only when tests are green.
- Preserve existing behavior and texts unless explicitly requested.

### 5) Verification (required)
Run all:

```bash
npx tsc --noEmit
npm run test
npm run test:coverage
npm run build
npm run e2e
```

If any command fails, fix and rerun until all pass.

## Quality Gates
- New behavior is covered by unit tests before implementation.
- Existing tests continue passing (no regressions).
- E2E covers at least one happy-path for the new section/exercise.
- No architecture shortcuts: domain logic stays in domain files, not page components.

## Naming and consistency rules
- Section IDs: lowercase keys matching `Section` union.
- Exercise type string must match everywhere (types, generator, validator, section router).
- Prefer small focused test cases over one large test.

## Example trigger requests
- "Añade un tema nuevo de matemáticas"
- "Create a new exercise type for English pronunciation"
- "Add section X and ensure TDD"
