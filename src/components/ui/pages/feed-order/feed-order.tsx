import { FC } from 'react';

import styles from './feed-order.module.css';
import { OrderInfo } from '@components';

export const FeedOrderUI: FC = () => (
  <main className={styles.container}>
    <OrderInfo />
  </main>
);
