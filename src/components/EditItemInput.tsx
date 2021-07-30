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
  const [isAbleToEdit, setIsAbleToEdit] = useState<boolean>(false);

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
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <div>
              <input id="name" type="text" {...formik.getFieldProps('name')} />
              {formik.touched.name && formik.errors.name ? (
                <div className="form-error">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <CurrencyInput
                placeholder="$0.00"
                {...formik.getFieldProps('price')}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="form-error">{formik.errors.price}</div>
              ) : null}
            </div>
          </>
        ) : (
          <div className="item__info">
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <span>
              {name} / {price}
            </span>
          </div>
        )}
        {isAbleToEdit ? (
          <div className="item__buttons">
            <button type="submit" onClick={handleEdit}>
              edit
            </button>
            <button
              className="item__buttons-clear"
              type="button"
              onClick={() => handleRemoveItem(itemId)}
            >
              X
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAbleToEdit(!isAbleToEdit);
                setIsEdit(false);
              }}
            >
              ?
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setIsAbleToEdit(!isAbleToEdit)}>
            ?
          </button>
        )}
      </form>
    </StyledItemInputContainer>
  );
};

const StyledItemInputContainer = styled.div`
  .item__info {
    display: flex;
    align-items: center;

    span {
      margin-left: 1rem;
    }
  }

  .item__buttons-clear {
    margin: 0 0.2rem;
  }

  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 500px;
  }
`;

export default EditItemInput;
