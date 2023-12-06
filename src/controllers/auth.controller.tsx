import { auth } from "../utils/lucia";
import { Context } from "elysia";
import { LuciaError } from "lucia";
import { githubAuth, googleAuth } from "../utils/lucia";
import { serializeCookie } from "lucia/utils";
import { parseCookie } from "lucia/utils";
import { OAuthRequestError } from "@lucia-auth/oauth";

export const credentialsLoginController = async ({ body }: Context) => {
  const { email, password } = body as any;

  try {
    const key = await auth.useKey("email", email, password);
    const sessionData = await auth.createSession({
      userId: key.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(sessionData);

    return new Response(null, {
      headers: {
        Location: "/dashboard",
        "Set-Cookie": sessionCookie.serialize(), // store session cookie
      },
      status: 302,
    });
  } catch (error) {
    return "Login failed";
  }
};

export const credentialsSignupController = async ({ body }: Context) => {
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
};

export const logoutController = async ({ set, cookie: { auth_session } }: Context) => {
  await auth.invalidateSession(auth_session.value);
  auth_session.remove();
  set.redirect = "/login";
};

export const githubLoginController = async () => {
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
};

export const githubLoginCallbackController = async ({ request }: Context) => {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
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
    const sessionData = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(sessionData);

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
};

export const googleLoginController = async () => {
  const [url, state] = await googleAuth.getAuthorizationUrl();
  const stateCookie = serializeCookie("google_oauth_state", state, {
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
};

export const googleLoginCallbackController = async ({ request }: Context) => {
  const cookies = parseCookie(request.headers.get("Cookie") ?? "");
  const storedState = cookies.github_oauth_state;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");
  if (!state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const { getExistingUser, googleUser, createUser } = await googleAuth.validateCallback(code);

    console.log(googleUser);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      const user = await createUser({
        attributes: {
          name: googleUser.name,
        },
      });
      return user;
    };

    const user = await getUser();
    const sessionData = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });
    const sessionCookie = auth.createSessionCookie(sessionData);

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
      console.log(e);
      // invalid code
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
};
