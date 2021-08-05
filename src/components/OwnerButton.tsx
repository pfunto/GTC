import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OwnerButtonProps {
  user: User;
  handleAddOwner: (user: User) => void;
  handleRemoveOwner: (user: User) => void;
}

const OwnerButton = ({
  user,
  handleAddOwner,
  handleRemoveOwner,
}: OwnerButtonProps) => {
  const { name } = user;
  const [isValidOwner, setIsValidOwner] = useState<boolean>(false);

  return (
    <StyledOwnerButtonContainer>
      {isValidOwner ? (
        <StyledOwnerButton
          onClick={() => {
            setIsValidOwner(!isValidOwner);
            handleRemoveOwner(user);
          }}
        >
          <span>{name}</span>
          <FontAwesomeIcon icon={['far', 'check-square']} />
        </StyledOwnerButton>
      ) : (
        <StyledOwnerButton
          onClick={() => {
            setIsValidOwner(!isValidOwner);
            handleAddOwner(user);
          }}
        >
          <span>{name}</span>
          <FontAwesomeIcon icon={['far', 'square']} />
        </StyledOwnerButton>
      )}
    </StyledOwnerButtonContainer>
  );
};

const StyledOwnerButtonContainer = styled.div``;

const StyledOwnerButton = styled.button`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.8rem;
`;

export default OwnerButton;
