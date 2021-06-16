import React from 'react';
import styled from 'styled-components';

const UsersList = ({ users }) => {
  return (
    <StyledUserList>
      {users.map((user, i) => {
        const { name, id } = user;
        return (
          <StyledUser key={i}>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            {name} / {id}
          </StyledUser>
        );
      })}
    </StyledUserList>
  );
};

const StyledUserList = styled.div`
  display: flex;
`;

const StyledUser = styled.div`
  display: flex;
  align-items: center;
`;

export default UsersList;
