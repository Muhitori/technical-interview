"use client";
import { AppDispatch } from "@/store";
import {
	pageProductSelector,
	productListSelector,
	totalProductsSelector,
} from "@/store/selectors/products.selector";
import {
	getAllProductsAsync,
	updateProductAsync,
} from "@/store/slices/product.slice";
import {
	Box,
	Pagination,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import {
	useReactTable,
	getCoreRowModel,
	flexRender,
	SortingState,
	getSortedRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { columns } from "./columns";
import { CreateProductDialog } from "./CreateProductDialog";
import { LIMIT } from "@/constants";

export const MainSection = () => {
	const dispatch = useDispatch<AppDispatch>();
	const list = useSelector(productListSelector);
	const total = useSelector(totalProductsSelector);
	const page = useSelector(pageProductSelector);

	const [sorting, setSorting] = useState<SortingState>([]);

	const table = useReactTable({
		data: list!,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
		rowCount: LIMIT,
		onSortingChange: setSorting,
		state: {
			sorting,
		},
		meta: {
			updateData: (id: number, columnId: string, value: unknown) => {
				dispatch(updateProductAsync({ id, product: { [columnId]: value } }));
			},
		},
	});

	useEffect(() => {
		dispatch(getAllProductsAsync({ page: 1 }));
	}, [dispatch, sorting]);

	if (!list || !total) {
		return null;
	}

	return (
		<Box>
			<CreateProductDialog />
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableCell key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : (
												<Box
													sx={{ cursor: "pointer" }}
													onClick={header.column.getToggleSortingHandler()}>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
												</Box>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{table.getRowModel().rows.map((row) => {
							return (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				sx={{ display: "flex", justifyContent: "center" }}
				page={page || 1}
				count={Math.ceil(total / LIMIT)}
				onChange={(_, page: number) => {
					dispatch(getAllProductsAsync({ page }));
				}}
				variant='outlined'
			/>
		</Box>
	);
};
