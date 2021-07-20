import styled from 'styled-components';
import { User } from '../App';
import { UserValues } from '../App';
import EditUserInput from './EditUserInput';

interface UserListProps {
  users: User[];
  handleEditUser: (uid: number, values: UserValues) => void;
  handleRemoveUser: (uid: number) => void;
}

const UserList = ({
  users,
  handleEditUser,
  handleRemoveUser,
}: UserListProps) => {
  return (
    <StyledUserList>
      {users.map((user, i) => {
        return (
          <StyledUser key={i}>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <StyledUserInfo>
              <EditUserInput
                user={user}
                handleEditUser={handleEditUser}
                handleRemoveUser={handleRemoveUser}
              />
            </StyledUserInfo>
          </StyledUser>
        );
      })}
    </StyledUserList>
  );
};

const StyledUserList = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
`;

const StyledUser = styled.div`
  display: flex;
  align-items: center;
`;

const StyledUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

export default UserList;
