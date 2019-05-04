import { action } from 'typesafe-actions';

export enum Action {
  NEXT_PAGE = 'github-search/paginator/NEXT_PAGE',
  PREV_PAGE = 'github-search/paginator/PREV_PAGE',
  SET_TOTAL = 'github-search/paginator/SET_TOTAL'
}

export const nextPage = () => action(Action.NEXT_PAGE);
export const prevPage = () => action(Action.PREV_PAGE);
export const setTotal = (total: number) => action(Action.SET_TOTAL, total);
