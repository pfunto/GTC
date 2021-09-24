import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Item, User } from '../App';
import OwnerButton from './OwnerButton';

interface OwnerListProps {
  item: Item;
  items: Item[];
  users: User[];
  showOwners: boolean;
  setShowOwners: (bool: boolean) => void;
}

const OwnerList = ({
  item,
  items,
  users,
  showOwners,
  setShowOwners,
}: OwnerListProps) => {
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

  // Update Item's owners and close OwnerList
  const ref = useRef<any>();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      // If the modal is open and the clicked target is not within the modal,
      // then close the modal and update owners
      if (showOwners && ref.current && !ref.current.contains(e.target)) {
        handleSetItemOwners(item);
        setShowOwners(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  });

  return (
    <StyledOwnerListContainer ref={ref}>
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
