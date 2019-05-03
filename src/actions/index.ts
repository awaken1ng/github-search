import { GithubRepoSearchResponse } from '../types';

export enum Actions {
  NEXT_PAGE = 'github-search/NEXT_PAGE',
  PREV_PAGE = 'github-search/PREV_PAGE',
  UPDATE_DATA = 'github-search/UPDATE_DATA',
  FETCH_DATA = 'github-search/FETCH_DATA',
  FETCH_DATA_FULFILLED = 'github-search/FETCH_DATA_FULFILLED',
  FETCH_DATA_REJECTED = 'github-search/FETCH_DATA_REJECTED',
}

export interface NextPageAction { type: Actions.NEXT_PAGE }
export interface PrevPageAction { type: Actions.PREV_PAGE }
export interface UpdateDataAction {
  type: Actions.UPDATE_DATA;
  data: GithubRepoSearchResponse;
}
export interface FetchDataAction {
  type: Actions.FETCH_DATA;
  query: string;
  page: number;
  perPage: number;
}
export interface FetchDataFulfilledAction {
  type: Actions.FETCH_DATA_FULFILLED;
  data: GithubRepoSearchResponse;
}
export interface FetchDataRejectedAction {
  type: Actions.FETCH_DATA_REJECTED;
  reason: string;
}

export type ActionTypes =
  | NextPageAction
  | PrevPageAction
  | UpdateDataAction
  | FetchDataAction
  | FetchDataFulfilledAction
  | FetchDataRejectedAction;

export const nextPage = (): NextPageAction => ({ type: Actions.NEXT_PAGE });
export const prevPage = (): PrevPageAction => ({ type: Actions.PREV_PAGE });
export const updateData = (data: GithubRepoSearchResponse): UpdateDataAction => ({
  type: Actions.UPDATE_DATA, data,
});
export const fetchData = (query: string, page: number, perPage: number): FetchDataAction => ({
  type: Actions.FETCH_DATA, query, page, perPage,
});
export const fetchDataFulfilled = (data: GithubRepoSearchResponse): FetchDataFulfilledAction => ({
  type: Actions.FETCH_DATA_FULFILLED, data,
});
export const fetchDataRejected = (reason: string): FetchDataRejectedAction => ({
  type: Actions.FETCH_DATA_REJECTED, reason,
});
