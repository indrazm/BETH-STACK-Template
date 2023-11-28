import { Elysia } from "elysia";
import { Login } from "../components/apps/auth/login";
import { Register } from "../components/apps/auth/register";
import { auth } from "../auth/lucia";
import { LuciaError } from "lucia";

export const authRouter = new Elysia()
  .get("/login", () => <Login />)

  .get("/register", () => <Register />)

  .post("/login", async ({ set, body, cookie: { session } }) => {
    const { email, password } = body as any;

    const key = await auth.useKey("email", email, password);
    const sessionCookie = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const cookieOptions = auth.createSessionCookie(session);

    cookieOptions.attributes.path = "/";

    session.set(cookieOptions);
    session.value = sessionCookie;

    set.redirect = "/dashboard";

    // return "Login success, redirecting...";
  })

  .post("/register", async ({ body }) => {
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
  })

  .post("/logout", async ({ set, cookie: { session } }) => {
    const { sessionId } = session.value;

    const authRequest = auth.invalidateSession(sessionId);
    console.log(authRequest);

    set.redirect = "/login";
  });
