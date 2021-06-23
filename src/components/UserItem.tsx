import React from 'react';
import styled from 'styled-components';
import { User } from '../App';
import UserInput from '../components/UserInput';

interface UserItemProps {
  prevName: string;
  users: User[];
  handleEditUser: (values: { name: string }) => void;
}

const UserItem = ({ prevName, users, handleEditUser }: UserItemProps) => {
  return (
    <StyledUserItem>
      {users.map((user, i) => {
        const { name, id } = user;
        return (
          <StyledUser key={i}>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <UserInput
              prevName={prevName}
              buttonText="Edit"
              handleEditUser={handleEditUser}
            />
            {name} / {id}
          </StyledUser>
        );
      })}
    </StyledUserItem>
  );
};

const StyledUserItem = styled.div`
  display: flex;
`;

const StyledUser = styled.div`
  display: flex;
  align-items: center;
`;

export default UserItem;
