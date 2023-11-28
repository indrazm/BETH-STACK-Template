import { BaseHTML } from "../../templates/BaseHTML";

export const Login = () => {
  return (
    <BaseHTML>
      <main class="h-screen flex justify-center items-center">
        <div class="w-[300px] space-y-4">
          <form class="space-y-2" hx-post="/auth/login" hx-target="#authMessage">
            <div class="py-4">
              <h5>Login</h5>
              <p class="text-gray-500">Input your email and password</p>
            </div>
            <input name="email" placeholder="Input your email" type="email" />
            <input name="password" placeholder="Input your password" type="password" />
            <button>Log in</button>
          </form>
          <p>
            Don't have an account ?{" "}
            <a hx-boost="true" href="/register">
              Register
            </a>{" "}
          </p>
          <div id="authMessage"></div>
        </div>
      </main>
    </BaseHTML>
  );
};
