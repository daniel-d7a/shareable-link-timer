import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <main className="h-screen grid place-items-center dark">
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
});
