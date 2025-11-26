import { type FC } from 'react';

import { selectIngredientsIsLoading } from '@selectors';
import { ConstructorPageUI } from '@ui-pages';

import { useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const isLoading = useSelector(selectIngredientsIsLoading);

  return <ConstructorPageUI isIngredientsLoading={isLoading} />;
};
