import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Item, User } from '../App';
import OwnerButton from './OwnerButton';

interface OwnerListProps {
  item: Item;
  items: Item[];
  users: User[];
  setShowOwners: (bool: boolean) => void;
}

const OwnerList = ({ item, items, users, setShowOwners }: OwnerListProps) => {
  const [owners, setOwners] = useState<User[]>(item.owners);

  useEffect(() => {
    console.log('owners', owners);
  }, [owners]);

  // Owner Functions
  function handleAddOwner(user: User) {
    setOwners([...owners, user]);
  }

  function handleRemoveOwner(user: User) {
    const { uid } = user;
    const newArr = [...owners];
    const filteredOwners = newArr.filter((owner) => owner.uid !== uid);
    setOwners([...filteredOwners]);
  }

  function handleSetItemOwners(item: Item) {
    const { itemId } = item;
    const updatedItem = items.find((item) => item.itemId === itemId);
    if (updatedItem) {
      updatedItem.owners = owners;
    }
  }

  return (
    <StyledOwnerListContainer>
      <StyledOwnerList>
        {users.map((user, i) => {
          const { owners } = item;
          const validOwner = owners.some((x) => x.uid === user.uid);

          return (
            <OwnerButton
              user={user}
              key={i}
              validOwner={validOwner}
              handleAddOwner={handleAddOwner}
              handleRemoveOwner={handleRemoveOwner}
            />
          );
        })}
      </StyledOwnerList>
      <button
        className="owner-submit"
        type="submit"
        onClick={() => {
          handleSetItemOwners(item);
          setShowOwners(false);
        }}
      >
        Submit
      </button>
    </StyledOwnerListContainer>
  );
};

const StyledOwnerListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vh;
  margin: auto;

  .owner-submit {
    margin: 1rem auto;
  }
`;

const StyledOwnerList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export default OwnerList;
