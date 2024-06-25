"use client";
import { useSnackbar, VariantType, ProviderContext } from "notistack";

let useSnackbarRef: ProviderContext;
export const SnackbarGenerator: React.FC = () => {
	useSnackbarRef = useSnackbar();

	return null;
};

export const snackbarGenerator = {
	success(msg: string) {
		this.toast(msg, "success");
	},
	warning(msg: string) {
		this.toast(msg, "warning");
	},
	info(msg: string) {
		this.toast(msg, "info");
	},
	error(msg: string) {
		this.toast(msg, "error");
	},
	toast(msg: string, variant: VariantType = "default") {
		useSnackbarRef.enqueueSnackbar(msg, {
			variant,
			anchorOrigin: {
				vertical: "bottom",
				horizontal: "right",
			},
		});
	},
};
