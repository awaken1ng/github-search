import { ActionType } from 'typesafe-actions';
import * as paginator from '../actions/paginator';


export type PaginatorActions = ActionType<typeof paginator>

export interface PaginatorState {
  current: number; // currently shown page
  total: number; // total number of pages
}

export const paginatorInitialState: PaginatorState = {
  current: 1,
  total: 0,
};

export default function paginatorReducer(
  state: PaginatorState = paginatorInitialState, action: PaginatorActions,
): PaginatorState {
  switch (action.type) {
    case paginator.Action.NEXT_PAGE:
      if (state.current >= state.total) return state;
      const nextPage = state.current + 1;
      return { ...state, current: nextPage };
    case paginator.Action.PREV_PAGE:
      if (state.current === 1) return state;
      return { ...state, current: state.current - 1 };
    case paginator.Action.SET_TOTAL:
      return { ...state, total: action.payload };
    default:
      return state;
  }
}
