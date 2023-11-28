import { Elysia } from "elysia";
import { auth } from "../auth/lucia";
import { Dashboard } from "../components/apps/dashboard";

export const dashboardRouter = new Elysia().get("/dashboard", async ({ set, cookie: { session } }) => {
  if (session.value === undefined) {
    set.redirect = "/login";
    return;
  }
  try {
    const { sessionId } = session.value;
    await auth.validateSession(sessionId);

    return <Dashboard userId={session.value.user.userId} />;
  } catch (_) {
    set.redirect = "/login";
    set.status = 401;
  }
});
