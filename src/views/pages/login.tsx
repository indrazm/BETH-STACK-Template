import { BaseHTML } from "../templates/BaseHTML";

export const Login = () => {
  return (
    <BaseHTML>
      <main class="flex h-screen items-center justify-center">
        <div class="w-[300px] space-y-4">
          <form class="space-y-2" method="post" action="/login">
            <div class="py-4">
              <h5>Login</h5>
              <p class="text-gray-500">Input your email and password</p>
            </div>
            <input name="email" placeholder="Input your email" type="email" />
            <input name="password" placeholder="Input your password" type="password" />
            <button>Log in</button>
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
            Don't have an account ?{" "}
            <a hx-boost="true" href="/register">
              Register
            </a>{" "}
          </p>
        </div>
      </main>
    </BaseHTML>
  );
};
