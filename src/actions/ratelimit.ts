import { action } from 'typesafe-actions';
import { GithubRateLimit } from '../types';

export enum Action {
  GET = 'github-search/ratelimit/GET',
  GET_FULFILLED = 'github-search/ratelimit/GET_FULFILLED',
  GET_REJECTED = 'github-search/ratelimit/GET_REJECTED',
  UPDATE = 'github-search/ratelimit/UPDATE',
}

export const get = () => action(Action.GET);
export const getFulfilled = (data: GithubRateLimit) => action(Action.GET_FULFILLED, data);
export const getRejected = (reason: string) => action(Action.GET_REJECTED, reason);
export const update = (data: GithubRateLimit) => action(Action.UPDATE, data);
