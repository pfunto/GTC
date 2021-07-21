import { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Item, ItemValues } from '../App';
import CurrencyInput from './CurrencyInput';

interface EditItemInputProps {
  item: Item;
  handleEditItem: (id: number, values: ItemValues) => void;
  handleRemoveItem: (id: number) => void;
}

const EditItemInput = ({
  item,
  handleEditItem,
  handleRemoveItem,
}: EditItemInputProps) => {
  const { itemId, name, price } = item;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  // formik
  const formik = useFormik({
    initialValues: {
      name: name,
      price: price,
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
    <StyledItemInputContainer>
      <form onSubmit={formik.handleSubmit}>
        {isEdit ? (
          <>
            <input id="name" type="text" {...formik.getFieldProps('name')} />
            <CurrencyInput
              placeholder="$0.00"
              {...formik.getFieldProps('price')}
            />
          </>
        ) : (
          <span>
            {name} / {price}
          </span>
        )}
        <button type="submit" onClick={handleEdit}>
          edit
        </button>
      </form>

      <button onClick={() => handleRemoveItem(itemId)}>X</button>

      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
    </StyledItemInputContainer>
  );
};

const StyledItemInputContainer = styled.div`
  display: flex;
`;

export default EditItemInput;
