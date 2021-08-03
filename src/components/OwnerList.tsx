import styled from 'styled-components';
import { User } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OwnerListProps {
  users: User[];
  handleUpdateOwners: (user: User) => void;
}

const OwnerList = ({ users, handleUpdateOwners }: OwnerListProps) => {
  return (
    <StyledOwnerList>
      {users.map((user, i) => {
        const { name } = user;
        return (
          <StyledOwner key={i} onClick={() => handleUpdateOwners(user)}>
            <span>{name}</span>
            <FontAwesomeIcon icon={['far', 'square']} />
          </StyledOwner>
        );
      })}
    </StyledOwnerList>
  );
};

const StyledOwnerList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StyledOwner = styled.button``;

export default OwnerList;
