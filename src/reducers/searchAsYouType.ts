import { ActionType } from 'typesafe-actions';
import * as searchAsYouType from '../actions/searchAsYouType';

const configKey = 'github-search.searchAsYouType';

export type SearchAsYouTypeActions = ActionType<typeof searchAsYouType>

export type SearchAsYouTypeState = boolean;

export const searchAsYouTypeInitialState: SearchAsYouTypeState = localStorage.getItem(configKey)
  ? localStorage.getItem(configKey) === 'true' : true;


export default function searchAsYouTypeReducer(
  state: SearchAsYouTypeState = searchAsYouTypeInitialState, action: SearchAsYouTypeActions,
): SearchAsYouTypeState {
  switch (action.type) {
    case searchAsYouType.Action.ENABLE:
      localStorage.setItem(configKey, 'true');
      return true;
    case searchAsYouType.Action.DISABLE:
      localStorage.setItem(configKey, 'false');
      return false;
    default:
      return state;
  }
}
