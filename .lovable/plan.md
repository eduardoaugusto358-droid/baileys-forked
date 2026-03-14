

## Plan: Apply PR #2334 — Placeholder resend for CTWAads messages

Three files to modify, exactly matching both commits from the PR.

---

### 1. `src/Defaults/index.ts`

Add two new constants after `WA_DEFAULT_EPHEMERAL` (line 23):

```typescript
/** Status messages older than 24 hours are considered expired */
export const STATUS_EXPIRY_SECONDS = 24 * 60 * 60

/** WA Web enforces a 14-day maximum age for placeholder resend requests */
export const PLACEHOLDER_MAX_AGE_SECONDS = 14 * 24 * 60 * 60
```

---

### 2. `src/Socket/messages-recv.ts`

**Import changes (line 6):**
- Add `PLACEHOLDER_MAX_AGE_SECONDS` and `STATUS_EXPIRY_SECONDS` to Defaults import

**Import changes (lines 19-43):**
- Add `toNumber` to Utils import

**`requestPlaceholderResend` (lines 140-150):**
- Add `msgData?: Partial<WAMessage>` parameter
- Store `msgData || true` instead of `true` in cache
- Change `delay(5000)` to `delay(2000)`

**CIPHERTEXT block (lines 1224-1276):**
Replace the current handling of `NO_MESSAGE_FOUND_ERROR_TEXT` (which just returns `sendMessageAck`) with:
- Check `unavailable` node type — skip `bot_unavailable_fanout`, `hosted_unavailable_fanout`, `view_once_unavailable_fanout`
- Check 14-day max age using `PLACEHOLDER_MAX_AGE_SECONDS`
- Build `cleanKey` + `msgData`, call `requestPlaceholderResend(cleanKey, msgData)`
- Emit `messages.update` stub on success (only if requestId !== `'RESOLVED'`)
- ACK and **fall through** (no return) so stub gets upserted
- Move existing retry logic (PreKey errors, expired status) into `else` block

---

### 3. `src/Utils/process-message.ts`

**PDO response handler (lines 340-361):**
- Remove top-level `placeholderResendCache?.del(response.stanzaId!)`
- Use `response.peerDataOperationResult || []` with null check on `retryResponse?.webMessageInfoBytes`
- Wrap decode in try/catch
- Retrieve cached metadata from `placeholderResendCache` by message ID
- Delete cache by message ID (not stanza ID)
- Merge cached metadata with decoded message before emitting
- Remove `setTimeout` wrapper — emit directly
- Add warn log on decode failure

