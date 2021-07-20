import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { User, UserValues } from '../App';

interface EditUserInputProps {
  user: User;
  handleEditUser: (id: number, values: UserValues) => void;
}

const EditUserInput = ({ user, handleEditUser }: EditUserInputProps) => {
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
    <div>
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

      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
    </div>
  );
};

export default EditUserInput;
