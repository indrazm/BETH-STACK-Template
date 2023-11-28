import { BaseHTML } from "../../templates/BaseHTML";
import { auth } from "../../../auth/lucia";

export const Dashboard = async ({ userId }: { userId: string }) => {
  const user = await auth.getUser(userId);
  return (
    <BaseHTML>
      <header class="flex justify-between p-4 items-center">
        <div class="font-bold tracking-tighter text-lg">BETH Stack</div>
        <nav class="flex items-center gap-4">
          <div safe>{user.name}</div>
          <form method="post" action="/logout">
            <button>Logout</button>
          </form>
        </nav>
      </header>
    </BaseHTML>
  );
};
