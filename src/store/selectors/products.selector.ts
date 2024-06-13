import { RootState } from "..";

export const productListSelector = (state: RootState) => state.product.list;
export const totalProductsSelector = (state: RootState) => state.product.total;
export const pageProductSelector = (state: RootState) => state.product.page;
