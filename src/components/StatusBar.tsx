import * as React from 'react';
import { connect } from 'react-redux';
import { Autorenew, Done } from '@material-ui/icons';
import moment from 'moment';
import * as debounceActions from '../actions/searchAsYouType';
import store, { StoreState } from '../state-store';
import './StatusBar.sass';

interface Props {
  ratelimit: {
    remaining: number;
    limit: number;
    reset: number;
  };
  debounceDelay: number;
  queryMinLength: number;
  isLoading: boolean;
  searchAsYouType: boolean;
}

export class StatusBar extends React.Component<Props, object> {
  onDebounceToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) store.dispatch(debounceActions.enable());
    else store.dispatch(debounceActions.disable());
  }

  render() {
    const {
      ratelimit, debounceDelay, queryMinLength, isLoading, searchAsYouType,
    } = this.props;

    return (
      <div className="statusBar">
        <span className="statusBar-column">
          <span>Minimal query length: {queryMinLength}</span>
        </span>
        <span className="statusBar-column">
          <span>Rate limit: {ratelimit.remaining}/{ratelimit.limit}</span>
          <span>Next reset: {moment.utc(ratelimit.reset * 1000).fromNow()}</span>
        </span>
        <span className="statusBar-column">
          <span>{isLoading ? <Autorenew /> : <Done />}</span>
          <span>
            <label htmlFor="debounceToggle">
              <input
                type="checkbox"
                id="debounceToggle"
                checked={searchAsYouType}
                onChange={this.onDebounceToggle}
              />
              Search-as-you-type
            </label>
          </span>
          <span>Debounce delay: {debounceDelay}ms</span>
        </span>

      </div>
    );
  }
}


function mapStateToProps(state: StoreState) {
  return {
    ratelimit: state.ratelimit,
    isLoading: state.github.isLoading,
    searchAsYouType: state.searchAsYouType,
  };
}

export default connect(mapStateToProps)(StatusBar);
