import { GithubRepoSearchResponse, GithubRateLimit } from '../types';

export enum Actions {
  NEXT_PAGE = 'github-search/NEXT_PAGE',
  PREV_PAGE = 'github-search/PREV_PAGE',
  UPDATE_DATA = 'github-search/UPDATE_DATA',
  FETCH_DATA = 'github-search/FETCH_DATA',
  FETCH_DATA_FULFILLED = 'github-search/FETCH_DATA_FULFILLED',
  FETCH_DATA_REJECTED = 'github-search/FETCH_DATA_REJECTED',
  UPDATE_RATELIMIT = 'github-search/UPDATE_RATELIMIT',
  QUERY_RATELIMIT = 'github-search/QUERY_RATELIMIT',
  QUERY_RATELIMIT_FULFILLED = 'github-search/QUERY_RATELIMIT_FULFILLED',
  QUERY_RATELIMIT_REJECTED = 'github-search/QUERY_RATELIMIT_REJECTED',
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
export interface UpdateRateLimitAction {
  type: Actions.UPDATE_RATELIMIT;
  data: GithubRateLimit;
}
export interface QueryRateLimitAction { type: Actions.QUERY_RATELIMIT }
export interface QueryRateLimitFulfilledAction {
  type: Actions.QUERY_RATELIMIT_FULFILLED;
  data: GithubRateLimit;
}
export interface QueryRateLimitRejectedAction {
  type: Actions.QUERY_RATELIMIT_REJECTED;
  reason: string;
}

export type ActionTypes =
  | NextPageAction
  | PrevPageAction
  | UpdateDataAction
  | FetchDataAction
  | FetchDataFulfilledAction
  | FetchDataRejectedAction
  | UpdateRateLimitAction
  | QueryRateLimitAction
  | QueryRateLimitFulfilledAction
  | QueryRateLimitRejectedAction;

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
export const updateRateLimit = (data: GithubRateLimit): UpdateRateLimitAction => ({
  type: Actions.UPDATE_RATELIMIT, data,
});
export const queryRateLimit = (): QueryRateLimitAction => ({ type: Actions.QUERY_RATELIMIT });
export const queryRateLimitFulfilled = (
  data: GithubRateLimit,
): QueryRateLimitFulfilledAction => ({
  type: Actions.QUERY_RATELIMIT_FULFILLED, data,
});
export const queryRateLimitRejected = (reason: string): QueryRateLimitRejectedAction => ({
  type: Actions.QUERY_RATELIMIT_REJECTED, reason,
});
