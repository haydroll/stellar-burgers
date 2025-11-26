import type { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { selectUser, selectUserIsLoading } from '@selectors';
import { Preloader } from '@ui';

import { useSelector } from '../../services/store';

import type { GuestRouteProps } from './type';

export const GuestRoute: FC<GuestRouteProps> = ({ children }) => {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  if (user) {
    return <Navigate to='/' replace />;
  }

  return children;
};
