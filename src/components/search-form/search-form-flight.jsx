import React,  {useRef, useState} from 'react';
import {func, object} from 'prop-types';
import CountrySelector from '../country-selector/country-selector';
import Calendar from '../calendar/calendar';
import { DateFormat } from '../../constants/calendar';
import {getDateInFormat} from '../../utils/dates';
import searchForm from './search-form.module.scss';

const initialFormData = {
  dateRange: [],
  country: null,
  city: null,
  countryTo: null,
  cityTo: null,
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

  const getDefaultDate = () => {
    if(preselectedRequest?.dateStart && preselectedRequest?.dateEnd) {
      return [preselectedRequest?.dateStart, preselectedRequest?.dateEnd];
    }
    return initialFormData.dateRange;
  };
  const [country, setCountryFrom] = useState(preselectedRequest?.country || initialFormData.country);
  const [city, setActiveCityFrom] = useState(preselectedRequest?.city || initialFormData.city);
  const [countryTo, setCountryTo] = useState(preselectedRequest?.countryTo || initialFormData.countryTo);
  const [cityTo, setActiveCityTo] = useState(preselectedRequest?.cityTo || initialFormData.cityTo);
  const [dateRange, setDateRange] = useState(getDefaultDate());

  const onClearForm = (e) => {
    e.preventDefault();
    setCountryFrom(initialFormData.country);
    setActiveCityFrom(initialFormData.city);
    setCountryTo(initialFormData.countryTo);
    setActiveCityTo(initialFormData.cityTo);
    setDateRange(initialFormData.dateRange);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const request = {
      country,
      city: city && city.toLowerCase(),
      countryTo,
      cityTo: cityTo && cityTo.toLowerCase(),
      dateStart: getDateInFormat(dateRange[0], DateFormat.DATE_FULL),
      dateEnd: getDateInFormat(dateRange[1],DateFormat.DATE_FULL),
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
        country={country}
        activeCity={city}
        errors={errors}
      />
      <CountrySelector
        title='To'
        setCountry={setCountryTo}
        setActiveCity={setActiveCityTo}
        country={countryTo}
        activeCity={cityTo}
        errors={errors}
      />
      <button className='button' onClick={(e) => onSubmit(e)}>Search</button>
      <button className='button' onClick={(e) => onClearForm(e)}>Clear</button>
    </form>
  );
}

SearchFormFlight.propTypes = {
  onSubmitForm: func,
  preselectedRequest: object,
};

export default SearchFormFlight;
