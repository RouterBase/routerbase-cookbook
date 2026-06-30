# Switch Models Without Rewriting Application Code

[RouterBase](https://routerbase.com) is useful when a product needs to test multiple models behind one OpenAI-compatible request shape.

## Configuration

Keep the model id outside application logic:

```bash
export ROUTERBASE_MODEL="google/gemini-2.5-flash"
```

Then pass it into the request body:

```js
const response = await chatCompletion({
  model: process.env.ROUTERBASE_MODEL,
  messages: [
    { role: "user", content: "Summarize this support ticket." }
  ]
});
```

## Rollout Checklist

- Start with a non-critical workflow.
- Compare output quality with a small set of known prompts.
- Track cost, latency, and error rate.
- Keep a rollback model id ready.
- Document which workflows require strict JSON, long context, or tool calling.

## Example Evaluation Table

| Workflow | Current model | Candidate model | Metric |
| --- | --- | --- | --- |
| Support summary | `google/gemini-2.5-flash` | configurable | Human rating |
| Release note draft | configurable | configurable | Edit distance |
| Query classification | configurable | configurable | Accuracy |

## Related Resources

- [RouterBase](https://routerbase.com)
- [RouterBase docs](https://docs.routerbase.com/)
- [Model listing example](https://github.com/RouterBase/routerbase-examples)
