# Import RouterBase into Postman, Bruno, or Insomnia

The [RouterBase](https://routerbase.com) API collections repository provides ready-to-import request files for developers who prefer to test APIs before writing code.

Repository:

- `https://github.com/RouterBase/routerbase-api-collections`

## What To Import

- OpenAPI: `openapi/routerbase.openapi.json`
- Postman: `postman/routerbase.postman_collection.json`
- Bruno: `bruno/RouterBase`
- Insomnia: `insomnia/routerbase.insomnia.json`

## Environment Variables

Set these values in your API client:

| Variable | Value |
| --- | --- |
| `ROUTERBASE_BASE_URL` | `https://routerbase.com/v1` |
| `ROUTERBASE_API_KEY` | Your RouterBase API key |

## Smoke Test

Run `GET /models` first. If that succeeds, run `POST /chat/completions` with a short prompt and a known model id.

## Why Keep Collections Public

Public collections make the onboarding path visible. They also give API evaluators a neutral way to inspect endpoints, auth headers, and request bodies before adopting a package.
