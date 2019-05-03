import * as React from 'react';
import { ArrowForward, ArrowBack } from '@material-ui/icons';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  ActionTypes, nextPage, prevPage, fetchData,
} from '../actions';
import stateStore, { StoreState } from '../state-store';

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
    current: state.currentPage,
    total: state.pagesTotal,
    perPage: state.reposPerPage,
  };
}

function mapDispatchToProps(dispatch: Dispatch<ActionTypes>) {
  return {
    toNextPage: () => {
      const {
        currentPage, query, reposPerQuery, data,
      } = stateStore.getState();

      if (!((currentPage + 1) in data.items)) {
        const nextQueryPage = 2;

        dispatch(fetchData(query, nextQueryPage, reposPerQuery));
      }
      dispatch(nextPage());
    },
    toPrevPage: () => dispatch(prevPage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
