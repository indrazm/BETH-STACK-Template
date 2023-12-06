import { BaseHTML } from "../templates/BaseHTML";

export const Home = () => {
  return (
    <BaseHTML>
      <main class="flex h-screen items-center justify-center">
        <div class="card w-[400px] space-y-4">
          <div class="space-y-1">
            <h4>Hey There!</h4>
            <p>This is a BETH Stack Template</p>
          </div>
          <a href="https://github.com/indrazm/BETH-Template" target="_blank" class="block w-fit">
            Learn More
          </a>
          <div class="">
            <a href="/login">
              <button class="w-full">Login</button>
            </a>
          </div>
        </div>
      </main>
    </BaseHTML>
  );
};
