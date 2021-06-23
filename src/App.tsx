import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import UserInput from './components/UserInput';
import UserItem from './components/UserItem';

export interface User {
  id: number;
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

  function handleEditUser(values: { name: string }) {
    let newArr = [...users];
    console.log(id);
    // const userId = newArr.findIndex();
  }

  return (
    <div>
      <UserInput
        name="Name"
        prevName={prevName}
        buttonText="Submit"
        handleAddUser={handleAddUser}
      />
      <UserItem
        prevName={prevName}
        users={users}
        handleEditUser={handleEditUser}
      />
    </div>
  );
};

export default App;
