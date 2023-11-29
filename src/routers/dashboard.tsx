import { Elysia } from "elysia";
import { auth } from "../auth/lucia";
import { Dashboard } from "../components/apps/dashboard";

export const dashboardRouter = new Elysia()
  // Middleware
  .on("request", async ({ request }) => {
    const url = new URL(request.url);
    const origin = url.origin;
    const pathname = url.pathname;
    const fullUrl = origin + pathname;

    if (fullUrl.startsWith("http://localhost:3000/dashboard")) {
      const headers = request.headers.get("cookie").split("; ");
      let authSessionValue: string = "";

      headers.forEach((pair: any) => {
        const [key, value] = pair.split("=");
        if (key === "auth_session") {
          authSessionValue = value;
        }
      });
      try {
        await auth.getSession(authSessionValue);
      } catch (error) {
        return new Response(null, {
          status: 302,
          headers: {
            location: "/login",
          },
        });
      }
    }
  })

  .get("/dashboard", async ({ cookie: { auth_session } }) => {
    const { user } = await auth.getSession(auth_session.value);

    return <Dashboard name={user.name} />;
  });
