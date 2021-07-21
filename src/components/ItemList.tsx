import styled from 'styled-components';
import { Item } from '../App';
import { ItemValues } from '../App';
import EditItemInput from './EditItemInput';

interface ItemListProps {
  items: Item[];
  handleEditItem: (id: number, values: ItemValues) => void;
  handleRemoveItem: (id: number) => void;
}

const ItemList = ({
  items,
  handleEditItem,
  handleRemoveItem,
}: ItemListProps) => {
  return (
    <StyledItemList>
      {items.map((item, i) => {
        return (
          <StyledItem key={i}>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <StyledItemInfo>
              <EditItemInput
                item={item}
                handleEditItem={handleEditItem}
                handleRemoveItem={handleRemoveItem}
              />
            </StyledItemInfo>
          </StyledItem>
        );
      })}
    </StyledItemList>
  );
};

const StyledItemList = styled.div``;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledItemInfo = styled.div``;

export default ItemList;
