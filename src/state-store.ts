import { createStore } from 'redux';
import githubSearchReducer from './reducers';
import { GithubRepoSearchResponse, GithubRateLimit } from './types';

export interface StoreState {
  query: string | undefined;
  currentPage: number; // currently shown page
  pagesTotal: number; // total number of pages
  data: GithubRepoSearchResponse | undefined;
  reposPerPage: number;
  reposPerQuery: number;
  ratelimit: GithubRateLimit;
}

const initialState: StoreState = {
  query: undefined,
  currentPage: 1,
  pagesTotal: 0,
  data: undefined,
  reposPerPage: 10,
  reposPerQuery: 30,
  ratelimit: {
    limit: 0,
    remaining: 0,
    reset: 0,
  },
};

const store = createStore(githubSearchReducer, initialState);
export default store;
