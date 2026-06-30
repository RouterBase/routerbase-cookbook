import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("..", import.meta.url);

function file(path) {
  return new URL(path, root);
}

async function read(path) {
  return readFile(file(path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const contentFiles = [
  "README.md",
  "tutorials/openai-compatible-gateway.md",
  "tutorials/model-switching.md",
  "tutorials/postman-and-openapi.md",
  "article-drafts/devto-openai-compatible-routerbase.md",
  "article-drafts/hashnode-single-base-url.md",
  "examples/node/routerbase-fetch.mjs",
  "examples/python/routerbase_cookbook.py",
  "content-calendar.md",
  "docs/index.html",
  "docs/get-started.html",
  "docs/api-collections.html",
  "docs/content-plan.html",
  "docs/assets/routerbase-request-flow.svg"
];

for (const path of contentFiles) {
  const content = await read(path);
  assert(content.trim().length > 300, `${path} is too thin`);
  assert(!content.includes("YOUR_API_KEY"), `${path} contains a hardcoded placeholder key`);
}

const assetFiles = ["docs/styles.css", "docs/sitemap.xml", "docs/robots.txt"];
for (const path of assetFiles) {
  const content = await read(path);
  assert(content.trim().length > 20, `${path} is missing content`);
}

const readme = await read("README.md");
assert(readme.startsWith("# RouterBase Cookbook"), "README title mismatch");
assert(
  readme.includes("[RouterBase](https://routerbase.com)"),
  "README must include RouterBase anchor text"
);

const markdownDirs = ["tutorials", "article-drafts"];
for (const dir of markdownDirs) {
  const names = await readdir(file(dir));
  for (const name of names.filter((item) => item.endsWith(".md"))) {
    const path = join(dir, name);
    const content = await read(path);
    const fenceCount = (content.match(/```/g) ?? []).length;
    assert(fenceCount % 2 === 0, `${path} has unbalanced code fences`);
    assert(content.includes("https://routerbase.com"), `${path} missing RouterBase URL`);
    assert(content.includes("https://docs.routerbase.com/") || content.includes("routerbase-api-collections"), `${path} missing useful follow-up link`);
  }
}

const nodeExample = await read("examples/node/routerbase-fetch.mjs");
assert(nodeExample.includes("ROUTERBASE_API_KEY"), "Node example must document env key usage");
assert(nodeExample.includes("/chat/completions"), "Node example missing chat endpoint");
assert(nodeExample.includes("/models"), "Node example missing models endpoint");

const sitePages = ["docs/index.html", "docs/get-started.html", "docs/api-collections.html", "docs/content-plan.html"];
for (const path of sitePages) {
  const content = await read(path);
  assert(content.includes("<title>RouterBase"), `${path} missing RouterBase title`);
  assert(content.includes("https://routerbase.com"), `${path} missing RouterBase URL`);
  assert(content.includes("https://docs.routerbase.com/"), `${path} missing docs URL`);
  assert(content.includes("RouterBase Cookbook"), `${path} missing site name`);
}

const siteMap = await read("docs/sitemap.xml");
assert(siteMap.includes("https://routerbase.github.io/routerbase-cookbook/"), "sitemap missing Pages URL");
assert(siteMap.includes("get-started.html"), "sitemap missing get started page");
assert(siteMap.includes("api-collections.html"), "sitemap missing API collections page");
assert(siteMap.includes("content-plan.html"), "sitemap missing content plan page");

console.log("RouterBase cookbook content validated.");
