import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import searchResults from './search-results.module.scss';

function SearchResults() {
  const results = useSelector((state) => state.DATA.CIT);
  
  return (
    <section className={searchResults.wrapper}>
      <ul>
        {results?.lenght > 0 && results?.map(({dateFrom, dateTo, type, country, city, amenities, }, index) => <li>
          <p>{`Result ${index}:`}</p>
          <p>{`${type}${dateFrom}:${dateTo}`}</p>
          <p>{`Country ${country}, city ${city}`}</p>
        </li>)}
      </ul>
    </section>
  );
}

export default SearchResults;