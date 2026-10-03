# Dark Optimistic Oracle webapp Aleo call log

Generated: 2026-10-03T05:47:57.699Z.

> Generated automatically from the browser audit journal. Private Aleo record plaintext is redacted before persistence.

## 1. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

## 2. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:28:22.021Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:28:22.021Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

## 3. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.156Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:28:22.156Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 4. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:28:22.175Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:28:22.175Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 5. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.043Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:41:58.043Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  }
}
```

## 6. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:41:58.044Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:41:58.044Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  }
}
```

## 7. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.236Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:41:58.236Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 8. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:41:58.241Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:41:58.241Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 9. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.833Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 1,
  "timestamp": "2026-10-03T05:42:19.833Z",
  "callId": "aleo-call-1",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

## 10. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:19.834Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 2,
  "timestamp": "2026-10-03T05:42:19.834Z",
  "callId": "aleo-call-2",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  }
}
```

## 11. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.928Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-2`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_program`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 3,
  "timestamp": "2026-10-03T05:42:19.928Z",
  "callId": "aleo-call-2",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read deployed program dark_optimistic_oracle.aleo",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_program",
  "parameters": {
    "programId": "dark_optimistic_oracle.aleo",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 12. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:19.951Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-1`
- Program: `network endpoint`
- Function: `get_latest_block_height`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 4,
  "timestamp": "2026-10-03T05:42:19.951Z",
  "callId": "aleo-call-1",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read the latest Aleo Testnet block height",
  "function": "get_latest_block_height",
  "parameters": {
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/block/height/latest"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 13. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.636Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T05:42:23.636Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

## 14. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

## 15. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.637Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T05:42:23.637Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

## 16. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

## 17. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:42:23.638Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T05:42:23.638Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  }
}
```

## 18. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.746Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T05:42:23.746Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 19. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.749Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T05:42:23.749Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 20. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.752Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T05:42:23.752Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 21. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.768Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T05:42:23.768Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 22. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:42:23.772Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T05:42:23.772Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-03"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 23. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:42:40.851Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T05:42:40.851Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  }
}
```

## 24. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:43:01.786Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T05:43:01.786Z",
  "callId": "aleo-call-8",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr"
  }
}
```

## 25. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f.

- Time: 2026-10-03T05:43:15.822Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-04`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T05:43:15.822Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.create_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "create_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion",
        "value": "{\n        id: 2026100301field,\n        title: 20261003field,\n        content_hash: 1967197542655213185970768287057963230030743952149426568688518505609222478009field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20136400u32,\n        voting_deadline_block_height: 20136440u32\n      }"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-04"
  },
  "result": {
    "walletRequestId": "shield_1791006181781_j5d6fhdikcr",
    "walletStatus": "accepted",
    "onchainTransactionId": "at16h547nucs89gexhy8fguf2hlh9mkddz9pme2sx9w5czh67t6kuqsfqsw0f",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```

## 26. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.382Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T05:44:24.382Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

## 27. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.383Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T05:44:24.383Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

## 28. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

## 29. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

## 30. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T05:44:24.384Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T05:44:24.384Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  }
}
```

## 31. Read dark_optimistic_oracle.aleo.assertions[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.481Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T05:44:24.481Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 32. Read dark_optimistic_oracle.aleo.asserters[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.483Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T05:44:24.483Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 33. Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.500Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T05:44:24.500Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 34. Read dark_optimistic_oracle.aleo.disputers[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.504Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T05:44:24.504Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 35. Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T05:44:24.515Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-06`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T05:44:24.515Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100301field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100301field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100301field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-06"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 36. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T05:45:23.765Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T05:45:23.765Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  }
}
```

## 37. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T05:45:36.387Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T05:45:36.387Z",
  "callId": "aleo-call-14",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g"
  }
}
```

## 38. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z.

- Time: 2026-10-03T05:45:50.686Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-08`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T05:45:50.686Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_assertion_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_assertion_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100301field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "900u128"
      }
    ],
    "fee": 1000000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-08"
  },
  "result": {
    "walletRequestId": "shield_1791006336385_spgolrhnv4g",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1q267dme3efmk7tnq6t92nxpvag84lnht28kyrgcj29r06yphf5gs32wf4z",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```
