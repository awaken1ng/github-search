import { createStore } from 'redux';
import githubSearchReducer from './reducers';
import { GithubRepoSearchResponse } from './types';

export interface StoreState {
  query: string | undefined;
  currentPage: number; // currently shown page
  pagesTotal: number; // total number of pages
  data: GithubRepoSearchResponse | undefined;
  reposPerPage: number;
  reposPerQuery: number;
}

const initialState: StoreState = {
  query: undefined,
  currentPage: 1,
  pagesTotal: 0,
  data: undefined,
  reposPerPage: 10,
  reposPerQuery: 30,
};

const store = createStore(githubSearchReducer, initialState);
export default store;
