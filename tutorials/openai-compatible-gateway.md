# Use RouterBase as an OpenAI-Compatible API Gateway

[RouterBase](https://routerbase.com) exposes an OpenAI-compatible API at `https://routerbase.com/v1`, which means an existing chat-completions integration can usually be adapted by changing the base URL, API key, and model id.

## Why This Pattern Helps

Teams often start with one AI provider and later need backup models, cost controls, or model experiments. A gateway layer keeps application code stable while routing requests through a single API shape.

## Minimal Request

```bash
curl https://routerbase.com/v1/chat/completions \
  -H "Authorization: Bearer $ROUTERBASE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "google/gemini-2.5-flash",
    "messages": [
      {
        "role": "user",
        "content": "Explain RouterBase in one sentence."
      }
    ]
  }'
```

## Node.js Usage

```js
import { chatCompletion } from "../examples/node/routerbase-fetch.mjs";

const response = await chatCompletion({
  messages: [
    { role: "user", content: "Write a release note for a model switch." }
  ]
});
```

## Production Notes

- Keep `ROUTERBASE_API_KEY` in your secret manager.
- Make the model configurable through environment variables.
- Log request ids and latency, but avoid logging raw user prompts unless your privacy policy allows it.
- Add a fallback message for upstream provider failures.

## Related Resources

- [RouterBase docs](https://docs.routerbase.com/)
- [RouterBase examples](https://github.com/RouterBase/routerbase-examples)
