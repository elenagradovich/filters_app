import React, {Fragment} from 'react';
import { Router as BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Search from '../search-page/search-page';
import SearchHistory from '../search-history-page/search-history-page';
import Notices from '../notices/notices.jsx';
import NotFound from '../not-found/not-found';
import * as RoutePath from '../../constants/route-pathes';
import browserHistory from '../../history/browser-history';
import './styles.scss';

function App() {
  return (
    <Fragment>
      <BrowserRouter history={browserHistory}>
        <Switch>
          <Route path={ RoutePath.MAIN} exact>
            <Redirect to={RoutePath.SEARCH} />
          </Route>
          <Route path={RoutePath.SEARCH } exact component={ Search } />
          <Route path={ RoutePath.SEARCH_HISTORY } exact component={ SearchHistory } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
      <Notices />
    </Fragment>
  );
}

export default App;


