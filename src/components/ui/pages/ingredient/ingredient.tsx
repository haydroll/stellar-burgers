import { FC } from 'react';

import styles from './ingredient.module.css';
import { IngredientDetails } from '@components';

export const IngredientUI: FC = () => (
  <main className={styles.container}>
    <h3 className={`${styles.title} text text_type_main-large`}>
      Детали ингредиента
    </h3>

    <IngredientDetails />
  </main>
);
