import { useFormik } from 'formik';
import * as Yup from 'yup';
import CurrencyInput from './CurrencyInput';

const ItemInput = () => {
  // formik
  const formik = useFormik({
    initialValues: {
      itemName: '',
      price: '',
    },
    validationSchema: Yup.object({
      itemName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      price: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="itemName">Item</label>
        <input
          id="itemName"
          type="text"
          {...formik.getFieldProps('itemName')}
        />

        {formik.touched.itemName && formik.errors.itemName ? (
          <div>{formik.errors.itemName}</div>
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

export default ItemInput;
