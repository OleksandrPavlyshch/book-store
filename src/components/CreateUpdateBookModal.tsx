import React, { useContext, useEffect } from 'react';
import { BookContext } from '@/context/context';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BookFormValues, Book } from '@/context/schema';

const validationSchema = yup.object().shape({
  name: yup.string().required('Book name is required'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be a positive number'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required')
});

const CreateUpdateBookModal: React.FC = () => {
  const { state, dispatch } = useContext(BookContext);
  const { modal, modalState } = state;

  const isUpdateModal = modalState.id;
  const initialValues = {
    name: '',
    price: 0,
    category: '',
    description: ''
  };

  const formik = useFormik<BookFormValues>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isUpdateModal) {
        dispatch({
          type: 'EDIT_BOOK',
          payload: values as Book
        });
        return;
      }
      dispatch({
        type: 'ADD_BOOK',
        payload: values
      });
      dispatch({ type: 'CLOSE_MODAL' });
    }
  });

  const handleClose = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const resetFormic = (): void => {
    formik.resetForm({
      values: { ...initialValues, ...modalState }
    });
  };

  useEffect((): void => {
    if (modal) {
      resetFormic();
    }
  }, [modal]);

  return (
    <Dialog open={modal} onClose={handleClose}>
      <DialogTitle>{isUpdateModal ? 'Update' : 'Add'} a Book</DialogTitle>
      <DialogContent>
        {!isUpdateModal && (
          <DialogContentText>
            Please fill in the details for the new book:
          </DialogContentText>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Book Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            fullWidth
            margin="normal"
            id="category"
            name="category"
            label="Category"
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
          />
          <TextField
            fullWidth
            margin="normal"
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {isUpdateModal ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateBookModal;
