import { useFormik } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';
import { UserValues } from '../App';

interface AddUserInputProps {
  label?: string;
  prevName: string;
  buttonText: string;
  handleAddUser: (values: UserValues) => void;
}

const AddUserInput = ({
  label,
  prevName,
  buttonText,
  handleAddUser,
}: AddUserInputProps) => {
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
    onSubmit: (values: UserValues) => {
      handleAddUser(values);
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

export default AddUserInput;
