# Repository Guidelines

## Project Structure & Module Organization

This is the TypeScript SDK package for Strapi APIs. Source code lives in `src/`, with the public entry in `src/index.ts` and implementation under `src/lib/`. Tests live in `test/`, for example `test/lib/strapi.test.ts`. Generated package output goes to `dist/`; do not edit it manually. Docs live in `docs/`; release helpers live in `scripts/`.

## Product Context

This SDK is a way to avoid repeated Strapi HTTP client setup. Keep changes focused on typed REST requests, CRUD helpers, authentication, provider login URLs, and JWT storage through cookies or `localStorage`. Current docs target Strapi v5, so prefer repo code over older planning notes.

## Build, Test, and Development Commands

Use Node 22 for development; run `nvm use` from the repo root to load `.nvmrc`.

- `yarn start`: runs Rollup in watch mode for local SDK development.
- `yarn build`: removes `dist/` and builds CommonJS, ESM, and type outputs.
- `yarn lint`: runs ESLint over `.ts` and `.js` files.
- `yarn lint:fix`: applies automatic ESLint fixes.
- `yarn test:unit`: runs the Jest test suite.
- `yarn test`: runs build, lint, and unit tests in sequence.
- `yarn clean`: removes generated `bin`, `dist`, and `coverage` folders.

## Coding Style & Naming Conventions

Use TypeScript for SDK changes. Follow `.editorconfig`: 2-space indentation, LF line endings, UTF-8, trimmed trailing whitespace, and final newline. ESLint uses `@typescript-eslint/recommended` plus type-aware rules. Prefer camelCase for functions/variables, PascalCase for exported types/interfaces, and shared types in `src/lib/types.ts`. Keep public exports stable through `src/index.ts`.

## Testing Guidelines

Tests use Jest with `ts-jest` and `jsdom`. Name files `*.test.ts` and place them in `test/`, matching the source area. Coverage is enabled in `jest.config.js`. Add or update tests for request construction, auth token handling, storage modes, response handling, and type-facing behavior. Run `yarn test` before opening a PR.

## Commit & Pull Request Guidelines

Commits follow Conventional Commits enforced by Commitlint, for example `fix(types): handle optional fields` or `docs: update usage examples`. Use `yarn commit` to launch Commitizen. Open PRs against `develop` unless maintainers direct otherwise. In PRs, identify the change type, describe the problem and solution, link issues with `Resolves: #123`, and state whether docs/tests changed.

## Security & Configuration Tips

Do not commit secrets. Use `.env.example` as the only committed environment reference, and keep release credentials in untracked `.env` files. Treat `dist/`, `coverage/`, and docs build artifacts as generated output. When touching authentication, avoid logging JWTs.
