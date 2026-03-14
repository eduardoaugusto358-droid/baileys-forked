

## Fix: Lint errors (11 errors blocking CI)

There are 3 issues causing the 11 lint errors:

### 1. Test files not excluded from ESLint
The `tsconfig.json` now excludes `src/__tests__`, but ESLint still tries to lint those files with `parserOptions.project`. Need to add `src/__tests__` to the `globalIgnores` in `eslint.config.mts`.

**`eslint.config.mts`** — add to globalIgnores array:
```
"src/__tests__/**",
```

### 2. Import sort error in `src/Utils/generics.ts`
The `import type Long from 'long'` we added is not in the correct sort order. Type imports should come after regular imports per `simple-import-sort`. Fix: reorder imports so type imports are grouped correctly.

**`src/Utils/generics.ts`** lines 1-6 — reorder to:
```ts
import { Boom } from '@hapi/boom'
import { createHash, randomBytes } from 'crypto'
import type Long from 'long'
import { proto } from '../../WAProto/index.js'
```

### 3. Import sort error in `src/Socket/messages-recv.ts`
This is a pre-existing error from upstream — imports are not sorted per `simple-import-sort`. Fix: reorder the imports alphabetically by source.

**`src/Socket/messages-recv.ts`** lines 1-70 — reorder imports to satisfy `simple-import-sort/imports` (move `@cacheable/node-cache` before `@hapi/boom`, group type imports properly, sort by module path).

### Summary
- 9 test file errors → fixed by excluding from ESLint
- 2 import sort errors → fixed by reordering imports
- 54 warnings → not blocking, all pre-existing from upstream

