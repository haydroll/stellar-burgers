import { type FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import type { TIngredient } from '@utils-types';
import { OrderCardUI } from '@ui';
import { selectIngredientsItems } from '@selectors';

import { useSelector } from '../../services/store';

import type { OrderCardProps } from './type';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const ingredients = useSelector(selectIngredientsItems);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) {
      return null;
    }

    const ingredientsInfo = order.ingredients.reduce<TIngredient[]>(
      (info, ingredientId) => {
        const ingredient = ingredients.find(({ _id }) => _id === ingredientId);

        if (ingredient) {
          info.push(ingredient);
        }

        return info;
      },
      []
    );

    const total = ingredientsInfo.reduce((sum, item) => sum + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date: new Date(order.createdAt)
    };
  }, [order, ingredients]);

  if (!orderInfo) {
    return null;
  }

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
