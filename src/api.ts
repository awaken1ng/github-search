import {
  GithubRepoSearchResponse, GithubRepoInfoPaginated,
  GithubRateLimit, GithubApiRateLimitResponse,
} from './types';

// const root = 'https://api.github.com';
const root = 'http://127.0.0.1:5000';

export default {
  searchRateLimit: (): Promise<GithubRateLimit> => {
    const url = `${root}/rate_limit`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then((json: GithubApiRateLimitResponse) => resolve(json.resources.search))
        .catch(reason => reject(reason));
    });
  },
  searchRepositories: (
    query: string, queryPage: number, perQuery: number, reposPerPage: number,
  ): Promise<GithubRepoSearchResponse> => {
    const url = `${root}/search/repositories?q=${encodeURIComponent(query)}&page=${queryPage}&per_page=${perQuery}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (response.status !== 200) {
            response.json().then(json => console.error(json));
            reject(Error('API did not respond with status code 200'));
            return;
          }

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
