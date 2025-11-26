import { type FC, memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { BurgerIngredientUI } from '@ui';
import type { TConstructorIngredient } from '@utils-types';

import { useDispatch } from '../../services/store';
import { addIngredient } from '../../reducers/constructor';

import type { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = useCallback(() => {
      const newIngredient: TConstructorIngredient = {
        ...ingredient,
        id: uuid()
      };

      dispatch(addIngredient(newIngredient));
    }, [ingredient, dispatch]);

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
