import { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User, UserValues } from '../App';

interface EditUserInputProps {
  user: User;
  handleEditUser: (id: number, values: UserValues) => void;
  handleRemoveUser: (id: number) => void;
}

const EditUserInput = ({
  user,
  handleEditUser,
  handleRemoveUser,
}: EditUserInputProps) => {
  const { uid, name } = user;
  const [isEdit, setIsEdit] = useState<boolean>(false);

  function handleEdit() {
    setIsEdit(!isEdit);
  }

  // formik
  const formik = useFormik({
    initialValues: {
      name: name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    }),
    onSubmit: (values: UserValues) => {
      const { name } = values;
      handleEditUser(uid, { name });

      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <StyledUserInputContainer>
      <form onSubmit={formik.handleSubmit}>
        {isEdit ? (
          <input id="name" type="text" {...formik.getFieldProps('name')} />
        ) : (
          <span>{name}</span>
        )}
        <button type="submit" onClick={handleEdit}>
          Edit
        </button>
      </form>

      <button onClick={() => handleRemoveUser(uid)}>X</button>

      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
    </StyledUserInputContainer>
  );
};

const StyledUserInputContainer = styled.div`
  display: flex;
`;

export default EditUserInput;
