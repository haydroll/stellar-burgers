import { type FC, type SyntheticEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginUI } from '@ui-pages';

import { useDispatch } from '../../services/store';
import { loginUser } from '../../reducers/user';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      dispatch(loginUser({ email, password })).then((res) => {
        if (loginUser.fulfilled.match(res)) {
          navigate('/', { replace: true });
        } else {
          setError((res.payload as string) || 'Ошибка авторизации');
        }
      });
    },
    [dispatch, email, password, navigate]
  );

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
