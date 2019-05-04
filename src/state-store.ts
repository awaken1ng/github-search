import { createStore, combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import paginatorReducer, { PaginatorState, paginatorInitialState } from './reducers/paginator';
import ratelimitReducer, { RatelimitState, ratelimitInitialState } from './reducers/ratelimit';
import githubSearchReducer, { GithubSearchState, githubSearchInitialState } from './reducers/github';

export type RootAction = ActionType<typeof import('./actions')>;

export interface StoreState {
  paginator: PaginatorState;
  ratelimit: RatelimitState;
  github: GithubSearchState;
}

const initialState: StoreState = {
  paginator: paginatorInitialState,
  ratelimit: ratelimitInitialState,
  github: githubSearchInitialState,
};

const store = createStore(combineReducers({
  paginator: paginatorReducer,
  ratelimit: ratelimitReducer,
  github: githubSearchReducer,
}), initialState);

export default store;
