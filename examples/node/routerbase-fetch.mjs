export const ROUTERBASE_BASE_URL = "https://routerbase.com/v1";
export const DEFAULT_MODEL = "google/gemini-2.5-flash";

export function normalizeBaseURL(baseURL = ROUTERBASE_BASE_URL) {
  return baseURL.replace(/\/+$/, "");
}

export function buildChatBody({ messages, model = DEFAULT_MODEL, temperature = 0.7 }) {
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new Error("messages must be a non-empty array");
  }

  return {
    model,
    messages,
    temperature
  };
}

export async function chatCompletion({
  apiKey = process.env.ROUTERBASE_API_KEY,
  baseURL = ROUTERBASE_BASE_URL,
  messages,
  model,
  temperature,
  fetchImpl = globalThis.fetch
}) {
  if (!apiKey) {
    throw new Error("ROUTERBASE_API_KEY is required");
  }
  if (typeof fetchImpl !== "function") {
    throw new Error("A fetch implementation is required");
  }

  const response = await fetchImpl(`${normalizeBaseURL(baseURL)}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(buildChatBody({ messages, model, temperature }))
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`RouterBase chat completion failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

export async function listModels({
  apiKey = process.env.ROUTERBASE_API_KEY,
  baseURL = ROUTERBASE_BASE_URL,
  fetchImpl = globalThis.fetch
} = {}) {
  if (!apiKey) {
    throw new Error("ROUTERBASE_API_KEY is required");
  }
  if (typeof fetchImpl !== "function") {
    throw new Error("A fetch implementation is required");
  }

  const response = await fetchImpl(`${normalizeBaseURL(baseURL)}/models`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`RouterBase model listing failed (${response.status}): ${JSON.stringify(data)}`);
  }
  return data;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const prompt = process.argv.slice(2).join(" ") || "Explain RouterBase in one sentence.";
  const response = await chatCompletion({
    messages: [{ role: "user", content: prompt }]
  });
  console.log(response.choices?.[0]?.message?.content ?? JSON.stringify(response, null, 2));
}
