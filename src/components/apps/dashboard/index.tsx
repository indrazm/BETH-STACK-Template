import { BaseHTML } from "../../templates/BaseHTML";
import { auth } from "../../../auth/lucia";

export const Dashboard = async ({ userId }: { userId: string }) => {
  const user = await auth.getUser(userId);
  return (
    <BaseHTML>
      <header class="flex justify-between p-4 items-center bg-gradient-to-b from-indigo-100 to-transparent">
        <div class="flex gap-2 items-center">
          <img src="public/logo.svg" width="24px" height="24px" />
          <div class="font-bold tracking-tighter text-lg">BETH.</div>
        </div>
        <nav class="flex items-center gap-4">
          <div safe>{user.name}</div>
          <form method="post" action="/logout">
            <button>Logout</button>
          </form>
        </nav>
      </header>
      <main class="mt-12 max-w-4xl m-auto space-y-12">
        <section class="space-y-2">
          <h4>Here is the dashboard</h4>
          <p>Feel free to use and edit...</p>
        </section>
        <section class="space-y-3">
          <h5>Tech Stack</h5>
          <ul>
            <li>Bun.js</li>
            <li>Elysiajs</li>
            <li>Turso</li>
            <li>HTMX</li>
          </ul>
        </section>
        <section class="space-y-3">
          <h5>Another tech</h5>
          <p>It use Lucia Auth for Authentication, Drizzle for Database ORM, Tailwindcss, and Typescripts.</p>
        </section>
      </main>
    </BaseHTML>
  );
};