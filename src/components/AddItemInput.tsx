import { useFormik } from 'formik';
import * as Yup from 'yup';
import CurrencyInput from './CurrencyInput';
import { ItemValues } from '../App';

interface AddItemInputProps {
  prevItem: string;
  price: string;
  handleAddItem: (values: ItemValues) => void;
}

const AddItemInput = ({
  prevItem,
  price,
  handleAddItem,
}: AddItemInputProps) => {
  // formik
  const formik = useFormik({
    initialValues: {
      name: prevItem,
      price: price,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      price: Yup.string().required('Required'),
    }),
    onSubmit: (values: ItemValues) => {
      handleAddItem(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Item</label>
        <input id="name" type="text" {...formik.getFieldProps('name')} />

        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label htmlFor="price">Price</label>
        {/* <input id="price" type="number" {...formik.getFieldProps('price')} /> */}
        <CurrencyInput placeholder="$0.00" {...formik.getFieldProps('price')} />

        {formik.touched.price && formik.errors.price ? (
          <div>{formik.errors.price}</div>
        ) : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddItemInput;
