import { router } from "~/lib/trpc/server";
import { helloRouter } from "./routers/hello";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  hello: helloRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter; 