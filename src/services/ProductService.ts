import { LIMIT } from "@/constants";
import { IProduct, Params } from "@/interfaces";
import axios from "axios";

const BASE_API = "https://dummyjson.com/products";

export class ProductService {
	static async getAll(params: Params) {
		const urlParams = new URLSearchParams({
			limit: String(LIMIT),
		});

		if (params.page) {
			urlParams.set("skip", String((params.page - 1) * LIMIT));
		}

		const { data } = await axios.get(`${BASE_API}?${urlParams.toString()}`);
		return {
			products: data.products,
			total: data.total,
		};
	}

	static async create(product: Partial<IProduct>) {
		const { data } = await axios.post(`${BASE_API}/add`, product);
		return data;
	}

	static async update(id: number, product: Partial<IProduct>) {
		const { data } = await axios.patch(`${BASE_API}/${id}`, product);
		return data;
	}

	static async delete(id: number) {
		const { data } = await axios.delete(`${BASE_API}/${id}`);
		return data;
	}
}
