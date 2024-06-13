import { IProduct, Params } from "@/interfaces";
import { ProductService } from "@/services/ProductService";
import { snackbarGenerator } from "@/ui/SnackbarGenerator";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface State extends Params {
	list: IProduct[] | null;
	total: number;
}

interface UpdateProductPayload {
	id: number;
	product: Partial<IProduct>;
}

export const getAllProductsAsync = createAsyncThunk(
	"products/getAll",
	async (params: Params) => {
		const data = await ProductService.getAll(params);

		return {
			...params,
			products: data.products,
			total: data.total,
		};
	}
);

export const createProductAsync = createAsyncThunk(
	"products/create",
	async (product: Partial<IProduct>) => {
		const data = await ProductService.create(product);
		return data;
	}
);

export const updateProductAsync = createAsyncThunk(
	"products/update",
	async ({ id, product }: UpdateProductPayload) => {
		const data = await ProductService.update(id, product);
		return data;
	}
);

export const deleteProductAsync = createAsyncThunk(
	"products/delete",
	async (id: number) => {
		const data = await ProductService.delete(id);
		return id;
	}
);

const initialState: State = {
	list: null,
	page: 0,
	total: 0,
};

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(getAllProductsAsync.fulfilled, (state, { payload }) => {
			const { products, ...params } = payload;
			state.list = products;

			if (params.page) {
				state.page = params.page;
			}

			if (params.total) {
				state.total = params.total;
			}
		});
		builder.addCase(createProductAsync.fulfilled, (state, { payload }) => {
			if (!payload || !state.list) return;

			state.list.unshift(payload);
			snackbarGenerator.success("Product created");
		});
		builder.addCase(createProductAsync.rejected, (state, { payload }) => {
			snackbarGenerator.error("Error while creating product");
		});

		builder.addCase(updateProductAsync.fulfilled, (state, { payload }) => {
			if (!payload || !state.list) return;

			state.list = state.list.map((product) => {
				if (product.id === payload.id) {
					return payload;
				}

				return product;
			});
			snackbarGenerator.success("Product updated");
		});
		builder.addCase(updateProductAsync.rejected, (state, { payload }) => {
			snackbarGenerator.error("Error while updating product");
		});
		builder.addCase(deleteProductAsync.fulfilled, (state, { payload }) => {
			if (!payload || !state.list) return;

			state.list = state.list.filter((product) => product.id !== payload);
			snackbarGenerator.success("Product deleted");
		});
		builder.addCase(deleteProductAsync.rejected, (state, { payload }) => {
			snackbarGenerator.error("Error while deleting product");
		});
	},
});

export default productSlice.reducer;
