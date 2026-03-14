

## Fix: Import formatting in `src/Utils/generics.ts`

Two errors remain, both on the same file:

1. **`simple-import-sort/imports`** — needs a blank line between external packages and relative imports (as seen in `messages-recv.ts`)
2. **`prettier/prettier`** — the `../Types` import on line 5 must be multi-line with tabs, not single-line

### Change

**`src/Utils/generics.ts`** lines 1-7 → replace with:

```ts
import { Boom } from '@hapi/boom'
import { createHash, randomBytes } from 'crypto'
import type Long from 'long'

import { proto } from '../../WAProto/index.js'
import {
	DisconnectReason,
	type BaileysEventEmitter,
	type BaileysEventMap,
	type ConnectionState,
	type WACallUpdateType,
	type WAMessageKey,
	type WAVersion
} from '../Types'
import { type BinaryNode, getAllBinaryNodeChildren, jidDecode } from '../WABinary'
import { sha256 } from './crypto'
```

Key differences from current code:
- **Blank line** after `long` (separates external from internal imports)
- **Multi-line** format for the `../Types` import with tab indentation
- This matches the exact pattern used in `messages-recv.ts` which passes lint

