
Objetivo: eliminar o único erro que ainda derruba o `yarn lint` (os 54 `warnings` de `any` não bloqueiam CI).

Plano curto (próximo patch):
1) Ajustar somente o bloco de imports em `src/Socket/messages-recv.ts` para ficar no padrão upstream/exato do projeto.
2) Rodar validação local (`yarn lint`) antes de subir.
3) Push único e reexecução do workflow “Linting Check”.

O que corrigir no arquivo:
- Remover a linha em branco entre `import Long from 'long'` e `import { proto } ...`.
- Reverter para import único de `../WABinary` (com `type BinaryNode` inline), em vez de duas declarações separadas.

Formato esperado no topo (essência):
- `import Long from 'long'`
- `import { proto } from '../../WAProto/index.js'`
- ...
- `import { areJidsSameUser, type BinaryNode, binaryNodeToString, ... } from '../WABinary'`

Por que isso:
- O erro atual é `simple-import-sort/imports` (1 erro fixável).
- Esse rule está sensível ao layout do bloco de imports; no seu repo ele passa com o padrão upstream sem quebra extra entre imports e sem split desnecessário do mesmo módulo.
- “2 errors” no resumo do GitHub normalmente é: 1 erro real do eslint + 1 erro de job (`exit code 1`).

Validação final (obrigatória):
- `yarn eslint src/Socket/messages-recv.ts --fix` (opcional, para confirmar arranjo automático)
- `yarn lint` (esperado: 0 errors, warnings podem continuar)
- subir e confirmar Action verde.

Detalhe técnico (para você saber o que ignora):
- Warnings `@typescript-eslint/no-explicit-any` continuam aparecendo e não bloqueiam merge nesse config atual.
