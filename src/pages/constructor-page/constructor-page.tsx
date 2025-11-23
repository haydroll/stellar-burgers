import { useEffect, type FC } from 'react';

import { selectIngredientsIsLoading } from '@selectors';
import { ConstructorPageUI } from '@ui-pages';

import { useSelector, useDispatch } from '../../services/store';
import { fetchIngredients } from '../../reducers/ingredients';

export const ConstructorPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const isLoading = useSelector(selectIngredientsIsLoading);

  return <ConstructorPageUI isIngredientsLoading={isLoading} />;
};
