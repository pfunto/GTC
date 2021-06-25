import styled from 'styled-components';
import { User } from '../App';
import UserInput from './UserInput';
import { EditUserValues } from '../App';

interface UserListProps {
  prevName: string;
  users: User[];
  handleEditUser: (id: number, values: EditUserValues) => void;
}

const UserList = ({ prevName, users, handleEditUser }: UserListProps) => {
  return (
    <StyledUserList>
      {users.map((user, i) => {
        const { name, id } = user;
        return (
          <StyledUser key={i}>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <UserInput
              id={id}
              prevName={prevName}
              buttonText="Edit"
              handleEditUser={handleEditUser}
            />
            {name} / {id}
          </StyledUser>
        );
      })}
    </StyledUserList>
  );
};

const StyledUserList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledUser = styled.div`
  display: flex;
  align-items: center;
`;

export default UserList;
