import { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Item, ItemValues, User } from '../App';
import CurrencyInput from './CurrencyInput';
import OwnerList from './OwnerList';

interface EditItemInputProps {
  item: Item;
  items: Item[];
  users: User[];
  handleEditItem: (id: number, values: ItemValues) => void;
  handleRemoveItem: (id: number) => void;
}

const EditItemInput = ({
  item,
  items,
  users,
  handleEditItem,
  handleRemoveItem,
}: EditItemInputProps) => {
  const { itemId, name, price } = item;
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showOwners, setShowOwners] = useState<boolean>(false);

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  function handleOpenOwners() {
    setShowOwners(true);
  }

  function handleCloseOwners() {
    setShowOwners(false);
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
      <StyledFormContainer>
        <form onSubmit={formik.handleSubmit}>
          {isEdit ? (
            <>
              <img src="https://via.placeholder.com/50" alt="placeholder" />
              <div>
                <input
                  id="name"
                  type="text"
                  {...formik.getFieldProps('name')}
                />
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
            <button
              className="form-button"
              type="button"
              onClick={handleOpenOwners}
            >
              add
            </button>
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
      </StyledFormContainer>

      {showOwners ? (
        <StyledOwnerContainer>
          <OwnerList
            item={item}
            items={items}
            users={users}
            handleCloseOwners={handleCloseOwners}
          />
        </StyledOwnerContainer>
      ) : (
        ''
      )}
    </StyledItemInputContainer>
  );
};

const StyledItemInputContainer = styled.div``;

const StyledFormContainer = styled.div`
  position: relative;
  cursor: pointer;
  border: #777 1px solid;
  border-radius: 5px;

  .item-info,
  input {
    max-width: 153px;
  }

  .item__buttons {
    display: flex;
  }

  .item__buttons-clear {
    margin: 0 0.2rem;
  }

  form {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    gap: 1rem;
  }
`;

const StyledOwnerContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  padding: 25% 0;
`;

export default EditItemInput;
