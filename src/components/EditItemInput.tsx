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
          <>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <div className="item-info">{name}</div>
            <div className="item-info">{price}</div>
          </>
        )}
        <div className="item__buttons">
          <button className="form-button" type="submit" onClick={handleEdit}>
            edit
          </button>
          <button
            className="form-button item__buttons-clear"
            type="button"
            onClick={() => handleRemoveItem(itemId)}
          >
            X
          </button>
        </div>
      </form>
    </StyledItemInputContainer>
  );
};

const StyledItemInputContainer = styled.div`
  cursor: pointer;
  border: #777 1px solid;
  border-radius: 5px;

  &:hover {
    background: rgba(243, 241, 239, 0.5);
  }

  .item-info {
    min-width: 153px;
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
