import styled from 'styled-components';
import { User } from '../App';
import OwnerButton from './OwnerButton';

interface OwnerListProps {
  users: User[];
  handleUpdateOwners: (users: User[]) => void;
}

const OwnerList = ({ users, handleUpdateOwners }: OwnerListProps) => {
  return (
    <StyledOwnerList>
      <StyledOwnerListContainer>
        {users.map((user, i) => {
          return <OwnerButton user={user} key={i} />;
        })}
      </StyledOwnerListContainer>
      <button type="submit">Submit</button>
    </StyledOwnerList>
  );
};

const StyledOwnerList = styled.div``;

const StyledOwnerListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export default OwnerList;
