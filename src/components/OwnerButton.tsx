import { useState } from 'react';
import styled from 'styled-components';
import { User } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface OwnerButtonProps {
  user: User;
}

const OwnerButton = ({ user }: OwnerButtonProps) => {
  const { name } = user;
  const [isValidOwner, setIsValidOwner] = useState<boolean>(false);
  return (
    <StyledOwnerButton onClick={() => setIsValidOwner(!isValidOwner)}>
      <span>{name}</span>
      {isValidOwner ? (
        <FontAwesomeIcon icon={['far', 'check-square']} />
      ) : (
        <FontAwesomeIcon icon={['far', 'square']} />
      )}
    </StyledOwnerButton>
  );
};

const StyledOwnerButton = styled.button``;

export default OwnerButton;
