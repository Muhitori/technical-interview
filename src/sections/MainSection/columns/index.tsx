import { IProduct } from "@/interfaces";
import { createColumnHelper } from "@tanstack/react-table";
import { DeleteColumn } from "./DeleteColumn";
import { InputColumn } from "./InputColumn";

const columnHelper = createColumnHelper<IProduct>();

export const columns = [
	columnHelper.accessor("id", {
		cell: (info) => info.getValue(),
		header: () => <span>Number</span>,
		footer: (props) => props.column.id,
		sortUndefined: "last",
		sortDescFirst: false,
	}),
	columnHelper.accessor("title", {
		cell: (info) => <InputColumn context={info} />,
		header: () => <span>Title</span>,
		footer: (props) => props.column.id,
		sortUndefined: "last",
		sortDescFirst: false,
	}),
	columnHelper.accessor("description", {
		cell: (info) => <InputColumn context={info} />,
		header: () => <span>Description</span>,
		footer: (props) => props.column.id,
		sortUndefined: "last",
		sortDescFirst: false,
	}),
	columnHelper.accessor("category", {
		cell: (info) => <InputColumn context={info} />,
		header: () => <span>Category</span>,
		footer: (props) => props.column.id,
		sortUndefined: "last",
		sortDescFirst: false,
	}),
	columnHelper.accessor("price", {
		cell: (info) => <InputColumn context={info} type='number' />,
		header: () => <span>Price</span>,
		footer: (props) => props.column.id,
		sortUndefined: "last",
		sortDescFirst: false,
	}),
	columnHelper.display({
		id: "actions",
		cell: (props) => <DeleteColumn row={props.row} />,
	}),
];
