
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRequests, deleteRequest, getPreselectedRequest } from '../../store/actions';
import { MenuItems } from '../../constants/menu';
import { DateFormat } from '../../constants/calendar';
import { getDateInFormat } from '../../utils/dates';
import { toUpperFirstLetter } from '../../utils/common';
import Spinner from '../spinner/spinner';
import searchHistoryPage from './search-history-page.module.scss';

const getContent = (obj) => {
  try {
    const {type} = obj;
    switch (type) {
      case MenuItems.HOTEL: {
        const {city, country, dateStart, dateEnd, amenity,
          requestDate} = obj;
        return (<div>
          <p><b>{type.toUpperCase()}: {getDateInFormat(requestDate, DateFormat.DEFAULT)} </b>
            {getDateInFormat(dateStart, DateFormat.DATE_SLASH)}-{getDateInFormat(dateEnd, DateFormat.DATE_SLASH)}
            <span>{toUpperFirstLetter(city)} {amenity}stars</span>
          </p>
        </div>);
      }
      case MenuItems.FLIGHT: {
        const {city, country, cityTo, countryTo, dateStart, dateEnd,
          requestDate} = obj;
        return (<div>
          <p><b>{type.toUpperCase()}: {getDateInFormat(requestDate, DateFormat.DEFAULT)} </b>
            {getDateInFormat(dateStart, DateFormat.DATE_SLASH)}-{getDateInFormat(dateEnd, DateFormat.DATE_SLASH)}
            <span> From: {toUpperFirstLetter(city)} To: {toUpperFirstLetter(cityTo)} </span>
          </p>
        </div>);
      }
      case MenuItems.CAR: {
        const {city, country, dateStart, dateEnd, serviceСlass,
          requestDate} = obj;
        return (<div>
          <p><b>{type.toUpperCase()}: {getDateInFormat(requestDate, DateFormat.DEFAULT)} </b>
            {getDateInFormat(dateStart, DateFormat.DATE_SLASH)}-{getDateInFormat(dateEnd, DateFormat.DATE_SLASH)} {toUpperFirstLetter(city)} {serviceСlass}
          </p>
        </div>);
      }
      default: return Object.entries(obj).map(([key, value])=> <p>{key}:{value}</p>);
    }
  } catch (error) {
    return <p>Response with empty/incorrect data</p>;
  }
};


function SearchHistoryPage() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.DATA.historyResults);
  const loading = useSelector((state) => state.DATA.dataLoading);
  
  useEffect(() => {
    dispatch(getRequests());
  }, []);

  const onDeleteRequestResult = (id) => {
    dispatch(deleteRequest(id));
  };

  return (
      <main className='container'>
        <ul>
          {loading && <Spinner />}
          {!loading && results.map((resultObj)=> (<li className={searchHistoryPage.itemWrapper} key={resultObj.id}>
            <div className={searchHistoryPage.wrapper}>
              <button className={`button button--delete ${searchHistoryPage.button}`} onClick={() => onDeleteRequestResult(resultObj.id)}></button>
              <div className={searchHistoryPage.item} onClick={() => dispatch(getPreselectedRequest(resultObj))}>
                {getContent(resultObj)}
              </div>
            </div>
          </li>))}
        </ul>
        {(!results || results.length === 0) && <p>There are no saved requests</p>}
      </main>
  );
}

export default SearchHistoryPage;

