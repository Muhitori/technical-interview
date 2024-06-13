"use client";

import { SnackbarGenerator } from "@/ui/SnackbarGenerator";
import { SnackbarProvider } from "notistack";
import { FC } from "react";

const MAX_SNACK = 3;

interface Props {
	children: React.ReactNode;
}

export const NotistackProvider: FC<Props> = ({ children }) => {
	return (
		<SnackbarProvider maxSnack={MAX_SNACK}>
			<SnackbarGenerator />
			{children}
		</SnackbarProvider>
	);
};
