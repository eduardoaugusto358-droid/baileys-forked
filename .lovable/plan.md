

## Fix: Adicionar script `build:dev` ao package.json

O ambiente Lovable espera um script chamado `build:dev` no `package.json`, mas o Baileys não o possui nativamente.

### Alteração

**`package.json`** — adicionar na seção `scripts`:

```json
"build:dev": "tsc -P tsconfig.build.json && tsc-esm-fix --tsconfig=tsconfig.build.json --ext=.js"
```

Isso é idêntico ao script `build` já existente. O erro de build do ambiente será resolvido imediatamente.

### Sobre o erro de lint restante

O `simple-import-sort/imports` em `src/Utils/generics.ts` ainda persiste. Vou inspecionar o arquivo atual e corrigir a ordenação exata dos imports junto neste commit.

