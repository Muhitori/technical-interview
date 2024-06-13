import { IProduct } from "@/interfaces";
import { IconButton } from "@mui/material";
import { Row } from "@tanstack/react-table";
import { FC } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { deleteProductAsync } from "@/store/slices/product.slice";

interface Props {
	row: Row<IProduct>;
}

export const DeleteColumn: FC<Props> = ({ row }) => {
	const dispatch = useDispatch<AppDispatch>();

	const handleDelete = () => {
		dispatch(deleteProductAsync(row.original.id));
	};

	return (
		<IconButton onClick={handleDelete}>
			<DeleteIcon />
		</IconButton>
	);
};
