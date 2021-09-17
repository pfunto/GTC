import styled from 'styled-components';
import { Item, User } from '../App';
import { ItemValues } from '../App';
import EditItemInput from './EditItemInput';

interface ItemListProps {
  items: Item[];
  users: User[];
  handleEditItem: (id: number, values: ItemValues) => void;
  handleRemoveItem: (id: number) => void;
}

const ItemList = ({
  items,
  users,
  handleEditItem,
  handleRemoveItem,
}: ItemListProps) => {
  return (
    <StyledItemList>
      {items.map((item, i) => {
        return (
          <EditItemInput
            key={i}
            item={item}
            items={items}
            users={users}
            handleEditItem={handleEditItem}
            handleRemoveItem={handleRemoveItem}
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
