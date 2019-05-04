import { ActionType } from 'typesafe-actions';
import { GithubRepoSearchResponse } from '../types';
import * as github from '../actions/github';
import * as paginator from '../actions/paginator';
import * as ratelimit from '../actions/ratelimit';
import store from '../state-store';
import api from '../api';

export type GithubActions = ActionType<typeof github>

export interface GithubSearchState {
  query: string | undefined;
  data: GithubRepoSearchResponse | undefined;
  reposPerPage: number;
  reposPerQuery: number;
}

export const githubSearchInitialState: GithubSearchState = {
  query: undefined,
  data: undefined,
  reposPerPage: 10,
  reposPerQuery: 30,
};

export default function githubSearchReducer(
  state: GithubSearchState = githubSearchInitialState, action: GithubActions,
): GithubSearchState {
  switch (action.type) {
    case github.Action.FETCH_DATA:
      const { query, page, perPage } = action.payload;
      api
        .searchRepositories(query, page, perPage, state.reposPerPage)
        .then((response) => {
          store.dispatch(github.fetchDataFulfilled(response));
          // update paginator total page count
          const total = Math.ceil(response.total_count / state.reposPerPage);
          store.dispatch(paginator.setTotal(total));
          // update ratelimit status
          store.dispatch(ratelimit.update(response.ratelimit));
        })
        .catch(reason => store.dispatch(github.fetchDataRejected(reason)));
      return { ...state, query };
    case github.Action.FETCH_DATA_REJECTED:
      console.error('FETCH_DATA_REJECTED', action.payload);
      return state;
    case github.Action.FETCH_DATA_FULFILLED:
    case github.Action.UPDATE_DATA:
      // if there is currently no data in the store
      // or if it's a different query, replace it
      if (!state.data || state.data.query !== action.payload.query) {
        return { ...state, data: action.payload };
      }

      // otherwise update the items

      // we're making changes deep in the object,
      // this won't fire off the event that state have changed
      // and update the view, so we make a shallow copy,
      // update items there and update state
      const data = Object.assign({}, state.data);
      data.items = { ...state.data.items, ...action.payload.items };
      return { ...state, data };
    default:
      return state;
  }
}
