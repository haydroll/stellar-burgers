import type { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { selectUser, selectUserIsLoading } from '@selectors';
import { Preloader } from '@ui';

import { useSelector } from '../../services/store';

import type { ProtectedRouteProps } from './type';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
