import type { FC } from 'react';
import { useParams } from 'react-router-dom';

import { IngredientDetailsUI, Preloader } from '@ui';
import { selectIngredients } from '@selectors';

import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { items, isLoading } = useSelector(selectIngredients);

  const ingredientData = items.find((item) => item._id === id);

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
