import * as React from 'react';
import { connect } from 'react-redux';
import RepositoryCard from './RepositoryCard';
import Paginator from './Paginator';
import DebouncedInput from './DebouncedInput';
import { fetchData } from '../actions';
import { GithubRepoSearchResponse } from '../types';
import store, { StoreState } from '../state-store';
import './GithubRepoSearch.sass';

interface Props {
  data: GithubRepoSearchResponse;
  placeholder: string;
  queryMinLength: number;
  // connected from state
  currentPage?: number;
  pagesTotal: number;
  perPage: number;
  perQuery: number;
}

export class GithubRepoSearch extends React.Component<Props, object> {
  onInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;
    if (key === 'Tab') return; // can be fired off when alt tabbing;
    if (key !== 'Enter') return;

    event.stopPropagation(); // prevent debouncing
    this.fetch(event.target as HTMLInputElement);
  }

  onDebounce = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.fetch(event.target as HTMLInputElement);
  }

  fetch(target: HTMLInputElement) {
    const { value } = target;
    if (!value) return;

    const { queryMinLength } = this.props;
    if (value.length < queryMinLength) return;

    const { data } = store.getState();
    if (data && data.query === value) return;

    const { perQuery } = this.props;
    store.dispatch(fetchData(value, 1, perQuery));
  }

  render() {
    const {
      placeholder, currentPage, data,
    } = this.props;

    return (
      <div className="githubRepoSearch">
        <DebouncedInput
          onKeyUp={this.onInputKeyUp}
          onDebounce={this.onDebounce}
          delay={750}
          type="text"
          placeholder={placeholder}
        />

        <Paginator />

        <div className="githubRepoSearch-Items">
          {data && data.items[currentPage] && data.items[currentPage].map(
            repo => (
              <RepositoryCard
                key={repo.id}
                author={repo.owner.login}
                name={repo.name}
                description={repo.description}
                url={repo.html_url}
                watchers={repo.watchers_count}
                stars={repo.stargazers_count}
                forks={repo.forks}
              />
            ),
          )
          }
        </div>

        <Paginator />
      </div>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    currentPage: state.currentPage,
    pagesTotal: state.pagesTotal,
    perPage: state.reposPerPage,
    perQuery: state.reposPerQuery,
    data: state.data,
  };
}

export default connect(mapStateToProps)(GithubRepoSearch);
