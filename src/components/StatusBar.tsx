import * as React from 'react';
import { connect } from 'react-redux';
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
}

export class StatusBar extends React.Component<Props, object> {
  onDebounceToggle = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) store.dispatch(debounceActions.enable());
    else store.dispatch(debounceActions.disable());
  }

  render() {
    const {
      ratelimit, debounceDelay, queryMinLength,
    } = this.props;

    return (
      <div className="statusBar">
        <span className="statusBar-column">
          <span>Minimal query length: {queryMinLength}</span>
        </span>
        <span className="statusBar-column">
          <span>Rate Limit: {ratelimit.remaining}/{ratelimit.limit}</span>
          <span>Next Reset: {moment.utc(ratelimit.reset * 1000).fromNow()}</span>
        </span>
        <span className="statusBar-column">
          <span>
            <label htmlFor="debounceToggle">
              <input type="checkbox" id="debounceToggle" onClick={this.onDebounceToggle} />
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
  return { ratelimit: state.ratelimit };
}

export default connect(mapStateToProps)(StatusBar);
