import {
  type FC,
  type SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react';

import { selectUser } from '@selectors';
import { ProfileUI } from '@ui-pages';

import { useDispatch, useSelector } from '../../services/store';
import { updateUser } from '../../reducers/user';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name ?? '',
      email: user?.email ?? ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      const updateData: Partial<typeof formValue> = {};

      if (formValue.name !== user?.name) {
        updateData.name = formValue.name;
      }

      if (formValue.email !== user?.email) {
        updateData.email = formValue.email;
      }

      if (formValue.password) {
        updateData.password = formValue.password;
      }

      dispatch(updateUser(updateData));
    },
    [formValue, user, dispatch]
  );

  const handleCancel = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      setFormValue({
        name: user?.name || '',
        email: user?.email || '',
        password: ''
      });
    },
    [user]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormValue((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
