import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { TConstructorIngredient } from '../utils/types';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ indexFrom: number; indexTo: number }>
    ) => {
      const items = state.ingredients;
      const { indexFrom, indexTo } = action.payload;

      if (
        indexFrom < 0 ||
        indexTo < 0 ||
        indexFrom >= items.length ||
        indexTo >= items.length
      ) {
        return;
      }

      const [movedItem] = items.splice(indexFrom, 1);
      items.splice(indexTo, 0, movedItem);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
