import assert from "node:assert/strict";
import test from "node:test";

import {
  DEFAULT_MODEL,
  ROUTERBASE_BASE_URL,
  buildChatBody,
  chatCompletion,
  listModels,
  normalizeBaseURL
} from "../routerbase-fetch.mjs";

test("normalizes base URLs", () => {
  assert.equal(normalizeBaseURL("https://routerbase.com/v1///"), ROUTERBASE_BASE_URL);
});

test("builds a RouterBase chat request body", () => {
  assert.deepEqual(
    buildChatBody({
      messages: [{ role: "user", content: "Hello" }]
    }),
    {
      model: DEFAULT_MODEL,
      messages: [{ role: "user", content: "Hello" }],
      temperature: 0.7
    }
  );
});

test("calls the chat completions endpoint", async () => {
  const calls = [];
  const response = await chatCompletion({
    apiKey: "test-key",
    messages: [{ role: "user", content: "Hello" }],
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      return {
        ok: true,
        status: 200,
        async json() {
          return { choices: [{ message: { content: "Hello from RouterBase" } }] };
        }
      };
    }
  });

  assert.equal(calls[0].url, `${ROUTERBASE_BASE_URL}/chat/completions`);
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-key");
  assert.equal(JSON.parse(calls[0].init.body).model, DEFAULT_MODEL);
  assert.equal(response.choices[0].message.content, "Hello from RouterBase");
});

test("calls the models endpoint", async () => {
  const calls = [];
  const response = await listModels({
    apiKey: "test-key",
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      return {
        ok: true,
        status: 200,
        async json() {
          return { data: [{ id: DEFAULT_MODEL }] };
        }
      };
    }
  });

  assert.equal(calls[0].url, `${ROUTERBASE_BASE_URL}/models`);
  assert.equal(calls[0].init.headers.Authorization, "Bearer test-key");
  assert.equal(response.data[0].id, DEFAULT_MODEL);
});
