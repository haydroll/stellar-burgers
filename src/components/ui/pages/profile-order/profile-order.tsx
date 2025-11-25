import { FC } from 'react';

import styles from './profile-order.module.css';
import { OrderInfo } from '@components';

export const ProfileOrderUI: FC = () => (
  <main className={styles.container}>
    <OrderInfo />
  </main>
);
