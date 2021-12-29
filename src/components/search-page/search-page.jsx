import React, { Fragment } from 'react';
import Header from '../header/header';
import Menu from '../menu/menu';
import SearchResults from '../search-results/search-results';
import SearchForm from '../search-form/search-form';
import searchPage from './search-page.module.scss';


function SearchPage() {
  
  return (
    <Fragment>
      <Header />
      <main className={searchPage.main}>
        <div className='container'>
          <div className={searchPage.wrapper}>
            <Menu />
            <div className={searchPage.formWrapper}>
              <SearchForm />
              <SearchResults />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}

export default SearchPage;

