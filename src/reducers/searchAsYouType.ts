import { ActionType } from 'typesafe-actions';
import * as searchAsYouType from '../actions/searchAsYouType';

export type SearchAsYouTypeActions = ActionType<typeof searchAsYouType>

export type SearchAsYouTypeState = boolean;

export const searchAsYouTypeInitialState: SearchAsYouTypeState = false;

export default function searchAsYouTypeReducer(
  state: SearchAsYouTypeState = searchAsYouTypeInitialState, action: SearchAsYouTypeActions,
): SearchAsYouTypeState {
  switch (action.type) {
    case searchAsYouType.Action.ENABLE:
      return true;
    case searchAsYouType.Action.DISABLE:
      return false;
    default:
      return state;
  }
}
