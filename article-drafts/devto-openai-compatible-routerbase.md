---
title: Use RouterBase as an OpenAI-compatible API gateway
published: false
description: A practical walkthrough for trying RouterBase with one base URL and familiar chat-completions requests.
tags: ai, api, javascript, opensource
---

Many AI applications begin with one model provider and then need more flexibility: fallback models, cost experiments, or different models for different product workflows.

[RouterBase](https://routerbase.com) gives developers an OpenAI-compatible API shape at `https://routerbase.com/v1`, so you can keep the request pattern familiar while routing through a gateway.

## Minimal curl request

```bash
curl https://routerbase.com/v1/chat/completions \
  -H "Authorization: Bearer $ROUTERBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-2.5-flash",
    "messages": [
      { "role": "user", "content": "Explain RouterBase in one sentence." }
    ]
  }'
```

## Node.js example

```js
const response = await fetch("https://routerbase.com/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.ROUTERBASE_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: process.env.ROUTERBASE_MODEL || "google/gemini-2.5-flash",
    messages: [
      { role: "user", content: "Draft a short product update." }
    ]
  })
});

console.log(await response.json());
```

## Practical rollout advice

Start with one low-risk workflow, keep the model id configurable, and compare latency, quality, and error rate before routing more traffic through the new setup.

Useful references:

- RouterBase docs: https://docs.routerbase.com/
- API collections: https://github.com/RouterBase/routerbase-api-collections
- Examples: https://github.com/RouterBase/routerbase-examples
