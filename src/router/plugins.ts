import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

export const pluginsMiddleware = new Elysia().use(html()).use(staticPlugin());
