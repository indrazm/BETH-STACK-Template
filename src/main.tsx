import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

import { Home } from "./components/templates/home";

import { authRouter } from "./routers/auth";
import { dashboardRouter } from "./routers/dashboard";

import "@kitajs/html/register";

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .use(dashboardRouter)
  .use(authRouter)
  .get("/", () => <Home />)

  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
