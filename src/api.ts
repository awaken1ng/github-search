import { GithubRepoSearchResponse, GithubRepoInfoPaginated } from './types';
import store from './state-store';

// const root = 'https://api.github.com';
const root = 'http://127.0.0.1:5000';

export class GithubApi {
  static searchRepositories(
    query: string, queryPage: number, perQuery: number,
  ): Promise<GithubRepoSearchResponse> {
    // const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`;
    const url = `http://127.0.0.1:5000/search/repositories?q=${encodeURIComponent(query)}&page=${queryPage}&per_page=${perQuery}`;
    const { reposPerPage } = store.getState();

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          // extract pagination links from headers
          let links = {};
          if (response.headers.has('Link')) {
            links = response.headers
              .get('Link')
              .split(', ')
              .map(item => item
                .match(/<(.+)>; rel="(\w+)"/)
                .slice(1)) // slice off the original string
              .reduce(
                (accumulator, [link, rel]) => ({ ...accumulator, [rel]: link }),
                {},
              ); // format from [[url, rel]] to {rel: url}
          }
          // inject them into response
          response.json().then((json) => {
            // sort items into pages
            const paginated: GithubRepoInfoPaginated = {};
            for (let index = 0; index < json.items.length; index += reposPerPage) {
              const start = index;
              const end = index + reposPerPage;
              const page = (end / reposPerPage) * queryPage;
              paginated[page] = json.items.slice(start, end);
            }
            json.items = paginated;
            resolve({ ...json, query, links });
          });
        })
        .catch(reason => reject(reason));
    });
  }
}

export default {
  searchRepositories: (
    query: string, queryPage: number, perQuery: number, reposPerPage: number,
  ): Promise<GithubRepoSearchResponse> => {
    const url = `${root}/search/repositories?q=${encodeURIComponent(query)}&page=${queryPage}&per_page=${perQuery}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          // extract pagination links from headers
          let links = {};
          if (response.headers.has('Link')) {
            links = response.headers
              .get('Link')
              .split(', ')
              .map(item => item
                .match(/<(.+)>; rel="(\w+)"/)
                .slice(1)) // slice off the original string
              .reduce(
                (accumulator, [link, rel]) => ({ ...accumulator, [rel]: link }),
                {},
              ); // format from [[url, rel]] to {rel: url}
          }
          // inject them into response
          response.json().then((json) => {
            // sort items into pages
            const paginated: GithubRepoInfoPaginated = {};
            for (let index = 0; index < json.items.length; index += reposPerPage) {
              const start = index;
              const end = index + reposPerPage;

              const pagesInQuery = perQuery / reposPerPage;
              const page = (pagesInQuery * (queryPage - 1)) + (end / reposPerPage);
              paginated[page] = json.items.slice(start, end);
            }
            json.items = paginated;
            resolve({ ...json, query, links });
          });
        })
        .catch(reason => reject(reason));
    });
  },
};
