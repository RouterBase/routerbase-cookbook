# RouterBase Cookbook

[RouterBase](https://routerbase.com) is an OpenAI-compatible API gateway that lets developers call many AI models from one base URL: `https://routerbase.com/v1`.

This cookbook collects practical tutorials, copy-ready prompts, and small examples for teams evaluating RouterBase in real applications.

## Start Here

- [Use RouterBase as an OpenAI-compatible API gateway](tutorials/openai-compatible-gateway.md)
- [Switch models without rewriting application code](tutorials/model-switching.md)
- [Import RouterBase into Postman, Bruno, or Insomnia](tutorials/postman-and-openapi.md)

## Examples

- `examples/node/routerbase-fetch.mjs`: dependency-free Node.js helper for chat completions and model listing.
- `examples/python/routerbase_cookbook.py`: dependency-free Python helper using the standard library.

Run local checks:

```bash
npm run verify
```

## Article Drafts

These drafts are written for content platforms and can be published after account review:

- `article-drafts/devto-openai-compatible-routerbase.md`
- `article-drafts/hashnode-single-base-url.md`

## Useful Links

- [RouterBase](https://routerbase.com)
- [RouterBase docs](https://docs.routerbase.com/)
- [RouterBase API collections](https://github.com/RouterBase/routerbase-api-collections)
- [RouterBase examples](https://github.com/RouterBase/routerbase-examples)

## License

MIT
