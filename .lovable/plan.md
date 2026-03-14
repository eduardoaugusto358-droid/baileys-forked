

## Fix: `simple-import-sort/imports` em `messages-recv.ts`

### Diagnóstico

O `generics.ts` agora passa. O único erro restante é em `src/Socket/messages-recv.ts` linha 1:1 — mesma regra `simple-import-sort/imports`.

Olhando as linhas 53-70, o import de `../WABinary` mistura `type BinaryNode` inline com values:
```ts
import {
	areJidsSameUser,
	type BinaryNode,        // ← inline type misturado com values
	binaryNodeToString,
	...
} from '../WABinary'
```

O padrão do projeto (visto em todos os outros arquivos que passam) é separar `import type` de `import` quando vêm do mesmo módulo.

### Alteração

**`src/Socket/messages-recv.ts`** — separar o import de `../WABinary` em dois:

```ts
import type { BinaryNode } from '../WABinary'
import {
	areJidsSameUser,
	binaryNodeToString,
	getAllBinaryNodeChildren,
	getBinaryNodeChild,
	getBinaryNodeChildBuffer,
	getBinaryNodeChildren,
	getBinaryNodeChildString,
	isJidGroup,
	isJidNewsletter,
	isJidStatusBroadcast,
	isLidUser,
	isPnUser,
	jidDecode,
	jidNormalizedUser,
	S_WHATSAPP_NET
} from '../WABinary'
```

Isso segue o mesmo padrão de `../Types` (linhas 14-25) que já está separado em `import type` + `import` e passa no lint.

### Impacto
- Apenas formatação de imports, zero mudança funcional
- Warnings de `no-explicit-any` continuam (não bloqueiam CI)

