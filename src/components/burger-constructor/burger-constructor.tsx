import { type FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  selectBurgerConstructor,
  selectOrderIsLoading,
  selectOrder,
  selectUser
} from '@selectors';
import { BurgerConstructorUI } from '@ui';

import { useSelector, useDispatch } from '../../services/store';
import { createOrder, closeModal } from '../../reducers/order';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const burgerConstructor = useSelector(selectBurgerConstructor);
  const isLoading = useSelector(selectOrderIsLoading);
  const order = useSelector(selectOrder);
  const user = useSelector(selectUser);

  const onOrderClick = useCallback(() => {
    if (!user) {
      return navigate('/login');
    }

    if (!burgerConstructor.bun || isLoading) {
      return;
    }

    const ingredientIds = [
      burgerConstructor.bun._id,
      ...burgerConstructor.ingredients.map((i) => i._id),
      burgerConstructor.bun._id
    ];

    dispatch(createOrder(ingredientIds));
  }, [
    burgerConstructor.bun,
    burgerConstructor.ingredients,
    dispatch,
    isLoading,
    navigate,
    user
  ]);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const price = useMemo(() => {
    const bunsPrice = burgerConstructor.bun
      ? burgerConstructor.bun.price * 2
      : 0;

    const ingredientsPrice = burgerConstructor.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );

    return bunsPrice + ingredientsPrice;
  }, [burgerConstructor.bun, burgerConstructor.ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      constructorItems={burgerConstructor}
      orderRequest={isLoading}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={handleCloseModal}
    />
  );
};
