

## Corrigir 12 erros de lint nos 3 arquivos editados

Todos os erros são de formatação/estilo — zero mudança de lógica.

### 1. `src/Socket/Client/websocket.ts` (1 erro)
**Linha 68**: `padding-line-between-statements` — precisa de linha em branco antes de `this.socketListeners.clear()`

### 2. `src/Utils/event-buffer.ts` (2 erros)
**Linha 85**: `prefer-const` — trocar `let` por `const` em `activeBufferedTimeouts`
**Linha 242**: `padding-line-between-statements` — adicionar linha em branco antes de `activeBufferedTimeouts.clear()`

### 3. `src/Socket/socket.ts` (9 erros)
**Linha 660**: `prettier/prettier` — colocar `Promise.race([ws.close(), new Promise<void>(...)])` em uma só linha
**Linha 800**: `padding-line-between-statements` — adicionar linha em branco antes de `const sendPassiveIq`
**Linha 835**: `no-floating-promises` — adicionar `void` antes de `end(...)`
**Linha 935**: `no-floating-promises` — adicionar `void` antes de `end(err)`
**Linha 970**: `no-floating-promises` — adicionar `void` antes de `end(new Boom(...))`
**Linha 1003**: `no-floating-promises` — adicionar `void` antes de `end(error)`
**Linha 1063**: `no-floating-promises` — adicionar `void` antes de `end(new Boom(...))`
**Linha 1068**: `no-floating-promises` — adicionar `void` antes de `end(new Boom(...))`
**Linha 1072**: `no-floating-promises` — adicionar `void` antes de `end(new Boom(...))`

### Nota
Os `no-floating-promises` acontecem porque `end()` é async e o lint exige `void end(...)` quando o resultado não é awaited. Vários desses já estavam no código original sem `void` — o lint agora os detecta porque mudamos `end()`. Vamos corrigir todos.

