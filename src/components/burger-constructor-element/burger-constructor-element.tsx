import { type FC, memo, useCallback } from 'react';

import { BurgerConstructorElementUI } from '@ui';

import { removeIngredient, moveIngredient } from '../../reducers/constructor';
import { useDispatch } from '../../services/store';

import type { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = useCallback(() => {
      dispatch(moveIngredient({ indexFrom: index, indexTo: index - 1 }));
    }, [dispatch, index]);

    const handleMoveDown = useCallback(() => {
      dispatch(moveIngredient({ indexFrom: index, indexTo: index + 1 }));
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(removeIngredient(ingredient.id));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
