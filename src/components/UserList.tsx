import styled from 'styled-components';
import { User } from '../App';
import { UserValues } from '../App';
import EditUserInput from './EditUserInput';

interface UserListProps {
  prevName: string;
  users: User[];
  handleEditUser: (uid: number, values: UserValues) => void;
}

const UserList = ({ prevName, users, handleEditUser }: UserListProps) => {
  return (
    <StyledUserList>
      {users.map((user, i) => {
        const { uid, name } = user;
        return (
          <StyledUser key={i}>
            <img src="https://via.placeholder.com/50" alt="placeholder" />
            <StyledUserInfo>
              <EditUserInput
                uid={uid}
                name={name}
                prevName={prevName}
                buttonText="Edit"
                handleEditUser={handleEditUser}
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
