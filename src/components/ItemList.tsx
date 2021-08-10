import styled from 'styled-components';
import { Item, User } from '../App';
import { ItemValues } from '../App';
import EditItemInput from './EditItemInput';

interface ItemListProps {
  items: Item[];
  users: User[];
  handleEditItem: (id: number, values: ItemValues) => void;
  handleRemoveItem: (id: number) => void;
  handleAddOwner: (user: User) => void;
  handleRemoveOwner: (user: User) => void;
  handleSetItemOwners: (item: Item) => void;
}

const ItemList = ({
  items,
  users,
  handleEditItem,
  handleRemoveItem,
  handleAddOwner,
  handleRemoveOwner,
  handleSetItemOwners,
}: ItemListProps) => {
  return (
    <StyledItemList>
      {items.map((item, i) => {
        return (
          <EditItemInput
            key={i}
            item={item}
            users={users}
            handleEditItem={handleEditItem}
            handleRemoveItem={handleRemoveItem}
            handleAddOwner={handleAddOwner}
            handleRemoveOwner={handleRemoveOwner}
            handleSetItemOwners={handleSetItemOwners}
          />
        );
      })}
    </StyledItemList>
  );
};

const StyledItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1rem 0;
`;

export default ItemList;
