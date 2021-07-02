import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import UserInput from './components/UserInput';
import UserList from './components/UserList';
import ItemInput from './components/ItemInput';
import CurrencyInput from './components/CurrencyInput';

export interface User {
  id: number;
  name: string;
  isEdit: boolean;
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
    setUsers([...users, { id, name, isEdit: false }]);
  }

  function handleEditUser(id: number, values: EditUserValues) {
    const { name } = values;
    let newArr = [...users];
    const curObject = newArr.find((obj) => {
      return obj.id === id;
    });

    if (curObject) {
      curObject.name = name;
      curObject.isEdit = true;
    }

    setUsers([...newArr]);

    console.log('Edited name: ', curObject);
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

      <ItemInput />
    </div>
  );
};

export default App;
