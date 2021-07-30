import { useFormik } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';
import { UserValues } from '../App';

interface AddUserInputProps {
  handleAddUser: (values: UserValues) => void;
}

const AddUserInput = ({ handleAddUser }: AddUserInputProps) => {
  // formik
  const formik = useFormik({
    initialValues: {
      name: '',
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
      <form className="form-addedit" onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <div>
          <input id="name" type="text" {...formik.getFieldProps('name')} />
          {formik.touched.name && formik.errors.name ? (
            <div className="form-error">{formik.errors.name}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserInput;
