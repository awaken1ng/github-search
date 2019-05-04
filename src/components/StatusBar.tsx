import * as React from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../state-store';
import './StatusBar.sass';

interface Props {
  remaining: number;
  limit: number;
}

export function StatusBar({
  remaining, limit,
}: Props) {
  return (
    <div className="statusBar">
      Rate Limit: {remaining}/{limit}
    </div>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    remaining: state.ratelimit.remaining,
    limit: state.ratelimit.limit,
  };
}

export default connect(mapStateToProps)(StatusBar);
