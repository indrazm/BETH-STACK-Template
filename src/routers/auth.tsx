import { Elysia } from "elysia";
import { Login } from "../components/apps/auth/login";
import { Register } from "../components/apps/auth/register";
import { auth, githubAuth } from "../auth/lucia";
import { LuciaError } from "lucia";
import { serializeCookie, parseCookie } from "lucia/utils";
import { OAuthRequestError } from "@lucia-auth/oauth";

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

    await auth.invalidateSession(sessionId);

    set.redirect = "/login";
  })

  .get("/login/github", async () => {
    const [url, state] = await githubAuth.getAuthorizationUrl();
    const stateCookie = serializeCookie("github_oauth_state", state, {
      httpOnly: true,
      secure: false, // `true` for production
      path: "/",
      maxAge: 60 * 60,
    });
    return new Response(null, {
      status: 302,
      headers: {
        Location: url.toString(),
        "Set-Cookie": stateCookie,
      },
    });
  })

  .get("/login/github/callback", async ({ request }) => {
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");
    console.log(cookies);
    const storedState = cookies.github_oauth_state;
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const code = url.searchParams.get("code");
    // validate state
    if (!storedState || !state || storedState !== state || !code) {
      return new Response(null, {
        status: 400,
      });
    }
    try {
      const { getExistingUser, githubUser, createUser } = await githubAuth.validateCallback(code);

      const getUser = async () => {
        const existingUser = await getExistingUser();
        if (existingUser) return existingUser;
        const user = await createUser({
          attributes: {
            username: githubUser.login,
          },
        });
        return user;
      };

      const user = await getUser();
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      const sessionCookie = auth.createSessionCookie(session);
      // redirect to profile page
      return new Response(null, {
        headers: {
          Location: "/dashboard",
          "Set-Cookie": sessionCookie.serialize(), // store session cookie
        },
        status: 302,
      });
    } catch (e) {
      if (e instanceof OAuthRequestError) {
        // invalid code
        return new Response(null, {
          status: 400,
        });
      }
      return new Response(null, {
        status: 500,
      });
    }
  });
