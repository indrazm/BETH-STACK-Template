import { Context } from "elysia";
import { auth } from "../utils/lucia";
import { Dashboard } from "../views/pages/dashboard";

export const dashboardController = async ({ cookie: { auth_session } }: Context) => {
  const { user } = await auth.getSession(auth_session.value);

  return <Dashboard name={user.name} />;
};
