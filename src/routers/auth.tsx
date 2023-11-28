import { Elysia } from "elysia";
import { Login } from "../components/apps/auth/login";
import { Register } from "../components/apps/auth/register";
import { auth } from "../auth/lucia";
import { LuciaError } from "lucia";

export const authRouter = new Elysia()
  .get("/login", () => <Login />)
  .get("/register", () => <Register />)
  .post("/auth/login", async ({ body }) => {
    console.log(body);
    return "Login success";
  })
  .post("/auth/register", async ({ body }) => {
    const { email, password, name } = body as any;
    try {
      const user = await auth.createUser({
        key: {
          providerId: "email",
          providerUserId: email,
          password,
        },
        attributes: {
          name,
        },
      });
      console.log(user);
      return "Register success";
    } catch (e) {
      if (e instanceof LuciaError && e.message === `AUTH_DUPLICATE_KEY_ID`) {
        return "Register failed, email already exists";
      }
      console.error(e);
      return "Register failed";
    }
  });
