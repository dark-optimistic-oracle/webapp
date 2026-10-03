# Dark Optimistic Oracle webapp Aleo call log

Generated: 2026-10-03T14:03:58.839Z.

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

## 39. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.880Z
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
  "timestamp": "2026-10-03T13:30:24.880Z",
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

## 40. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:30:24.881Z
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
  "timestamp": "2026-10-03T13:30:24.881Z",
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

## 41. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.030Z
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
  "timestamp": "2026-10-03T13:30:25.030Z",
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

## 42. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:30:25.245Z
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
  "timestamp": "2026-10-03T13:30:25.245Z",
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

## 43. Prepare QA private DOOR in the connected wallet

**What happened:** The frontend prepared token_registry.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:30:33.541Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:30:33.541Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  }
}
```

## 44. Prepare QA private DOOR in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:30:47.130Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:30:47.130Z",
  "callId": "aleo-call-3",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a"
  }
}
```

## 45. Prepare QA private DOOR in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23.

- Time: 2026-10-03T13:30:55.331Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:30:55.331Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private DOOR in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "token_id",
        "value": "346688784394585735039324415800163929700021701423791533632764818774905958305field"
      },
      {
        "position": 1,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 2,
        "name": "amount",
        "value": "1000u128"
      },
      {
        "position": 3,
        "name": "external_authorization_required",
        "value": "false"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-01"
  },
  "result": {
    "walletRequestId": "shield_1791034247127_kj07zug4e7a",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1ccr2uqzzektj7v24w0uh3hv345a5z57wx83hlava8r56ypxl8qxqzzxc23",
    "statusPollAttempts": 5,
    "timedOut": false
  }
}
```

## 46. Prepare QA private fee credits in the connected wallet

**What happened:** The frontend prepared credits.aleo.transfer_public_to_private and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:31:01.603Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:31:01.603Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  }
}
```

## 47. Prepare QA private fee credits in the connected wallet

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:31:11.666Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:31:11.666Z",
  "callId": "aleo-call-4",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa"
  }
}
```

## 48. Prepare QA private fee credits in the connected wallet

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv.

- Time: 2026-10-03T13:31:17.780Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `credits.aleo`
- Function: `transfer_public_to_private`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:31:17.780Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "program": "credits.aleo",
  "function": "transfer_public_to_private",
  "description": "Prepare QA private fee credits in the connected wallet",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "recipient",
        "value": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th"
      },
      {
        "position": 1,
        "name": "amount",
        "value": "3000000u64"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-02"
  },
  "result": {
    "walletRequestId": "shield_1791034271664_13oa1rla5psa",
    "walletStatus": "accepted",
    "onchainTransactionId": "at12rv85cz88l03fz56mvfqr045tel97md3rqe6azv2clk5qa5pgsxs68zarv",
    "statusPollAttempts": 4,
    "timedOut": false
  }
}
```

## 49. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:31:21.434Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:31:21.434Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  }
}
```

## 50. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:31:27.622Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PREP-03`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:31:27.622Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PREP-03"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

## 51. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.675Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:32:03.675Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

## 52. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.677Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:32:03.677Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

## 53. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.678Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:32:03.678Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

## 54. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

## 55. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:32:03.679Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T13:32:03.679Z",
  "callId": "aleo-call-10",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

## 56. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.798Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T13:32:03.798Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 57. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.801Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T13:32:03.801Z",
  "callId": "aleo-call-10",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 58. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.807Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T13:32:03.807Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 59. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.810Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T13:32:03.810Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 60. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:32:03.818Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T13:32:03.818Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 61. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:07.370Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T13:32:07.370Z",
  "callId": "aleo-call-11",
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
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  }
}
```

## 62. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:13.202Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T13:32:13.202Z",
  "callId": "aleo-call-11",
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
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z"
  }
}
```

## 63. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka.

- Time: 2026-10-03T13:32:21.287Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T13:32:21.287Z",
  "callId": "aleo-call-11",
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
        "value": "{\n        id: 2026100302field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 100000000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-01"
  },
  "result": {
    "walletRequestId": "shield_1791034333196_jpnhuea54z",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1h8du98p3p0y6jzg7mj2c67m4u3f5mpm42fxcnvde5lxfkj72vsgsef8vka",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

## 64. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:32:29.468Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T13:32:29.468Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

## 65. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:32:42.126Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T13:32:42.126Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye"
  }
}
```

## 66. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported rejected. The accepted on-chain transaction ID is at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma.

- Time: 2026-10-03T13:32:54.531Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T13:32:54.531Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "walletRequestId": "shield_1791034362124_mo2kwqz6oye",
    "walletStatus": "rejected",
    "onchainTransactionId": "at1gnj54arx2xwr9gm2v5kxwmqr9tfr6k6w2qypkfw78k8qxmgs7cqqcmzkma",
    "statusPollAttempts": 7,
    "timedOut": false,
    "walletError": null
  }
}
```

## 67. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.651Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T13:33:02.651Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

## 68. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.652Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T13:33:02.652Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

## 69. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

## 70. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.653Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T13:33:02.653Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

## 71. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:33:02.655Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T13:33:02.655Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  }
}
```

## 72. Read dark_optimistic_oracle.aleo.assertions[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.777Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T13:33:02.777Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 73. Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.783Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T13:33:02.783Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 74. Read dark_optimistic_oracle.aleo.disputers[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.785Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T13:33:02.785Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 75. Read dark_optimistic_oracle.aleo.asserters[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.791Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T13:33:02.791Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 76. Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:33:02.792Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-PRIVATE-02`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T13:33:02.792Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100302field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100302field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100302field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-PRIVATE-02"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 77. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.create_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:23.922Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T13:33:23.922Z",
  "callId": "aleo-call-18",
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
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

## 78. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:35.636Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T13:33:35.636Z",
  "callId": "aleo-call-18",
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
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9"
  }
}
```

## 79. Submit dark_optimistic_oracle.aleo.create_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd.

- Time: 2026-10-03T13:33:45.914Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `create_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T13:33:45.914Z",
  "callId": "aleo-call-18",
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
        "value": "{\n        id: 2026100306field,\n        title: 20261003field,\n        content_hash: 298418422856964221968239053350662560619499347517808728273325040719020776712field,\n        cost: 1000u128,\n        voter_stake: 100u128,\n        dispute_deadline_block_height: 20145650u32,\n        voting_deadline_block_height: 20145700u32\n      }"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034415631_ek76t40wbe9",
    "walletStatus": "accepted",
    "onchainTransactionId": "at189ahkyyf30te89r5dksh8fg585097h3jzktep3erl4tz8qv0ag8s0us2yd",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

## 80. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.dispute_assertion and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:33:52.458Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T13:33:52.458Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  }
}
```

## 81. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:33:59.110Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T13:33:59.110Z",
  "callId": "aleo-call-19",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v"
  }
}
```

## 82. Submit dark_optimistic_oracle.aleo.dispute_assertion

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9.

- Time: 2026-10-03T13:34:05.314Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `dispute_assertion`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-09`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T13:34:05.314Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.dispute_assertion",
  "program": "dark_optimistic_oracle.aleo",
  "function": "dispute_assertion",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "assertion_cost",
        "value": "1000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-09"
  },
  "result": {
    "walletRequestId": "shield_1791034439104_hpqs16w8s1v",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1uhsk6rkwqmqlyhpw8kyyn0jfhlqgljxndd00qlkczr5t7s8pfyqqe8wte9",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

## 83. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:34:11.871Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T13:34:11.871Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  }
}
```

## 84. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:34:23.693Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T13:34:23.693Z",
  "callId": "aleo-call-20",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob"
  }
}
```

## 85. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4.

- Time: 2026-10-03T13:34:52.303Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-10`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T13:34:52.303Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "e519a9f2af3d46a3f269c7ff8c39e0a419fe5ddc7bb3524f8076a9a56282d6e6",
          "plaintextLength": 431
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-10"
  },
  "result": {
    "walletRequestId": "shield_1791034463689_ipi3issjvob",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1zlufr8rt4we9qvdvqwsq9h0kg6vgyaeupp0ulyu984nffn3jqgpqr86mn4",
    "statusPollAttempts": 15,
    "timedOut": false,
    "walletError": null
  }
}
```

## 86. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:35:04.385Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T13:35:04.385Z",
  "callId": "aleo-call-21",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 87. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:35:13.327Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-21`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 49,
  "timestamp": "2026-10-03T13:35:13.327Z",
  "callId": "aleo-call-21",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

## 88. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.confirm and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:35:17.273Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 50,
  "timestamp": "2026-10-03T13:35:17.273Z",
  "callId": "aleo-call-22",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 89. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:35:26.001Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 51,
  "timestamp": "2026-10-03T13:35:26.001Z",
  "callId": "aleo-call-22",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "walletRequestId": "shield_1791034525994_4p0nw81cble"
  }
}
```

## 90. Submit dark_optimistic_oracle.aleo.confirm

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1kh705w6fejhp0u4zq2ws0xzkxqh7juymjfpn2elsxk8nsz95dszsk9qxze.

- Time: 2026-10-03T13:35:36.269Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-22`
- Program: `dark_optimistic_oracle.aleo`
- Function: `confirm`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 52,
  "timestamp": "2026-10-03T13:35:36.269Z",
  "callId": "aleo-call-22",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.confirm",
  "program": "dark_optimistic_oracle.aleo",
  "function": "confirm",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "db2637081a5afc5be33c0ba7034c4f321d65db4351eae5d7452209e0685a9564",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "walletRequestId": "shield_1791034525994_4p0nw81cble",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1kh705w6fejhp0u4zq2ws0xzkxqh7juymjfpn2elsxk8nsz95dszsk9qxze",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

## 91. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:36:14.966Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 53,
  "timestamp": "2026-10-03T13:36:14.966Z",
  "callId": "aleo-call-23",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  }
}
```

## 92. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:36:21.779Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-23`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 54,
  "timestamp": "2026-10-03T13:36:21.779Z",
  "callId": "aleo-call-23",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

## 93. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:36:27.801Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 55,
  "timestamp": "2026-10-03T13:36:27.801Z",
  "callId": "aleo-call-24",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  }
}
```

## 94. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:36:35.058Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 56,
  "timestamp": "2026-10-03T13:36:35.058Z",
  "callId": "aleo-call-24",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "walletRequestId": "shield_1791034595053_kflubuvqsc"
  }
}
```

## 95. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1qf8gkdvg3thzspdcfsfep647n0fvggwq2pv927atp2mnk6qpucxs4d434s.

- Time: 2026-10-03T13:36:45.281Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-24`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-12`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 57,
  "timestamp": "2026-10-03T13:36:45.281Z",
  "callId": "aleo-call-24",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "d3049e2851ebd2b4497d1c998f747c796827c0cc447f9a73aecffde13862a0ce",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100306field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-12"
  },
  "result": {
    "walletRequestId": "shield_1791034595053_kflubuvqsc",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1qf8gkdvg3thzspdcfsfep647n0fvggwq2pv927atp2mnk6qpucxs4d434s",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

## 96. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:29.108Z
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
  "timestamp": "2026-10-03T13:37:29.108Z",
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

## 97. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:29.108Z
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
  "timestamp": "2026-10-03T13:37:29.108Z",
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

## 98. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:29.219Z
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
  "timestamp": "2026-10-03T13:37:29.219Z",
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

## 99. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:29.243Z
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
  "timestamp": "2026-10-03T13:37:29.243Z",
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

## 100. Read dark_optimistic_oracle.aleo.assertions[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.299Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:37:35.299Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 101. Read dark_optimistic_oracle.aleo.asserters[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.301Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:37:35.301Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 102. Read dark_optimistic_oracle.aleo.disputers[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.302Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:37:35.302Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 103. Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.303Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:37:35.303Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 104. Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:37:35.303Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:37:35.303Z",
  "callId": "aleo-call-7",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 105. Read dark_optimistic_oracle.aleo.assertions[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.402Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:37:35.402Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 106. Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.403Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:37:35.403Z",
  "callId": "aleo-call-7",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 107. Read dark_optimistic_oracle.aleo.asserters[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.404Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:37:35.404Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 108. Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.418Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:37:35.418Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 109. Read dark_optimistic_oracle.aleo.disputers[2026100306field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:37:35.420Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:37:35.420Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100306field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100306field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100306field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 110. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:40:55.790Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:40:55.790Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  }
}
```

## 111. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":2,"usableRecordCount":2}.

- Time: 2026-10-03T13:41:04.659Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-11`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:41:04.659Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-11"
  },
  "result": {
    "recordCount": 2,
    "usableRecordCount": 2
  }
}
```

## 112. Read the latest Aleo Testnet block height

**What happened:** The frontend requested: Read the latest Aleo Testnet block height. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:45:04.526Z
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
  "timestamp": "2026-10-03T13:45:04.526Z",
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

## 113. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read deployed program dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:45:04.527Z
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
  "timestamp": "2026-10-03T13:45:04.527Z",
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

## 114. Read deployed program dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:45:04.628Z
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
  "timestamp": "2026-10-03T13:45:04.628Z",
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

## 115. Read the latest Aleo Testnet block height

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:45:04.649Z
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
  "timestamp": "2026-10-03T13:45:04.649Z",
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

## 116. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for token_registry.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:46:46.249Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 5,
  "timestamp": "2026-10-03T13:46:46.249Z",
  "callId": "aleo-call-3",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  }
}
```

## 117. Read unspent QA records from Shield for token_registry.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":1,"usableRecordCount":1}.

- Time: 2026-10-03T13:47:00.566Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-3`
- Program: `token_registry.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 6,
  "timestamp": "2026-10-03T13:47:00.566Z",
  "callId": "aleo-call-3",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "token_registry.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for token_registry.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "token_registry.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  },
  "result": {
    "recordCount": 1,
    "usableRecordCount": 1
  }
}
```

## 118. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.new_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:50:03.272Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 7,
  "timestamp": "2026-10-03T13:50:03.272Z",
  "callId": "aleo-call-4",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "8df423ef8bf8b2c871dddf523602eb818258873b5d1854451b7a9915455ffb0c",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  }
}
```

## 119. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:50:11.935Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 8,
  "timestamp": "2026-10-03T13:50:11.935Z",
  "callId": "aleo-call-4",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "8df423ef8bf8b2c871dddf523602eb818258873b5d1854451b7a9915455ffb0c",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  },
  "result": {
    "walletRequestId": "shield_1791035411929_jb4zgqumrqb"
  }
}
```

## 120. Submit dark_optimistic_oracle.aleo.new_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1c2gafx0tlzs5cf48px9gn2e9gengm0rar94dx7f53zjrnle8fufqcjy56h.

- Time: 2026-10-03T13:50:22.200Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-4`
- Program: `dark_optimistic_oracle.aleo`
- Function: `new_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-right`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 9,
  "timestamp": "2026-10-03T13:50:22.200Z",
  "callId": "aleo-call-4",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.new_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "new_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "payment",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "8df423ef8bf8b2c871dddf523602eb818258873b5d1854451b7a9915455ffb0c",
          "plaintextLength": 430
        }
      },
      {
        "position": 1,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 2,
        "name": "voter_stake",
        "value": "100u128"
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-right"
  },
  "result": {
    "walletRequestId": "shield_1791035411929_jb4zgqumrqb",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1c2gafx0tlzs5cf48px9gn2e9gengm0rar94dx7f53zjrnle8fufqcjy56h",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

## 121. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:50:46.751Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 10,
  "timestamp": "2026-10-03T13:50:46.751Z",
  "callId": "aleo-call-5",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  }
}
```

## 122. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":5,"usableRecordCount":5}.

- Time: 2026-10-03T13:50:54.840Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-5`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 11,
  "timestamp": "2026-10-03T13:50:54.840Z",
  "callId": "aleo-call-5",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  },
  "result": {
    "recordCount": 5,
    "usableRecordCount": 5
  }
}
```

## 123. Submit dark_optimistic_oracle.aleo.deny

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.deny and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:51:00.458Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `deny`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 12,
  "timestamp": "2026-10-03T13:51:00.458Z",
  "callId": "aleo-call-6",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.deny",
  "program": "dark_optimistic_oracle.aleo",
  "function": "deny",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "b7bbcb785a6a5aa537d824a3e23cf7094dc7b689cbd55733f28d36ed98527403",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  }
}
```

## 124. Submit dark_optimistic_oracle.aleo.deny

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:51:11.490Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `deny`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 13,
  "timestamp": "2026-10-03T13:51:11.490Z",
  "callId": "aleo-call-6",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.deny",
  "program": "dark_optimistic_oracle.aleo",
  "function": "deny",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "b7bbcb785a6a5aa537d824a3e23cf7094dc7b689cbd55733f28d36ed98527403",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  },
  "result": {
    "walletRequestId": "shield_1791035471483_f1pyuyzo95"
  }
}
```

## 125. Submit dark_optimistic_oracle.aleo.deny

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at18863kgtdk6kfa8nv4uqx6s2yu4dguv9urpqxk8hhnr5wh0fudyys7jylk6.

- Time: 2026-10-03T13:51:19.607Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-6`
- Program: `dark_optimistic_oracle.aleo`
- Function: `deny`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-deny`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 14,
  "timestamp": "2026-10-03T13:51:19.607Z",
  "callId": "aleo-call-6",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.deny",
  "program": "dark_optimistic_oracle.aleo",
  "function": "deny",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "b7bbcb785a6a5aa537d824a3e23cf7094dc7b689cbd55733f28d36ed98527403",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-deny"
  },
  "result": {
    "walletRequestId": "shield_1791035471483_f1pyuyzo95",
    "walletStatus": "accepted",
    "onchainTransactionId": "at18863kgtdk6kfa8nv4uqx6s2yu4dguv9urpqxk8hhnr5wh0fudyys7jylk6",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

## 126. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:51:35.352Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-RECOVERY-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 15,
  "timestamp": "2026-10-03T13:51:35.352Z",
  "callId": "aleo-call-7",
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
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "90000000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-RECOVERY-01"
  }
}
```

## 127. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:51:50.417Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-RECOVERY-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 16,
  "timestamp": "2026-10-03T13:51:50.417Z",
  "callId": "aleo-call-7",
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
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "90000000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-RECOVERY-01"
  },
  "result": {
    "walletRequestId": "shield_1791035510414_4df7ot3fboc"
  }
}
```

## 128. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1fnypqe5thl7mugwn6n6tetz3kwcq467lw4n4hm333a0ansh0pvzswgmxxl.

- Time: 2026-10-03T13:51:56.452Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-7`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-RECOVERY-01`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 17,
  "timestamp": "2026-10-03T13:51:56.452Z",
  "callId": "aleo-call-7",
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
        "value": "2026100302field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "90000000u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-RECOVERY-01"
  },
  "result": {
    "walletRequestId": "shield_1791035510414_4df7ot3fboc",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1fnypqe5thl7mugwn6n6tetz3kwcq467lw4n4hm333a0ansh0pvzswgmxxl",
    "statusPollAttempts": 4,
    "timedOut": false,
    "walletError": null
  }
}
```

## 129. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:52:12.919Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 18,
  "timestamp": "2026-10-03T13:52:12.919Z",
  "callId": "aleo-call-8",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  }
}
```

## 130. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":5,"usableRecordCount":5}.

- Time: 2026-10-03T13:52:24.124Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-8`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 19,
  "timestamp": "2026-10-03T13:52:24.124Z",
  "callId": "aleo-call-8",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  },
  "result": {
    "recordCount": 5,
    "usableRecordCount": 5
  }
}
```

## 131. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_voting_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:52:30.505Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 20,
  "timestamp": "2026-10-03T13:52:30.505Z",
  "callId": "aleo-call-9",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "179cfb5caed18c3b9945f102ec8a2d83c40bc092161820d92ed956e1e4526f7b",
          "plaintextLength": 274
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  }
}
```

## 132. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:52:48.052Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 21,
  "timestamp": "2026-10-03T13:52:48.052Z",
  "callId": "aleo-call-9",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "179cfb5caed18c3b9945f102ec8a2d83c40bc092161820d92ed956e1e4526f7b",
          "plaintextLength": 274
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  },
  "result": {
    "walletRequestId": "shield_1791035568048_7c0jc404uo8"
  }
}
```

## 133. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1zs9320qx7fk7xdh76j2hljpy2r3q9etls2pxlx2t0wl02pld2cpqdl5unr.

- Time: 2026-10-03T13:53:14.825Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-9`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-13`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 22,
  "timestamp": "2026-10-03T13:53:14.825Z",
  "callId": "aleo-call-9",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "179cfb5caed18c3b9945f102ec8a2d83c40bc092161820d92ed956e1e4526f7b",
          "plaintextLength": 274
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-13"
  },
  "result": {
    "walletRequestId": "shield_1791035568048_7c0jc404uo8",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1zs9320qx7fk7xdh76j2hljpy2r3q9etls2pxlx2t0wl02pld2cpqdl5unr",
    "statusPollAttempts": 14,
    "timedOut": false,
    "walletError": null
  }
}
```

## 134. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_assertion_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:53:42.352Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-14`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 23,
  "timestamp": "2026-10-03T13:53:42.352Z",
  "callId": "aleo-call-10",
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
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-14"
  }
}
```

## 135. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:54:02.746Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-14`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 24,
  "timestamp": "2026-10-03T13:54:02.746Z",
  "callId": "aleo-call-10",
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
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-14"
  },
  "result": {
    "walletRequestId": "shield_1791035642743_f7vccxyqi15"
  }
}
```

## 136. Submit dark_optimistic_oracle.aleo.collect_assertion_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1dacpqzgrd9phzwnf2292fv0d8lx9ghpgmjd8c899pvgt5wtjqq9q8x6f3x.

- Time: 2026-10-03T13:54:11.008Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-10`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_assertion_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-14`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 25,
  "timestamp": "2026-10-03T13:54:11.008Z",
  "callId": "aleo-call-10",
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
        "value": "2026100306field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-14"
  },
  "result": {
    "walletRequestId": "shield_1791035642743_f7vccxyqi15",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1dacpqzgrd9phzwnf2292fv0d8lx9ghpgmjd8c899pvgt5wtjqq9q8x6f3x",
    "statusPollAttempts": 5,
    "timedOut": false,
    "walletError": null
  }
}
```

## 137. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:54:19.534Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 26,
  "timestamp": "2026-10-03T13:54:19.534Z",
  "callId": "aleo-call-11",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  }
}
```

## 138. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":4,"usableRecordCount":4}.

- Time: 2026-10-03T13:54:36.114Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-11`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 27,
  "timestamp": "2026-10-03T13:54:36.114Z",
  "callId": "aleo-call-11",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  },
  "result": {
    "recordCount": 4,
    "usableRecordCount": 4
  }
}
```

## 139. Submit dark_optimistic_oracle.aleo.refund_voting_right

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.refund_voting_right and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:54:42.742Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `refund_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 28,
  "timestamp": "2026-10-03T13:54:42.742Z",
  "callId": "aleo-call-12",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.refund_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "refund_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "refund_amount",
        "value": "100u128"
      },
      {
        "position": 1,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "0d27a0372722786732d1002cd2983007ee11bdaaafe89343e0ea73bc881a3de2",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  }
}
```

## 140. Submit dark_optimistic_oracle.aleo.refund_voting_right

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:54:56.827Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `refund_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 29,
  "timestamp": "2026-10-03T13:54:56.827Z",
  "callId": "aleo-call-12",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.refund_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "refund_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "refund_amount",
        "value": "100u128"
      },
      {
        "position": 1,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "0d27a0372722786732d1002cd2983007ee11bdaaafe89343e0ea73bc881a3de2",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  },
  "result": {
    "walletRequestId": "shield_1791035696821_8ve56up6yxu"
  }
}
```

## 141. Submit dark_optimistic_oracle.aleo.refund_voting_right

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1qqahg3f5uezlrgjvftqn93zwyuqqlfwdwftxm4ffsfhly98jusyqf7juqz.

- Time: 2026-10-03T13:55:21.485Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-12`
- Program: `dark_optimistic_oracle.aleo`
- Function: `refund_voting_right`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-15`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 30,
  "timestamp": "2026-10-03T13:55:21.485Z",
  "callId": "aleo-call-12",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.refund_voting_right",
  "program": "dark_optimistic_oracle.aleo",
  "function": "refund_voting_right",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "refund_amount",
        "value": "100u128"
      },
      {
        "position": 1,
        "name": "voting_right",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "0d27a0372722786732d1002cd2983007ee11bdaaafe89343e0ea73bc881a3de2",
          "plaintextLength": 249
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-15"
  },
  "result": {
    "walletRequestId": "shield_1791035696821_8ve56up6yxu",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1qqahg3f5uezlrgjvftqn93zwyuqqlfwdwftxm4ffsfhly98jusyqf7juqz",
    "statusPollAttempts": 13,
    "timedOut": false,
    "walletError": null
  }
}
```

## 142. Read dark_optimistic_oracle.aleo.assertions[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.assertions[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.286Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 31,
  "timestamp": "2026-10-03T13:55:38.286Z",
  "callId": "aleo-call-13",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

## 143. Read dark_optimistic_oracle.aleo.asserters[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.asserters[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.287Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 32,
  "timestamp": "2026-10-03T13:55:38.287Z",
  "callId": "aleo-call-14",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

## 144. Read dark_optimistic_oracle.aleo.disputers[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.disputers[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.287Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 33,
  "timestamp": "2026-10-03T13:55:38.287Z",
  "callId": "aleo-call-15",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

## 145. Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.288Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 34,
  "timestamp": "2026-10-03T13:55:38.288Z",
  "callId": "aleo-call-16",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

## 146. Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]

**What happened:** The frontend requested: Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:55:38.288Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 35,
  "timestamp": "2026-10-03T13:55:38.288Z",
  "callId": "aleo-call-17",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  }
}
```

## 147. Read dark_optimistic_oracle.aleo.assertions[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.388Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-13`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 36,
  "timestamp": "2026-10-03T13:55:38.388Z",
  "callId": "aleo-call-13",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.assertions[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "assertions",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/assertions/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 148. Read dark_optimistic_oracle.aleo.disputers[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.399Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-15`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 37,
  "timestamp": "2026-10-03T13:55:38.399Z",
  "callId": "aleo-call-15",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.disputers[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "disputers",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/disputers/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 149. Read dark_optimistic_oracle.aleo.asserters[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.401Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-14`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 38,
  "timestamp": "2026-10-03T13:55:38.401Z",
  "callId": "aleo-call-14",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.asserters[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "asserters",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/asserters/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 150. Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.416Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-16`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 39,
  "timestamp": "2026-10-03T13:55:38.416Z",
  "callId": "aleo-call-16",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.confirm_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "confirm_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/confirm_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 151. Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]

**What happened:** The public provider completed the read. HTTP result: {"httpStatus":200,"ok":true}.

- Time: 2026-10-03T13:55:38.419Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-17`
- Program: `dark_optimistic_oracle.aleo`
- Function: `get_mapping_value`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-16-tally`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 40,
  "timestamp": "2026-10-03T13:55:38.419Z",
  "callId": "aleo-call-17",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "description": "Read dark_optimistic_oracle.aleo.deny_votes[2026100305field]",
  "program": "dark_optimistic_oracle.aleo",
  "function": "get_mapping_value",
  "parameters": {
    "mapping": "deny_votes",
    "key": "2026100305field",
    "httpMethod": "GET",
    "url": "https://api.provable.com/v2/testnet/program/dark_optimistic_oracle.aleo/mapping/deny_votes/2026100305field"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-16-tally"
  },
  "result": {
    "httpStatus": 200,
    "ok": true
  }
}
```

## 152. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The frontend requested: Read unspent QA records from Shield for dark_optimistic_oracle.aleo. The parameters below identify the exact public provider call.

- Time: 2026-10-03T13:56:13.839Z
- Phase: `request`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-receipt`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 41,
  "timestamp": "2026-10-03T13:56:13.839Z",
  "callId": "aleo-call-18",
  "phase": "request",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-receipt"
  }
}
```

## 153. Read unspent QA records from Shield for dark_optimistic_oracle.aleo

**What happened:** The public provider completed the read. HTTP result: {"recordCount":3,"usableRecordCount":3}.

- Time: 2026-10-03T13:56:46.755Z
- Phase: `response`
- Kind: `read`
- Call ID: `aleo-call-18`
- Program: `dark_optimistic_oracle.aleo`
- Function: `wallet_request_records`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-receipt`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 42,
  "timestamp": "2026-10-03T13:56:46.755Z",
  "callId": "aleo-call-18",
  "phase": "response",
  "kind": "read",
  "network": "testnet",
  "program": "dark_optimistic_oracle.aleo",
  "function": "wallet_request_records",
  "description": "Read unspent QA records from Shield for dark_optimistic_oracle.aleo",
  "parameters": {
    "source": "Shield wallet",
    "program": "dark_optimistic_oracle.aleo",
    "includePlaintext": true,
    "statusFilter": "unspent"
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-receipt"
  },
  "result": {
    "recordCount": 3,
    "usableRecordCount": 3
  }
}
```

## 154. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_voting_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:58:20.439Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-voter`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 43,
  "timestamp": "2026-10-03T13:58:20.439Z",
  "callId": "aleo-call-19",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "99be212555166f565c2272e27b46a9782131ac331dc7e0708c8bd39e11423d3a",
          "plaintextLength": 275
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-voter"
  }
}
```

## 155. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T13:58:34.227Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-voter`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 44,
  "timestamp": "2026-10-03T13:58:34.227Z",
  "callId": "aleo-call-19",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "99be212555166f565c2272e27b46a9782131ac331dc7e0708c8bd39e11423d3a",
          "plaintextLength": 275
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-voter"
  },
  "result": {
    "walletRequestId": "shield_1791035914219_vpum8n9lb8b"
  }
}
```

## 156. Submit dark_optimistic_oracle.aleo.collect_voting_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at140v8wdqe0tg57fmxy9fx64uf7dsvxu6nxmea8vfzeu29krmp0qfqnkpqjv.

- Time: 2026-10-03T13:58:44.465Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-19`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_voting_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-voter`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 45,
  "timestamp": "2026-10-03T13:58:44.465Z",
  "callId": "aleo-call-19",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_voting_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_voting_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "award_amount",
        "value": "101u128"
      },
      {
        "position": 1,
        "name": "voting_receipt",
        "value": {
          "redacted": true,
          "classification": "private Aleo record",
          "sha256": "99be212555166f565c2272e27b46a9782131ac331dc7e0708c8bd39e11423d3a",
          "plaintextLength": 275
        }
      }
    ],
    "fee": 10000,
    "privateFee": true
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-voter"
  },
  "result": {
    "walletRequestId": "shield_1791035914219_vpum8n9lb8b",
    "walletStatus": "accepted",
    "onchainTransactionId": "at140v8wdqe0tg57fmxy9fx64uf7dsvxu6nxmea8vfzeu29krmp0qfqnkpqjv",
    "statusPollAttempts": 6,
    "timedOut": false,
    "walletError": null
  }
}
```

## 157. Submit dark_optimistic_oracle.aleo.collect_dispute_award

**What happened:** The frontend prepared dark_optimistic_oracle.aleo.collect_dispute_award and handed the displayed parameters to Shield for interactive approval.

- Time: 2026-10-03T13:59:48.741Z
- Phase: `request`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_dispute_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-disputer`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 46,
  "timestamp": "2026-10-03T13:59:48.741Z",
  "callId": "aleo-call-20",
  "phase": "request",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_dispute_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_dispute_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-disputer"
  }
}
```

## 158. Submit dark_optimistic_oracle.aleo.collect_dispute_award

**What happened:** Shield accepted the wallet request. Its walletRequestId is temporary and does not prove that the transaction reached the blockchain.

- Time: 2026-10-03T14:00:03.842Z
- Phase: `submitted`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_dispute_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-disputer`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 47,
  "timestamp": "2026-10-03T14:00:03.842Z",
  "callId": "aleo-call-20",
  "phase": "submitted",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_dispute_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_dispute_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-disputer"
  },
  "result": {
    "walletRequestId": "shield_1791036003839_kjzha2ksmd"
  }
}
```

## 159. Submit dark_optimistic_oracle.aleo.collect_dispute_award

**What happened:** Shield reported accepted. The accepted on-chain transaction ID is at1lzyxezrhe2qllh7xtk0qrz5ccqraj6c8eafppy3z0l7gthlcjsysxrfttx.

- Time: 2026-10-03T14:00:18.326Z
- Phase: `response`
- Kind: `transaction`
- Call ID: `aleo-call-20`
- Program: `dark_optimistic_oracle.aleo`
- Function: `collect_dispute_award`
- Demo run: `demo-20261003`; screenplay/calling-sequence step: `DOO-17-disputer`

```json
{
  "schema": "aleo-browser-audit/v1",
  "sequence": 48,
  "timestamp": "2026-10-03T14:00:18.326Z",
  "callId": "aleo-call-20",
  "phase": "response",
  "kind": "transaction",
  "network": "testnet",
  "description": "Submit dark_optimistic_oracle.aleo.collect_dispute_award",
  "program": "dark_optimistic_oracle.aleo",
  "function": "collect_dispute_award",
  "parameters": {
    "caller": "aleo1h3tk7mymrc3a82wn4k2xc6yyjp6esqezg2lmngpscwvwy3xa75xqnmd5th",
    "inputs": [
      {
        "position": 0,
        "name": "assertion_id",
        "value": "2026100305field"
      },
      {
        "position": 1,
        "name": "payout_amount",
        "value": "1900u128"
      }
    ],
    "fee": 10000,
    "privateFee": false
  },
  "demo": {
    "run": "demo-20261003",
    "step": "DOO-17-disputer"
  },
  "result": {
    "walletRequestId": "shield_1791036003839_kjzha2ksmd",
    "walletStatus": "accepted",
    "onchainTransactionId": "at1lzyxezrhe2qllh7xtk0qrz5ccqraj6c8eafppy3z0l7gthlcjsysxrfttx",
    "statusPollAttempts": 8,
    "timedOut": false,
    "walletError": null
  }
}
```
