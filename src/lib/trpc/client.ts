import { createTRPCReact } from "@trpc/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import type { AppRouter } from "~/server/api/root";

const getBaseUrl = () => {
	if (typeof window !== "undefined") {
		return "";
	}
	// Reference for running in Docker or Vercel
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`;
	}
	// Assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
};

export const trpc = createTRPCReact<AppRouter>();

export function createTRPCClient() {
	return trpc.createClient({
		links: [
			httpBatchLink({
				url: `${getBaseUrl()}/api/trpc`,
				// You can pass any HTTP headers you wish here
				headers() {
					return {};
				},
				transformer: superjson,
			}),
		],
		// transformer: superjson,
	});
}
