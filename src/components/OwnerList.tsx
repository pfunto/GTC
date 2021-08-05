import styled from 'styled-components';
import { User } from '../App';
import OwnerButton from './OwnerButton';

interface OwnerListProps {
  users: User[];
  handleAddOwner: (user: User) => void;
  handleRemoveOwner: (user: User) => void;
}

const OwnerList = ({
  users,
  handleAddOwner,
  handleRemoveOwner,
}: OwnerListProps) => {
  return (
    <StyledOwnerListContainer>
      <StyledOwnerList>
        {users.map((user, i) => {
          return (
            <OwnerButton
              user={user}
              key={i}
              handleAddOwner={handleAddOwner}
              handleRemoveOwner={handleRemoveOwner}
            />
          );
        })}
      </StyledOwnerList>
      <button className="owner-submit" type="submit">
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
