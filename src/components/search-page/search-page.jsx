import React, { Fragment, useState, useEffect } from 'react';
import Header from '../header/header';
import Menu from '../menu/menu';
import SearchResults from '../search-results/search-results';
import SearchForm from '../search-form/search-form';
import { MenuItems } from '../../constants/menu';
import PropTypes from 'prop-types';
//import {  } from '../../store/actions';
import searchPage from './search-page.module.scss';

function SearchPage(props) {
  const [activeMenuItem, setActiveItem] = useState(MenuItems.FLIGHT);

  return (
    <Fragment>
      <Header />
      <main className={searchPage.main}>
        <div className='container'>
          <div className={searchPage.wrapper}>
            <Menu setActiveItem={setActiveItem} activeItem={activeMenuItem} />
            <div>
              <SearchForm activeType={activeMenuItem} />
              <SearchResults />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default SearchPage;

