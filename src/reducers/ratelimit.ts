import { ActionType } from 'typesafe-actions';
import { GithubRateLimit } from '../types';
import * as ratelimit from '../actions/ratelimit';
import store from '../state-store';
import api from '../api';

export type RatelimitActions = ActionType<typeof ratelimit>

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RatelimitState extends GithubRateLimit { }

export const ratelimitInitialState: RatelimitState = {
  remaining: 0,
  limit: 0,
  reset: 0,
};

export default function ratelimitReducer(
  state: RatelimitState = { remaining: 0, limit: 0, reset: 0 }, action: RatelimitActions,
): RatelimitState {
  switch (action.type) {
    case ratelimit.Action.GET:
      api
        .searchRateLimit()
        .then(response => store.dispatch(ratelimit.getFulfilled(response)))
        .catch(reason => store.dispatch(ratelimit.getRejected(reason)));
      return state;
    case ratelimit.Action.GET_REJECTED:
      console.error('QUERY_RATELIMIT_REJECTED', action.payload);
      return state;
    case ratelimit.Action.GET_FULFILLED:
    case ratelimit.Action.UPDATE:
      return { ...action.payload };
    default:
      return state;
  }
}
