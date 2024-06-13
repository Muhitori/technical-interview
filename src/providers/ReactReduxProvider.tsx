"use client";
import { store } from "@/store";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";

interface Props {
	children: ReactNode;
}

export const ReactReduxProvider: FC<Props> = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
