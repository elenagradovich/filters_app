
import React, { Fragment, useEffect } from 'react';
import Header from '../header/header';
import { useSelector, useDispatch } from 'react-redux';
import {getRequests, deleteRequest, getPreselectedRequest} from '../../store/actions';
import { MenuItems } from '../../constants/menu';
import { DateFormat } from '../../constants/calendar';
import { getDateInFormat } from '../../utils/dates';
import {toUpperFirstLetter} from '../../utils/common';
import searchHistoryPage from './search-history-page.module.scss';

const getContent = (obj) => {
  const {type} = obj;
  debugger
  switch (type) {
    case MenuItems.HOTEL: {
      const {activeCityFrom, countryFrom, dateFrom, dateTo, amenity,
        requestDate} = obj;
      return (<div>
        <p><b>{type.toUpperCase()}: {getDateInFormat(requestDate, DateFormat.DEFAULT)} </b>
          {getDateInFormat(dateFrom, DateFormat.DATE_SLASH)}-{getDateInFormat(dateTo, DateFormat.DATE_SLASH)} 
          <span>{toUpperFirstLetter(activeCityFrom)} {amenity}stars</span>
        </p>
      </div>);
    }
    case MenuItems.FLIGHT: {
      const {activeCityFrom, countryFrom, activeCityTo, countryTo, dateFrom, dateTo,
        requestDate} = obj;
      return (<div>
        <p><b>{type.toUpperCase()}: {getDateInFormat(requestDate, DateFormat.DEFAULT)} </b>
          {getDateInFormat(dateFrom, DateFormat.DATE_SLASH)}-{getDateInFormat(dateTo, DateFormat.DATE_SLASH)}
          <span> From: {toUpperFirstLetter(activeCityFrom)} To: {toUpperFirstLetter(activeCityTo)} </span>
        </p>
      </div>);
    }
    case MenuItems.CAR: {
      const {activeCityFrom, countryFrom, dateFrom, dateTo, type,
        requestDate} = obj;
      return (<div>
        <p><b>{type.toUpperCase()}: {getDateInFormat(requestDate, DateFormat.DEFAULT)} </b>
          {getDateInFormat(dateFrom, DateFormat.DATE_SLASH)}-{getDateInFormat(dateTo, DateFormat.DATE_SLASH)} {toUpperFirstLetter(activeCityFrom)}
        </p>
      </div>);
    }
    default: return Object.entries(obj).map(([key, value])=> <p>{key}:{value}</p>);
  }
};


function SearchHistoryPage() {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.DATA.historyResults);

  useEffect(() => {
    dispatch(getRequests());
  }, []);

  const onDeleteRequestResult = (id) => {
    dispatch(deleteRequest(id));
  };

  return (
    <Fragment>
      <Header />
      <main className='container'>
        <ul>
          {results.map((resultObj)=> (<li className={searchHistoryPage.itemWrapper} key={resultObj.id}>
            <div className={searchHistoryPage.itemWrapper}>
              <button className={`button button--delete ${searchHistoryPage.button}`} onClick={() => onDeleteRequestResult(resultObj.id)}></button>
              <div className={searchHistoryPage.item} onClick={() => dispatch(getPreselectedRequest(resultObj))}>
                {getContent(resultObj)}
              </div>
            </div>
          </li>))}
        </ul>
        {(!results || results.length === 0) && <p>There are no saved requests</p>}
      </main>
    </Fragment>
  );
}

export default SearchHistoryPage;

