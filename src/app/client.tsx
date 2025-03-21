/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";
import { ThemeProvider } from "~/components/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, queryClient } from "./router";

const router = createRouter();
hydrateRoot(
	document,
	<ThemeProvider defaultTheme="system" attribute="class">
		<QueryClientProvider client={queryClient}>
			<StartClient router={router} />
		</QueryClientProvider>
	</ThemeProvider>,
);
