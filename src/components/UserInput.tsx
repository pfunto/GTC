import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import styled from 'styled-components';

interface UserInputProps {
  name?: string;
  prevName?: string;
  buttonText: string;
  handleAddUser?: (values: { name: string }) => void;
  handleEditUser?: (values: { name: string }) => void;
}

const UserInput = ({
  name,
  prevName,
  buttonText,
  handleAddUser,
  handleEditUser,
}: UserInputProps) => {
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
    onSubmit: (values: { name: string }) => {
      if (handleAddUser) {
        handleAddUser(values);
      }
      if (handleEditUser) {
        handleEditUser(values);
      }

      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">{name}</label>
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
