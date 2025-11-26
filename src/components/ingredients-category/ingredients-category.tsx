import { forwardRef, useMemo } from 'react';

import { IngredientsCategoryUI } from '@ui';
import { selectBurgerConstructor } from '@selectors';

import { useSelector } from '../../services/store';

import type { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const { bun, ingredients: constructorIngredients } = useSelector(
    selectBurgerConstructor
  );

  const ingredientsCounters = useMemo(() => {
    const counters = constructorIngredients.reduce<Record<string, number>>(
      (counters, { _id: id }) => {
        counters[id] ??= 0;
        counters[id]++;

        return counters;
      },
      {}
    );

    if (bun) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
