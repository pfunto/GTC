import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import AddUserInput from './components/AddUserInput';
import UserList from './components/UserList';
import ItemInput from './components/ItemInput';

export interface User {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  owners: User[];
}

export interface EditUserValues {
  name: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [prevName, setPrevName] = useState<string>('');
  const [id, setId] = useState<number>(-1);

  // const [items, setItems] = useState<Item[]>([]);

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
  }

  return (
    <div>
      <AddUserInput
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
