import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';
import superjson from 'superjson';
import { db } from '~/server/db';

// Create a context for each request
export const createTRPCContext = async () => {
  return {
    db,
    // Add session information once auth is implemented
    // session: await getAuthSession(),
  };
};

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

// Initialize tRPC
const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

export const createCallerFactory = t.createCallerFactory; 