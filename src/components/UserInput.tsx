import { useFormik } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';
import { EditUserValues } from '../App';

interface UserInputProps {
  label?: string;
  id: number;
  prevName: string;
  buttonText: string;
  handleAddUser?: (values: { name: string }) => void;
  handleEditUser?: (id: number, values: EditUserValues) => void;
}

const UserInput = ({
  label,
  id,
  prevName,
  buttonText,
  handleAddUser,
  handleEditUser,
}: UserInputProps) => {
  // formik
  const formik = useFormik({
    initialValues: {
      name: prevName,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    }),
    onSubmit: (values: { name: string }) => {
      const { name } = values;

      handleAddUser && handleAddUser(values);

      handleEditUser && handleEditUser(id, { name });

      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">{label}</label>
        <input id="name" type="text" {...formik.getFieldProps('name')} />

        <button type="submit">{buttonText}</button>
      </form>

      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}
    </div>
  );
};

export default UserInput;
