import { BaseHTML } from "../templates/BaseHTML";

interface DashboardProps {
  name: string;
}

export const Dashboard = async ({ name }: DashboardProps) => {
  return (
    <BaseHTML>
      <header class="flex items-center justify-between bg-gradient-to-b from-zinc-200 to-transparent p-4">
        <div class="flex items-center gap-2">
          <img src="public/logo.svg" width="24px" height="24px" />
          <div class="text-lg font-bold tracking-tighter">BETH.</div>
        </div>
        <nav class="flex items-center gap-4">
          <p class="font-medium" safe>
            {name}
          </p>
          <form method="post" action="/logout">
            <button>Logout</button>
          </form>
        </nav>
      </header>
      <main class="m-auto mt-12 max-w-4xl space-y-12">
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
