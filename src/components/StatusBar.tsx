import * as React from 'react';
import { connect } from 'react-redux';
import { Autorenew, Done } from '@material-ui/icons';
import Countdown from 'react-countdown-now';
import * as debounceActions from '../actions/searchAsYouType';
import * as ratelimitActions from '../actions/ratelimit';
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

const countdownRenderer = (state: {
  hours: number; minutes: number; seconds: number; completed: boolean;
}) => {
  const {
    hours, minutes, seconds, completed,
  } = state;
  const secondsTotal = (hours * 3600) + (minutes * 60) + seconds;

  if (completed) {
    const { remaining, limit } = store.getState().ratelimit;
    if (remaining !== limit) {
      // have a 1 second delay before sending out the request,
      // otherwise we seem to end get the old rate limit count,
      // but new reset timestamp
      setTimeout(() => store.dispatch(ratelimitActions.get()), 1000);
    }
    return null;
  }

  switch (secondsTotal) {
    case 1:
      return <span>Next reset: in {secondsTotal} second</span>;
    default:
      return <span>Next reset: in {secondsTotal} seconds</span>;
  }
};

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
          <Countdown
            key={ratelimit.reset}
            date={ratelimit.reset * 1000}
            renderer={countdownRenderer}
          />
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
