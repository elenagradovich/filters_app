import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import searchResults from './search-results.module.scss';
import { MenuItems } from '../../constants/menu';
import Spinner from '../spinner/spinner';

// const findCountryByCode = (code, arr) => {
//   if(code && arr) arr.find((item) => item.value === code)?.label.toLowerCase();
// }

function SearchResults() {
  const menuType = useSelector((state) => state.DATA.menuType);
  const results = useSelector((state) => state.DATA.searchResults);
  const loading = useSelector((state) => state.DATA.resultsLoading);
  
  return (
    <section className={searchResults.wrapper}>
      <ul>
        {loading && <Spinner /> }
        {results?.map((item, index) => {
          const {dateStart, dateEnd, country, countryTo, city, cityTo, amenity, serviceClass, id } = item;
          return (<li key={`result-${id}`} className={searchResults.item}>
            <p><b>{`Result ${index+1}: ${menuType.toUpperCase()}`}</b></p>
            <p>{`DATE:${dateStart}-${dateEnd}`}</p>
            <p>{`FROM:${country}/${city}`}</p>
            {menuType === MenuItems.FLIGHT && <p>{`TO:${countryTo}/${cityTo}`}</p>}
            {menuType === MenuItems.HOTEL && <p>{`AMENITIES:${amenity} stars`}</p>}
            {menuType === MenuItems.CAR && `TYPE:${serviceClass}`}
          </li>);
        })}
      </ul>
      {results?.length === 0 && 'No data was found by the query results, try to change the search parameters'}
    </section>
  );
}

export default SearchResults;


