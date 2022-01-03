import React from 'react';
import Menu from '../menu/menu';
import SearchResults from '../search-results/search-results';
import SearchForm from '../search-form/search-form';
import searchPage from './search-page.module.scss';

function SearchPage() {
  return (
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
  );
}

export default SearchPage;

