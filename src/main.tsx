import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { BaseHTML } from "./components/templates/BaseHTML";

import { authRouter } from "./routers/auth";

import "@kitajs/html/register";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(authRouter)
  .get("/", () => (
    <BaseHTML>
      <h1 class="text-indigo-500">Hey There!</h1>
    </BaseHTML>
  ))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
