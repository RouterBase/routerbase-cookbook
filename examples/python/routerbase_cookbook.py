import json
import os
import urllib.error
import urllib.request

ROUTERBASE_BASE_URL = "https://routerbase.com/v1"
DEFAULT_MODEL = "google/gemini-2.5-flash"


def chat_completion(messages, model=DEFAULT_MODEL, temperature=0.7, api_key=None, base_url=ROUTERBASE_BASE_URL):
    token = api_key or os.environ.get("ROUTERBASE_API_KEY")
    if not token:
        raise RuntimeError("ROUTERBASE_API_KEY is required")

    body = json.dumps(
        {
            "model": model,
            "messages": messages,
            "temperature": temperature,
        }
    ).encode("utf-8")

    request = urllib.request.Request(
        f"{base_url.rstrip('/')}/chat/completions",
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8")
        raise RuntimeError(f"RouterBase request failed ({error.code}): {detail}") from error


if __name__ == "__main__":
    result = chat_completion(
        [{"role": "user", "content": "Explain RouterBase in one sentence."}]
    )
    print(result["choices"][0]["message"]["content"])
