import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ItemValues } from '../App';

interface EditItemInputProps {
  itemId: number;
  name: string;
  price: string;
  prevItem: string;
  handleEditItem: (id: number, values: ItemValues) => void;
}

const EditItemInput = ({
  itemId,
  name,
  price,
  prevItem,
  handleEditItem,
}: EditItemInputProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  // formik
  const formik = useFormik({
    initialValues: {
      name: prevItem,
      price: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      price: Yup.string().required('Required'),
    }),
    onSubmit: (values: ItemValues) => {
      const { name, price } = values;
      handleEditItem(itemId, { name, price });
    },
  });

  return (
    <div>
      {isEdit ? (
        <form onSubmit={formik.handleSubmit}>
          <input id="name" type="text" {...formik.getFieldProps('name')} />
          <input id="price" type="text" {...formik.getFieldProps('price')} />
          <button type="submit" onClick={handleEdit}>
            edit
          </button>
        </form>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {name}
          {price}
          <button type="submit" onClick={handleEdit}>
            edit
          </button>
        </form>
      )}

      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
    </div>
  );
};

export default EditItemInput;
