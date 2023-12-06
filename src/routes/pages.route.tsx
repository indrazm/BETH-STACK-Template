import { Elysia } from "elysia";
import { Home } from "../views/pages/home";

export const pagesRouter = new Elysia().get("/", () => <Home />);
