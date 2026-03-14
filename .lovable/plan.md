

## Fix: Import sort error in `src/Utils/generics.ts`

The `simple-import-sort/imports` rule is still failing. The issue is having two separate imports from `'../Types'` (a type import and a value import). Merging them into a single import statement will fix the sort error.

### Change

**`src/Utils/generics.ts`** lines 6-14 — merge the two `../Types` imports into one:

```ts
import {
	DisconnectReason,
	type BaileysEventEmitter,
	type BaileysEventMap,
	type ConnectionState,
	type WACallUpdateType,
	type WAMessageKey,
	type WAVersion
} from '../Types'
```

This removes the separate `import { DisconnectReason } from '../Types'` line and combines everything into a single import, which `simple-import-sort` prefers.

