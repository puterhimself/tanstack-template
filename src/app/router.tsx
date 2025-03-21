import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "~/lib/trpc/client";
import { routeTree } from "./routeTree.gen";
import { TrpcProvider } from "~/components/trpc-provider";

export const queryClient = new QueryClient();

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		context: {
			trpc,
			queryClient,
		},
		// defaultPendingComponent: () => (
		// 	<div className={`p-2 text-2xl`}>
		// 		<Spinner />
		// 	</div>
		// ),
		Wrap: TrpcProvider,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
