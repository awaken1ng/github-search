import * as React from 'react';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as githubActions from '../actions/github';
import { nextPage, prevPage } from '../actions/paginator';
import stateStore, { StoreState, RootAction } from '../state-store';

interface Props {
  // connected from state
  current: number;
  total: number;
  perPage: number;
  toNextPage?: () => void;
  toPrevPage?: () => void;
}

export function Paginator({
  current, total, toPrevPage, toNextPage,
}: Props) {
  if (!total) return null;

  return (
    <div className="githubRepoSearch-Paginator">
      <ArrowBack onClick={toPrevPage} />
      Page: {current} / {total}
      <ArrowForward onClick={toNextPage} />
    </div>
  );
}

function mapStateToProps(state: StoreState) {
  return {
    current: state.paginator.current,
    total: state.paginator.total,
    perPage: state.github.reposPerPage,
  };
}

function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
  return {
    toNextPage: () => {
      const { paginator, github } = stateStore.getState();
      const {
        query, reposPerQuery, data,
      } = github;

      if (!((paginator.current + 1) in data.items)) {
        const nextQueryPage = 2;

        dispatch(githubActions.fetchData(query, nextQueryPage, reposPerQuery));
      }

      dispatch(nextPage());
    },
    toPrevPage: () => dispatch(prevPage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
