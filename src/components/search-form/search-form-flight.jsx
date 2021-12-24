import React,  {useRef, useState} from 'react';
import {func} from 'prop-types';
import CountrySelector from '../country-selector/country-selector';
import Calendar from '../calendar/calendar';
import { DateFormat } from '../../constants/calendar';
import {getDateInFormat} from '../../utils/dates';
import searchForm from './search-form.module.scss';

const initialFormData = {
  dateRange: [],
  countryFrom: null,
  activeCityFrom: null,
  countryTo: null,
  activeCityTo: null,
};

function SearchFormFlight({onSubmitForm, preselectedRequest}) {
  const formRef = useRef();
  const [formIsValid, changeFormIsValid] = useState(false);
  const [errors, setErrors] = useState({
    dateStart: '',
    dateEnd: '',
    country: '',
    city: '',
  });
  const [countryFrom, setCountryFrom] = useState(preselectedRequest?.countryFrom || initialFormData.countryFrom);
  const [activeCityFrom, setActiveCityFrom] = useState(preselectedRequest?.activeCityFrom || initialFormData.activeCityFrom);
  const [countryTo, setCountryTo] = useState(preselectedRequest?.countryTo || initialFormData.countryTo);
  const [activeCityTo, setActiveCityTo] = useState(preselectedRequest?.activeCityTo || initialFormData.activeCityTo);
  const [dateRange, setDateRange] = useState([preselectedRequest?.dateStart, preselectedRequest?.dateEnd]  || initialFormData.dateRange);

  const onClearForm = (e) => {
    setCountryFrom(initialFormData.countryFrom);
    setActiveCityFrom(initialFormData.activeCityFrom);
    setCountryTo(initialFormData.countryTo);
    setActiveCityTo(initialFormData.activeCityTo);
    setDateRange(initialFormData.dateRange);
    e.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const request = {
      countryFrom,
      activeCityFrom: activeCityFrom && activeCityFrom.toLowerCase(),
      countryTo,
      activeCityTo: activeCityTo && activeCityTo.toLowerCase(),
      dateFrom: getDateInFormat(dateRange[0], DateFormat.DATE_FULL),
      dateTo: getDateInFormat(dateRange[1],DateFormat.DATE_FULL),
    };
    
    //if(formIsValid) {onSubmitForm(request);}
    onSubmitForm(request);
  };

  return (
    <form ref={formRef} className={searchForm.form}>
      <Calendar setDateRange={setDateRange} dateRange={dateRange} errors={errors} />
      <CountrySelector
        title='From'
        setCountry={setCountryFrom}
        setActiveCity={setActiveCityFrom}
        country={countryFrom}
        activeCity={activeCityFrom}
        errors={errors}
      />
      <CountrySelector
        title='To'
        setCountry={setCountryTo}
        setActiveCity={setActiveCityTo}
        country={countryTo}
        activeCity={activeCityTo}
        errors={errors}
      />
      <button className='button' onClick={(e) => onSubmit(e)}>Search</button>
      <button className='button' onClick={() => onClearForm()}>Clear</button>
    </form>
  );
}

SearchFormFlight.propTypes = {
  onSubmitForm: func,
};

export default SearchFormFlight;
