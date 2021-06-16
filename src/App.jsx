import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
// import { useFetch } from './useFetch';
import { useForm } from './useForm';
import UsersList from './components/UsersList';

const App = () => {
  const [values, handleChange] = useForm({
    price: 0,
    firstName: '',
  });

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('users', users);
  }, [users]);

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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleButtonClick = (e) => {
    setId(id + 1);
    setUsers([...users, { name, id }]);
  };

  return (
    <div>
      {/* <StyledUserInput>
        <input
          type="text"
          value={name}
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleButtonClick}>Add input</button>
        {errorMsg}
      </StyledUserInput> */}

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" {...formik.getFieldProps('name')} />

        <button type="submit">Submit</button>
      </form>

      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <UsersList users={users} />
    </div>
  );
};

const StyledUserInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default App;
