import { useFormik } from 'formik';
import styled from 'styled-components';
import * as Yup from 'yup';
import CurrencyInput from './CurrencyInput';
import { ItemValues } from '../App';

interface AddItemInputProps {
  handleAddItem: (values: ItemValues) => void;
  handleClearItem: () => void;
}

const AddItemInput = ({
  handleAddItem,
  handleClearItem,
}: AddItemInputProps) => {
  // formik
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
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
    <StyledAddItemInputContainer>
      <form className="form-addedit" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Item</label>
        <div className="form-error">
          <input id="name" type="text" {...formik.getFieldProps('name')} />

          {formik.touched.name && formik.errors.name ? (
            <div>{formik.errors.name}</div>
          ) : null}
        </div>

        <label htmlFor="price">Price</label>
        <div className="form-error">
          {/* <input id="price" type="number" {...formik.getFieldProps('price')} /> */}
          <CurrencyInput
            placeholder="$0.00"
            {...formik.getFieldProps('price')}
          />

          {formik.touched.price && formik.errors.price ? (
            <div>{formik.errors.price}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={() => handleClearItem()}>
          Clear All
        </button>
      </form>
    </StyledAddItemInputContainer>
  );
};

const StyledAddItemInputContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

export default AddItemInput;
