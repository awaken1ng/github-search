import { action } from 'typesafe-actions';
import { GithubRepoSearchResponse } from '../types';

export enum Action {
  FETCH_DATA = 'github-search/FETCH_DATA',
  FETCH_DATA_FULFILLED = 'github-search/FETCH_DATA_FULFILLED',
  FETCH_DATA_REJECTED = 'github-search/FETCH_DATA_REJECTED',
  UPDATE_DATA = 'github-search/UPDATE_DATA',
}

export const fetchData = (
  query: string, page: number, perPage: number,
) => action(Action.FETCH_DATA, { query, page, perPage });
export const fetchDataFulfilled = (
  data: GithubRepoSearchResponse,
) => action(Action.FETCH_DATA_FULFILLED, data);
export const fetchDataRejected = (reason: string) => action(Action.FETCH_DATA_REJECTED, reason);
export const updateData = (data: GithubRepoSearchResponse) => action(Action.UPDATE_DATA, data);
