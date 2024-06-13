import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "./slices/product.slice";

export const store = configureStore({
	reducer: {
		product: ProductReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
