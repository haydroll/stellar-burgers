import { type FC, useEffect } from 'react';

import {
  selectProfileOrders,
  selectProfileOrdersError,
  selectProfileOrdersIsLoading
} from '@selectors';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';

import { useSelector, useDispatch } from '../../services/store';
import { fetchProfileOrders } from '../../reducers/profile-orders';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectProfileOrders);
  const isLoading = useSelector(selectProfileOrdersIsLoading);
  const error = useSelector(selectProfileOrdersError);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error) {
    return <p>Ошибка при загрузке заказов</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
