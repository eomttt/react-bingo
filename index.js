import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createStore, compose } from 'redux';
import { hot } from 'react-hot-loader/root';

import reducers from './reducers';
import App from './App';
import './App.css';

const enhancer = compose(
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
);

const Store = createStore(reducers, enhancer);
const Hot = hot(App);

ReactDOM.render(
  <Provider store={Store}>
    <Hot />
  </Provider>,
  document.getElementById('root')
);