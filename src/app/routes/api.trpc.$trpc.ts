import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createFileRoute } from '@tanstack/react-router';
import { appRouter } from '~/server/api/root';
import { createTRPCContext } from '~/lib/trpc/server';

export const Route = createFileRoute('/api/trpc/$trpc')({
  async loader({ params }) {
    const { trpc } = params;
    
    return new Response('Not found', { status: 404 });
  },
  
  component: () => null,
});

export async function action({ request }: { request: Request }) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req: request,
    router: appRouter,
    createContext: createTRPCContext,
  });
} 