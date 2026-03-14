

## Fix: Exclude test files from tsconfig.json

All build errors are from test files (`src/__tests__/`) missing Jest type definitions. The fix is to exclude them from the main `tsconfig.json`, matching what `tsconfig.build.json` already does.

### Change

**`tsconfig.json` line 38** — update exclude:

```json
"exclude": ["node_modules", "src/__tests__"]
```

This is the standard approach — the upstream Baileys repo uses `tsconfig.build.json` (which already excludes tests) for compilation. Tests run via Jest with its own TypeScript config in `jest.config.ts`.

