import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, compose, createStore } from 'redux';
import { hot } from 'react-hot-loader/root';

import reducers from './reducers';
import App from './App';
import './App.css';

const Store = createStore(reducers);
const Hot = hot(App);

ReactDOM.render(
  <Provider store={Store}>
    <Hot />
  </Provider>,
  document.getElementById('root')
);