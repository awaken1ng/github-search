import * as React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { StoreState } from '../state-store';
import './StatusBar.sass';

interface Props {
  remaining: number;
  limit: number;
  reset: number;
}

export function StatusBar({
  remaining, limit, reset,
}: Props) {
  return (
    <div className="statusBar">
      Rate Limit: {remaining}/{limit} Next reset: {moment.utc(reset * 1000).fromNow()}
    </div>
  );
}

function mapStateToProps(state: StoreState) {
  return state.ratelimit;
}

export default connect(mapStateToProps)(StatusBar);
