import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddUserInput from './components/AddUserInput';
import UserList from './components/UserList';
import AddItemInput from './components/AddItemInput';
import ItemList from './components/ItemList';
import OwnerList from './components/OwnerList';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faSquare, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add(far, faSquare, faCheck);

export interface User {
  uid: number;
  name: string;
}

export interface Item {
  itemId: number;
  name: string;
  price: string;
  owners?: User[];
}

export interface UserValues {
  name: string;
}

export interface ItemValues {
  name: string;
  price: string;
}

const App = () => {
  const localUsers = JSON.parse(localStorage.getItem('userObject') || '[]');
  let lastUserId;
  if (localUsers === null || localUsers.length === 0) {
    lastUserId = 0;
  } else {
    lastUserId = localUsers[localUsers.length - 1].uid + 1;
  }

  const localItems = JSON.parse(localStorage.getItem('itemObject') || '[]');
  let lastItemId;
  if (localItems === null || localItems.length === 0) {
    lastItemId = 0;
  } else {
    lastItemId = localItems[localItems.length - 1].itemId + 1;
  }

  // Users state
  const [users, setUsers] = useState<User[]>(localUsers);
  const [uid, setUid] = useState<number>(lastUserId);

  // Items state
  const [items, setItems] = useState<Item[]>(localItems);
  const [itemId, setItemId] = useState<number>(lastItemId);
  const [owners, setOwners] = useState<User[]>([]);
  const [isAddOwner, setIsAddOwner] = useState<boolean>(false);

  useEffect(() => {
    console.log('users', users);
    localStorage.setItem('userObject', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    console.log('items', items);
    localStorage.setItem('itemObject', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    console.log('isAddOwner', isAddOwner);
  }, [isAddOwner]);

  useEffect(() => {
    console.log('owners', owners);
  }, [owners]);

  // User functions
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

  function handleRemoveUser(uid: number) {
    const newArr = [...users];
    const filteredUser = newArr.filter((user) => user.uid !== uid);
    setUsers([...filteredUser]);
  }

  // Item functions
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

  function handleRemoveItem(itemId: number) {
    const newArr = [...items];
    const filteredItems = newArr.filter((item) => item.itemId !== itemId);
    setItems([...filteredItems]);
  }

  function handleClearItem() {
    setItems([]);
  }

  // Owner Functions

  function handleAddOwners() {
    setIsAddOwner(!isAddOwner);
  }

  function handleUpdateOwners(users: User[]) {
    setOwners(users);
  }

  return (
    <StyledAppContainer>
      <AddUserInput handleAddUser={handleAddUser} />

      <UserList
        users={users}
        handleEditUser={handleEditUser}
        handleRemoveUser={handleRemoveUser}
      />

      <AddItemInput
        handleAddItem={handleAddItem}
        handleClearItem={handleClearItem}
      />

      <ItemList
        items={items}
        handleEditItem={handleEditItem}
        handleRemoveItem={handleRemoveItem}
      />

      <button onClick={() => handleAddOwners()}>Toggle Owners List</button>

      {isAddOwner ? (
        <StyledOwnerContainer>
          <OwnerList users={users} handleUpdateOwners={handleUpdateOwners} />
        </StyledOwnerContainer>
      ) : (
        ''
      )}
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  position: relative;
  margin: 1rem;

  .form-button {
    margin-left: 0.2rem;
  }
  .form-addedit {
    display: flex;
    align-items: flex-start;
  }

  .form-error {
    font-size: 0.8rem;
    color: red;
  }
`;

const StyledOwnerContainer = styled.div`
  width: 100%;
  height: 95%;
  position: absolute;
  top: 0;
  background: rgba(255, 255, 255, 0.9);
`;

export default App;
