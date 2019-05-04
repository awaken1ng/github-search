import * as React from 'react';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as githubActions from '../actions/github';
import * as paginatorActions from '../actions/paginator';
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
        query, reposPerQuery, reposPerPage, data,
      } = github;

      // if on last page, return
      if (paginator.current >= paginator.total) return;

      if (!((paginator.current + 1) in data.items)) {
        const currentQueryPage = Math.max(1, paginator.current / (reposPerQuery / reposPerPage));
        dispatch(githubActions.fetchData(query, currentQueryPage + 1, reposPerQuery));
      }

      dispatch(paginatorActions.nextPage());
    },
    toPrevPage: () => dispatch(paginatorActions.prevPage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
