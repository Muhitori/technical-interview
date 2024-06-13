import * as Yup from "yup";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { IProduct } from "@/interfaces";
import { Form, Formik } from "formik";
import { InputField } from "./InputField";
import { createProductAsync } from "@/store/slices/product.slice";
import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";

type FormInputs = Omit<IProduct, "id">;

const validationSchema = Yup.object().shape({
	title: Yup.string().max(40, "Too Long!").required("Required"),
	description: Yup.string().required("Required"),
	category: Yup.string().required("Required"),
	price: Yup.number().moreThan(0).required("Required"),
});

const initialValues: FormInputs = {
	title: "",
	description: "",
	category: "",
	price: 0,
};

export const CreateProductDialog = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [open, setOpen] = useState(false);

	const [values, setValues] = useState<FormInputs>(initialValues);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleSubmit = (data: FormInputs) => {
		console.log(data);
		dispatch(createProductAsync(data));
		handleClose();
	};

	return (
		<>
			<Button variant='outlined' onClick={handleOpen}>
				Create Product
			</Button>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Product</DialogTitle>
				<DialogContent>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}>
						<Form>
							<InputField name='title' />
							<InputField name='description' />
							<InputField name='category' />
							<InputField name='price' />
							<DialogActions
								sx={{ display: "flex", justifyContent: "space-between" }}>
								<Button variant='outlined' color='primary' type='submit'>
									Create
								</Button>
								<Button variant='outlined' color='error' onClick={handleClose}>
									Cancel
								</Button>
							</DialogActions>
						</Form>
					</Formik>
				</DialogContent>
			</Dialog>
		</>
	);
};
