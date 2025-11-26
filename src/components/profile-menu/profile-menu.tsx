import { useCallback, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ProfileMenuUI } from '@ui';

import { useDispatch } from '../../services/store';
import { logoutUser } from '../../reducers/user';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logoutUser()).finally(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login', { replace: true });
    });
  }, [dispatch, navigate]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
