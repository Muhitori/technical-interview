import { TextField } from "@mui/material";
import { Field, FieldProps } from "formik";
import { FC } from "react";

interface Props {
	name: string;
}

const capitalize = (str: string) => str[0].toUpperCase() + str.slice(1);

export const InputField: FC<Props> = ({ name }) => {
	return (
		<Field name={name}>
			{({ field, form }: FieldProps) => (
				<TextField
					fullWidth
					sx={{ mb: 1 }}
					error={Boolean(form.errors[name])}
					label={capitalize(name)}
					helperText={form.errors[name] && `${form.errors[name]}`}
					{...field}
				/>
			)}
		</Field>
	);
};
