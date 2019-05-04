import { action } from 'typesafe-actions';

export enum Action {
  ENABLE = 'github-search/searchAsYouType/ENABLE',
  DISABLE = 'github-search/searchAsYouType/DISABLE',
}

export const enable = () => action(Action.ENABLE);
export const disable = () => action(Action.DISABLE);
