import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import browserHistory from './history/browser-history';
import appStore from './store/appStore';

const rootElement = document.getElementById("root");

render(
  <Provider store={appStore}>
    <BrowserRouter history={browserHistory}>
      <App />
    </BrowserRouter>,
  </Provider>,
  rootElement);
