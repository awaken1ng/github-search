import { createStore, combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';
import paginatorReducer, { PaginatorState, paginatorInitialState } from './reducers/paginator';
import ratelimitReducer, { RatelimitState, ratelimitInitialState } from './reducers/ratelimit';
import githubSearchReducer, { GithubSearchState, githubSearchInitialState } from './reducers/github';
import searchAsYouTypeReducer, { SearchAsYouTypeState, searchAsYouTypeInitialState } from './reducers/searchAsYouType';

export type RootAction = ActionType<typeof import('./actions')>;

export interface StoreState {
  paginator: PaginatorState;
  ratelimit: RatelimitState;
  github: GithubSearchState;
  searchAsYouType: SearchAsYouTypeState;
}

const initialState: StoreState = {
  paginator: paginatorInitialState,
  ratelimit: ratelimitInitialState,
  github: githubSearchInitialState,
  searchAsYouType: searchAsYouTypeInitialState,
};

const store = createStore(combineReducers({
  paginator: paginatorReducer,
  ratelimit: ratelimitReducer,
  github: githubSearchReducer,
  searchAsYouType: searchAsYouTypeReducer,
}), initialState);

export default store;
