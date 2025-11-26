import { type FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { OrderInfoUI, Preloader } from '@ui';
import { TOrder, type TIngredient } from '@utils-types';
import { selectIngredientsItems } from '@selectors';

import { useSelector } from '../../services/store';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  const ingredients = useSelector(selectIngredientsItems);

  const [order, setOrder] = useState<TOrder>();

  useEffect(() => {
    if (number === undefined) {
      return;
    }

    getOrderByNumberApi(+number)
      .then((res) => res.orders[0])
      .then(setOrder);
  }, []);

  const orderInfo = useMemo(() => {
    if (!order || !ingredients.length) {
      return null;
    }

    const date = new Date(order.createdAt);

    const ingredientsInfo = order.ingredients.reduce<
      Record<string, TIngredient & { count: number }>
    >((info, ingredientId) => {
      if (!info[ingredientId]) {
        const ingredient = ingredients.find(({ _id }) => _id === ingredientId);

        if (ingredient) {
          info[ingredientId] = { ...ingredient, count: 1 };
        }
      } else {
        info[ingredientId].count++;
      }

      return info;
    }, {});

    const total = Object.values(ingredientsInfo).reduce(
      (sum, ingredient) => sum + ingredient.price * ingredient.count,
      0
    );

    return { ...order, ingredientsInfo, date, total };
  }, [order, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
