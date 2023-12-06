import { BaseHTML } from "../templates/BaseHTML";

export const Register = () => {
  return (
    <BaseHTML>
      <main class="flex h-screen items-center justify-center">
        <div class="w-[300px] space-y-4">
          <form
            class="space-y-2"
            hx-post="/auth/register"
            hx-target="#authMessage"
            hx-ext="disable-element"
            hx-disable-element="#register"
          >
            <div class="py-4">
              <h5>Register</h5>
              <p class="text-gray-500">Input your email and password</p>
            </div>
            <input name="name" placeholder="Input your name" type="text" />
            <input name="email" placeholder="Input your email" type="email" />
            <input name="password" placeholder="Input your password" type="password" />
            <button id="register">Register</button>
          </form>
          <div class="space-y-2">
            <form method="get" action="/login/github">
              <button class="btn-secondary space-x-2">
                <i class="fa-brands fa-github"></i>
                <span>Continue with Github</span>
              </button>
            </form>
            <form method="get" action="/login/google">
              <button class="btn-secondary space-x-2">
                <i class="fa-brands fa-google"></i>
                <span>Continue with Google</span>
              </button>
            </form>
          </div>
          <p>
            Have an account ?{" "}
            <a hx-boost="true" href="/login">
              Login
            </a>{" "}
          </p>
          <div id="authMessage"></div>
        </div>
      </main>
    </BaseHTML>
  );
};
