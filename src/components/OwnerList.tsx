import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { User } from '../App';
import { userInfo } from 'os';

interface OwnerListProps {
  users: User[];
}

const OwnerList = ({ users }: OwnerListProps) => {
  return (
    <StyledOwnerList>
      <Formik
        initialValues={{
          owners: [],
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <div role="group" aria-labelledby="checkbox-group">
              {users.map((user, i) => {
                const { name } = user;
                return (
                  <label>
                    <Field type="checkbox" name="owners" value={name} />
                    {name}
                  </label>
                );
              })}
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </StyledOwnerList>
  );
};

const StyledOwnerList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

export default OwnerList;
