import { type FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { OrderInfoUI, Preloader } from '@ui';
import type { TIngredient } from '@utils-types';
import { selectIngredientsItems, selectOrders, selectOrder } from '@selectors';

import { useSelector } from '../../services/store';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  const order = useSelector(selectOrder);
  const orders = useSelector(selectOrders);
  const ingredients = useSelector(selectIngredientsItems);

  const orderData = useMemo(() => {
    if (order) {
      return order;
    }

    if (number !== undefined && orders) {
      return orders.find((o) => o.number === +number);
    }
  }, [order, orders, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) {
      return null;
    }

    const date = new Date(orderData.createdAt);

    const ingredientsInfo = orderData.ingredients.reduce<
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

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
