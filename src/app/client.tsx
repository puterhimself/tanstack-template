/// <reference types="vinxi/types/client" />
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start";
import { ThemeProvider } from "~/components/theme-provider";
import { TrpcProvider } from "~/components/trpc-provider";
import { createRouter } from "./router";

const router = createRouter();
hydrateRoot(
	document,
	<ThemeProvider defaultTheme="system" attribute="class">
		<TrpcProvider>
			<StartClient router={router} />
		</TrpcProvider>
	</ThemeProvider>,
);
