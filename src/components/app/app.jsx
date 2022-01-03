import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '../layout/layout';
import Search from '../search-page/search-page';
import SearchHistory from '../search-history-page/search-history-page';
import Notices from '../notices/notices.jsx';
//import NotFound from '../not-found/not-found';
import * as RoutePath from '../../constants/route-pathes';
import './styles.scss';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout />}>
          <Route index path="/" element={ <Navigate to ={ RoutePath.SEARCH } />} />
          <Route path={ RoutePath.SEARCH } element={ <Search />} />
          <Route path={ RoutePath.SEARCH_HISTORY } element={ <SearchHistory />} />
          <Route path="*" element={ <Navigate to ="/" />} />
        </Route>
      </Routes>
      <Notices />
    </>
  );
}

export default App;


