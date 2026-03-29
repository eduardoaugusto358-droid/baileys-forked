

## Adicionar suporte ao tipo de encriptação `msmsg`

Fix de 1 linha no switch de decriptação.

### Alteração

**`src/Utils/decode-wa-message.ts`** — linha 287:

Antes:
```ts
case 'pkmsg':
case 'msg':
```

Depois:
```ts
case 'pkmsg':
case 'msg':
case 'msmsg':
```

O `msmsg` é tratado exatamente como `msg`/`pkmsg` — passa pela mesma chamada `repository.decryptMessage()` com o `e2eType` como parâmetro. Zero risco, zero breaking change.

### Por que funciona
O `msmsg` é um tipo de mensagem Signal que o WhatsApp usa em certas conversas LID. A decriptação é idêntica a `msg` — a diferença é apenas no nome do tipo no envelope. O `decryptMessage` do libsignal já sabe lidar com ele internamente.

### Resultado esperado
Mensagens que antes eram descartadas silenciosamente (gerando o comportamento de "mensagem fantasma") passarão a ser decriptadas e emitidas normalmente via `messages.upsert`.

