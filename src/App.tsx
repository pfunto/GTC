import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import UserInput from './components/UserInput';
import UserList from './components/UserList';

export interface User {
  id: number;
  name: string;
}

export interface EditUserValues {
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [prevName, setPrevName] = useState<string>('');
  const [id, setId] = useState<number>(-1);

  useEffect(() => {
    setId(id + 1);
    console.log('users', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  function handleAddUser(values: { name: string }) {
    const { name } = values;
    setPrevName(name);
    setUsers([...users, { id, name }]);
  }

  function handleEditUser(id: number, values: EditUserValues) {
    const { name } = values;
    let newArr = [...users];
    const curObject = newArr.find((obj) => {
      return obj.id === id;
    });

    if (curObject) {
      curObject.name = name;
    }

    console.log('Edited name: ', curObject);
    // const userId = newArr.findIndex();
  }

  return (
    <div>
      <UserInput
        label="Name"
        id={id}
        prevName={prevName}
        buttonText="Submit"
        handleAddUser={handleAddUser}
      />

      <UserList
        prevName={prevName}
        users={users}
        handleEditUser={handleEditUser}
      />
    </div>
  );
};

export default App;