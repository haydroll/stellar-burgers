import type { FC } from 'react';

import { selectUser } from '@selectors';
import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
