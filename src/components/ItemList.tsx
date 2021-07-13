import styled from 'styled-components';
import { Item } from '../App';
import { ItemValues } from '../App';
import EditItemInput from './EditItemInput';

interface ItemListProps {
  items: Item[];
  handleEditItem: (id: number, values: ItemValues) => void;
}

const ItemList = ({ items, handleEditItem }: ItemListProps) => {
  return (
    <StyledItemList>
      {items.map((item, i) => {
        return (
          <StyledItem key={i}>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <StyledItemInfo>
              <EditItemInput item={item} handleEditItem={handleEditItem} />
            </StyledItemInfo>
          </StyledItem>
        );
      })}
    </StyledItemList>
  );
};

const StyledItemList = styled.div``;

const StyledItem = styled.div``;

const StyledItemInfo = styled.div``;

export default ItemList;
