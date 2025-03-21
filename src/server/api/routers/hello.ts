import { z } from "zod";
import { publicProcedure, router } from "~/lib/trpc/server";

export const helloRouter = router({
  useQuery: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? "World"}!`,
      };
    }),
}); 