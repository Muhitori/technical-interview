import { IProduct } from "@/interfaces";
import { TextField } from "@mui/material";
import { CellContext, RowData } from "@tanstack/react-table";
import { useState, useEffect, FC, KeyboardEventHandler, useRef } from "react";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void;
	}
}

interface Props {
	context: CellContext<IProduct, string | number>;
	type?: "number" | "text";
}

export const InputColumn: FC<Props> = ({ context, type }) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [error, setError] = useState(false);

	const {
		getValue,
		row,
		column: { id },
		table,
	} = context;

	const initialValue = getValue();
	const [value, setValue] = useState(initialValue);

	const onBlur = () => {
		if (value === initialValue) return;

		const finalValue = type === "text" ? value : Number(value);

		if ((finalValue as string) === "" || (finalValue as number) < 1) {
			setError(true);
			return;
		}

		setError(false);

		table.options.meta?.updateData(row.original.id, id, finalValue);
	};

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	return (
		<TextField
			inputRef={inputRef}
			type={type || "text"}
			variant='standard'
			error={error}
			sx={{ border: error ? "1px solid red" : "" }}
			InputProps={{
				disableUnderline: true,
			}}
			value={value as string}
			onChange={(e) => setValue(e.target.value)}
			onBlur={onBlur}
			onKeyDown={(event) => {
				if (event.code === "Enter") {
					inputRef.current?.blur();
				}
			}}
		/>
	);
};
