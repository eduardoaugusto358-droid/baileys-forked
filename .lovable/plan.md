

## Implementar melhorias de estabilidade de conexão (PR #2405)

Aplicar as correções do PR #2405 do upstream nos 5 arquivos do fork. O erro "Script not found dev" é irrelevante — o Lovable vai mostrar erro no preview mas o código será commitado ao GitHub corretamente.

### Alterações

**1. `src/Types/Events.ts`** (linha 130)
- Tornar parâmetro `event` opcional em `removeAllListeners`:
```ts
removeAllListeners<T extends keyof BaileysEventMap>(event?: T): void
```

**2. `src/Socket/Client/websocket.ts`**
- Adicionar `socketListeners: Map<string, (...args: any[]) => void>` para rastrear handlers
- No `connect()`: armazenar handler no map antes de registrar no socket
- No `close()`: remover listeners individualmente do socket nativo antes de fechar, adicionar close com Promise + timeout de 5s

**3. `src/Utils/noise-handler.ts`**
- Adicionar `MAX_BUFFER_SIZE = 10 * 1024 * 1024` (10MB)
- No `decodeFrame`: checar `inBytes.length > MAX_BUFFER_SIZE` e limpar se exceder
- Adicionar método `destroy()` no objeto retornado que limpa `inBytes`, `sentIntro`, etc.

**4. `src/Utils/event-buffer.ts`**
- Adicionar `activeBufferedTimeouts: Set<NodeJS.Timeout>` e `flushPendingTimeout`
- No `createBufferedFunction`: rastrear timeouts no Set
- No `removeAllListeners`: limpar todos os timers, resetar estado do buffer, limpar `historyCache` e `data`

**5. `src/Socket/socket.ts`**
- Adicionar `consecutivePingFailures = 0` e `MAX_PING_FAILURES = 3`
- `startKeepAliveRequest`: trocar `setInterval` por `setTimeout` recursivo, rastrear falhas, hard timeout `2x + 5s`
- `end()`: usar `clearTimeout` (não `clearInterval`), `ws.removeAllListeners()`, flush do event buffer, `noise.destroy()`, `ws.close()` com timeout 5s via `Promise.race`, `ev.removeAllListeners()` no final (sem parâmetro)
- Adicionar getter `connectionHealth` no objeto retornado

### Nota sobre o preview
O Lovable vai mostrar erro "Script not found dev" porque o projeto é uma biblioteca sem servidor. Isso não afeta o push ao GitHub — as alterações vão aparecer no repo normalmente.

