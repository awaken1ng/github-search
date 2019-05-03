import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import GithubRepoSearch from './components/GithubRepoSearch';
import store from './state-store';
import './index.sass';
import * as serviceWorker from './serviceWorker';

const App: React.FC = (): ReactElement => (
  <Provider store={store}>
    <div className="App">
      <GithubRepoSearch
        placeholder="Search GitHub repositories"
        queryMinLength={3}
      />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
