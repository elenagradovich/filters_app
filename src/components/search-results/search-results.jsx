import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import searchResults from './search-results.module.scss';
import { MenuItems } from '../../constants/menu';
import { resetResponseData } from '../../store/actions';

// const findCountryByCode = (code, arr) => {
//   if(code && arr) arr.find((item) => item.value === code)?.label.toLowerCase();
// }

function SearchResults() {
  const menuType = useSelector((state) => state.DATA.menuType);
  const results = useSelector((state) => state.DATA.searchResults);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(resetResponseData())
  }, [menuType]);

  return (
    <section className={searchResults.wrapper}>
      <ul>
        {results?.map((item, index) => {
          const {dateStart, dateEnd, country, countryTo, city, cityTo, amenities, serviceСlass, id } = item;
          
          return (<li key={`result-${id}`} className={searchResults.item}>
            <p><b>{`Result ${index+1}: ${menuType.toUpperCase()}`}</b></p>
            <p>{`DATE:${dateStart}-${dateEnd}`}</p>
            <p>{`FROM:${country}/${city}`}</p>
            {menuType === MenuItems.FLIGHT && <p>{`TO:${countryTo}/${cityTo}`}</p>}
            {menuType === MenuItems.HOTEL && <p>{`AMENITIES:${amenities} stars`}</p>}
            {menuType === MenuItems.CAR && `TYPE:${serviceСlass}`}
          </li>);
        })}
      </ul>
      {results?.length === 0 && 'No data was found by the query results, try to change the search parameters'}
    </section>
  );
}

export default SearchResults;


