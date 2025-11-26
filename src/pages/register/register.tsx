import { type FC, type SyntheticEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { registerUser } from '../../reducers/user';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      dispatch(registerUser({ name: userName, email, password })).then(
        (res) => {
          if (registerUser.fulfilled.match(res)) {
            navigate('/login', { replace: true });
          } else {
            console.error('Ошибка регистрации', res.payload);
          }
        }
      );
    },
    [dispatch, userName, password, navigate, email]
  );

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
