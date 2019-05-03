import {
  Actions, ActionTypes, fetchDataFulfilled, fetchDataRejected,
  queryRateLimitFulfilled, queryRateLimitRejected,
} from '../actions';
import store, { StoreState } from '../state-store';
import api from '../api';

export default function githubSearchReducer(state: StoreState, action: ActionTypes) {
  switch (action.type) {
    case Actions.NEXT_PAGE:
      if (state.currentPage >= state.pagesTotal) return state;
      const nextPage = state.currentPage + 1;
      return { ...state, currentPage: nextPage };
    case Actions.PREV_PAGE:
      if (state.currentPage === 1) return state;
      return { ...state, currentPage: state.currentPage - 1 };
    case Actions.FETCH_DATA:
      const { query, page, perPage } = action;
      api
        .searchRepositories(query, page, perPage, state.reposPerPage)
        .then(response => store.dispatch(fetchDataFulfilled(response)))
        .catch(reason => store.dispatch(fetchDataRejected(reason)));
      return { ...state, query };
    case Actions.FETCH_DATA_REJECTED:
      console.error('FETCH_DATA_REJECTED', action.reason);
      return state;
    case Actions.FETCH_DATA_FULFILLED:
    case Actions.UPDATE_DATA:
      if (!state.data || state.data.query !== action.data.query) {
        return {
          ...state,
          data: action.data,
          pagesTotal: Math.ceil(action.data.total_count / state.reposPerPage),
        };
      }

      // we're making changes deep in the object,
      // this won't fire off the event that state have changed
      // and update the view, so we make a shallow copy,
      // update items there and update state
      const data = Object.assign({}, state.data);
      data.items = { ...state.data.items, ...action.data.items };
      return { ...state, data };
    case Actions.QUERY_RATELIMIT:
      api
        .searchRateLimit()
        .then(response => store.dispatch(queryRateLimitFulfilled(response)))
        .catch(reason => store.dispatch(queryRateLimitRejected(reason)));
      return state;
    case Actions.QUERY_RATELIMIT_REJECTED:
      console.error('QUERY_RATELIMIT_REJECTED', action.reason);
      return state;
    case Actions.QUERY_RATELIMIT_FULFILLED:
    case Actions.UPDATE_RATELIMIT:
      return { ...state, ratelimit: action.data };
    default:
      return state;
  }
}
