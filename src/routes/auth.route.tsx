import { Elysia } from "elysia";
import { Login } from "../views/pages/login";
import { Register } from "../views/pages/register";

import {
  credentialsLoginController,
  credentialsSignupController,
  logoutController,
  githubLoginController,
  githubLoginCallbackController,
  googleLoginController,
  googleLoginCallbackController,
} from "../controllers/auth.controller";

export const authRouter = new Elysia()
  .get("/login", () => <Login />)
  .get("/register", () => <Register />)

  // OAuth
  .get("/login/github", githubLoginController)
  .get("/login/github/callback", githubLoginCallbackController)
  .get("/login/google", googleLoginController)
  .get("/login/google/callback", googleLoginCallbackController)

  // Credentials
  .post("/login", credentialsLoginController)
  .post("/register", credentialsSignupController)
  .post("/logout", logoutController);
