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
  const [prevName, setPrevName] = useState<string>('');
  const [uid, setUid] = useState<number>(-1);

  // Items state
  const [items, setItems] = useState<Item[]>([]);
  const [prevItem, setPrevItem] = useState<string>('');
  const [itemId, setItemId] = useState<number>(-1);
  const [price, setPrice] = useState<string>('');
  // const [owners, setOwners] = useState<User[]>([]);

  useEffect(() => {
    setUid(uid + 1);
    console.log('users', users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  useEffect(() => {
    setItemId(itemId + 1);
    console.log('items', items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  function handleAddUser(values: UserValues) {
    const { name } = values;
    setPrevName(name);
    setUsers([...users, { uid, name }]);
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
    setPrevItem(name);
    setPrice(price);
    setItems([...items, { itemId, name, price }]);
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
      <AddUserInput
        label="Name"
        prevName={prevName}
        buttonText="Submit"
        handleAddUser={handleAddUser}
      />

      <UserList
        prevName={prevName}
        users={users}
        handleEditUser={handleEditUser}
      />

      <AddItemInput
        prevItem={prevItem}
        price={price}
        handleAddItem={handleAddItem}
      />

      <ItemList
        prevItem={prevItem}
        items={items}
        handleEditItem={handleEditItem}
      />
    </div>
  );
};

export default App;
