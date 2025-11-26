import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from './store';

export const selectBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;

export const selectOrder = (state: RootState) => state.order.order;
export const selectOrderIsLoading = (state: RootState) => state.order.isLoading;

export const selectIngredients = (state: RootState) => state.ingredients;
export const selectIngredientsItems = (state: RootState) =>
  state.ingredients.items;
export const selectIngredientsIsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectFeed = (state: RootState) => state.feed;
export const selectFeedOrders = (state: RootState) => state.feed.orders;
export const selectFeedIsLoading = (state: RootState) => state.feed.isLoading;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;
export const selectProfileOrdersIsLoading = (state: RootState) =>
  state.profileOrders.isLoading;
export const selectProfileOrdersError = (state: RootState) =>
  state.profileOrders.error;

export const selectOrders = createSelector(
  [selectFeedOrders, selectProfileOrders],
  (feedOrders, profileOrders) => [...feedOrders, ...profileOrders]
);
