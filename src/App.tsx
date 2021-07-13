import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
import AddUserInput from './components/AddUserInput';
import UserList from './components/UserList';
import AddItemInput from './components/AddItemInput';
import ItemList from './components/ItemList';

export interface User {
  uid: number;
  name: string;
}

export interface Item {
  itemId: number;
  name: string;
  price: string;
  // owners: User[];
}

export interface UserValues {
  name: string;
}

export interface ItemValues {
  name: string;
  price: string;
}

const App = () => {
  // Users state
  const [users, setUsers] = useState<User[]>([]);
  const [uid, setUid] = useState<number>(0);

  // Items state
  const [items, setItems] = useState<Item[]>([]);
  const [itemId, setItemId] = useState<number>(0);
  // const [owners, setOwners] = useState<User[]>([]);

  useEffect(() => {
    console.log('users', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    console.log('items', items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function handleAddUser(values: UserValues) {
    const { name } = values;
    setUsers([...users, { uid, name }]);
    setUid(uid + 1);
  }

  function handleEditUser(uid: number, values: UserValues) {
    const { name } = values;
    let newArr = [...users];
    const curObject = newArr.find((obj) => {
      return obj.uid === uid;
    });

    if (curObject) {
      curObject.name = name;
    }

    // spread operator mutates without setUser?
    setUsers([...newArr]);

    console.log('Edited name: ', curObject);
  }

  function handleAddItem(values: ItemValues) {
    const { name, price } = values;
    setItems([...items, { itemId, name, price }]);
    setItemId(itemId + 1);
  }

  function handleEditItem(itemId: number, values: ItemValues) {
    const { name, price } = values;
    let newArr = [...items];
    const curObject = newArr.find((obj) => {
      return obj.itemId === itemId;
    });

    if (curObject) {
      curObject.name = name;
      curObject.price = price;
    }

    setItems([...newArr]);

    console.log('Edited item: ', curObject);
  }

  return (
    <div>
      <AddUserInput handleAddUser={handleAddUser} />

      <UserList users={users} handleEditUser={handleEditUser} />

      <AddItemInput handleAddItem={handleAddItem} />

      <ItemList items={items} handleEditItem={handleEditItem} />
    </div>
  );
};

export default App;
