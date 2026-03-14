

## Fix: Restaurar estrutura original dos imports em `generics.ts`

### Causa raiz

O arquivo **original do upstream** tem o `const baileysVersion` **NO MEIO** dos imports — isso divide os imports em dois blocos separados, e o `simple-import-sort` trata cada bloco independentemente:

```text
// ORIGINAL UPSTREAM (funciona):
import { Boom } from '@hapi/boom'
import { createHash, randomBytes } from 'crypto'
import { proto } from '../../WAProto/index.js'
const baileysVersion = [2, 3000, ...]        ← QUEBRA o bloco
import type { ... } from '../Types'
import { DisconnectReason } from '../Types'
import { type BinaryNode, ... } from '../WABinary'
import { sha256 } from './crypto'
```

Nós movemos o `const baileysVersion` para depois de todos os imports, criando um ÚNICO bloco contínuo. Isso mudou como o `simple-import-sort` processa a ordenação e causou o erro persistente.

### Alteração

**`src/Utils/generics.ts`** — linhas 1-10: restaurar a estrutura original com `const baileysVersion` entre os blocos, adicionando o `import type Long` que precisamos:

```ts
import { Boom } from '@hapi/boom'
import { createHash, randomBytes } from 'crypto'
import type Long from 'long'
import { proto } from '../../WAProto/index.js'

const baileysVersion = [2, 3000, 1027934701]

import type {
	BaileysEventEmitter,
	BaileysEventMap,
	ConnectionState,
	WACallUpdateType,
	WAMessageKey,
	WAVersion
} from '../Types'
import { DisconnectReason } from '../Types'
import { type BinaryNode, getAllBinaryNodeChildren, jidDecode } from '../WABinary'
import { sha256 } from './crypto'
```

Diferenças do arquivo atual:
- `const baileysVersion` volta para entre os imports (como no upstream)
- Imports de `../Types` ficam em formato multi-line (como no upstream)
- `import type Long` fica no primeiro bloco com os outros pacotes externos
- A linha `const baileysVersion = [...]` que está na linha 10 atual é removida (já está no meio dos imports)

Isso replica exatamente a estrutura do repositório oficial que passa no lint deles.

