import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure, router } from '~/lib/trpc/server';
import { loginSchema, loginUser, registerSchema, registerUser, logoutUser } from '~/server/auth';

export const authRouter = router({
  register: publicProcedure
    .input(registerSchema)
    .mutation(async ({ input }) => {
      try {
        const user = await registerUser(input);
        return { success: true, user: { id: user.id, name: user.name, email: user.email } };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: error.message,
          });
        }
        throw error;
      }
    }),
    
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input }) => {
      try {
        const { user, session } = await loginUser(input);
        return { 
          success: true, 
          user: { id: user.id, name: user.name, email: user.email },
          sessionId: session.id 
        };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: error.message,
          });
        }
        throw error;
      }
    }),
    
  logout: publicProcedure
    .input(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await logoutUser(input.sessionId);
        return { success: true };
      } catch (error) {
        if (error instanceof Error) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: error.message,
          });
        }
        throw error;
      }
    }),
}); 