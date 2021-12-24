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

  debugger
  return (
    <section className={searchResults.wrapper}>
      <ul>
        {results?.map((item, index) => {
          debugger
          const {dateStart, dateEnd, countryFrom, countryTo, cityFrom, cityTo, amenities, type, id } = item;
          
          return (<li key={`result-${id}`} className={searchResults.item}>
            <p><b>{`Result ${index+1}: ${menuType.toUpperCase()}`}</b></p>
            <p>{`DATE:${dateStart}-${dateEnd}`}</p>
            <p>{`FROM:${countryFrom}/${cityFrom}`}</p>
            {menuType === MenuItems.FLIGHT && <p>{`TO:${countryTo}/${cityTo}`}</p>}
            {menuType === MenuItems.HOTEL && <p>{`AMENITIES:${amenities} stars`}</p>}
            {menuType === MenuItems.CAR && `TYPE:${type}`}
          </li>);
        })}
      </ul>
      {results?.length === 0 && 'Данных по результатам запроса не обнаружено, попробуйте изменить парметры поиска'}
    </section>
  );
}

export default SearchResults;


