import { createFileRoute } from '@tanstack/react-router';
import { Button } from '~/components/ui/button';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl mx-auto space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Base Template App</h1>
        <p className="text-xl opacity-80">
          Your full-stack React application with TanStack Router, tRPC, and more.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="default">
            <a href="https://tanstack.com/router/latest" target="_blank" rel="noreferrer">
              TanStack Router Docs
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://trpc.io/docs" target="_blank" rel="noreferrer">
              tRPC Docs
            </a>
          </Button>
        </div>
      </div>
    </main>
  );
}
