import React,  {useRef, useState} from 'react';
import CountrySelector from '../country-selector/country-selector';
import DataSelect from '../data-select/data-select';
import Calendar from '../calendar/calendar';
import { DateFormat } from '../../constants/calendar';
import {getDateInFormat} from '../../utils/dates';
import searchForm from './search-form.module.scss';
import { func, object } from 'prop-types';

const initialFormData = {
  country: null,
  city: null,
  dateRange: [],
  serviceСlass: null,
};

function SearchFormCar({onSubmitForm, preselectedRequest}) {
  const formRef = useRef();
  const serviceСlasses = ['economy', 'business'];
  const [formIsValid, changeFormIsValid] = useState(false);
  const [errors, setErrors] = useState({
    dateStart: '',
    dateEnd: '',
    country: '',
    city: '',
    serviceСlass: '',
  });

  const [country, setCountryFrom] = useState(preselectedRequest?.country || initialFormData.country);
  const [city, setActiveCityFrom] = useState(preselectedRequest?.city || initialFormData.activeCityFrom);
  const [dateRange, setDateRange] = useState([preselectedRequest?.dateStart, preselectedRequest?.dateEnd]  || initialFormData.dateRange);
  const [serviceСlass, setServiceСlass] = useState(preselectedRequest?.serviceСlass || initialFormData.serviceСlass);

  const onClearForm = () => {
    setCountryFrom(initialFormData.country);
    setActiveCityFrom(initialFormData.city);
    setDateRange(initialFormData.dateRange);
    setServiceСlass(initialFormData.serviceСlass);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const request = {
      country,
      city: city && city.toLowerCase(),
      dateStart: getDateInFormat(dateRange[0], DateFormat.DATE_FULL),
      dateEnd: getDateInFormat(dateRange[1],DateFormat.DATE_FULL),
      serviceСlass,
    };
    debugger
    onSubmitForm(request);
  };
  return (
    <form ref={formRef} className={searchForm.form}>
      <Calendar setDateRange={setDateRange} dateRange={dateRange} errors={errors}/>
      <CountrySelector
        title={'Location'}
        setCountry={setCountryFrom}
        setActiveCity={setActiveCityFrom}
        country={country}
        activeCity={city}
        errors={errors}
      />
      <DataSelect
        title='Type'
        setValue={setServiceСlass}
        value={serviceСlass}
        options={serviceСlasses}
        errors={errors}
      />
       <button className='button' onClick={(e) => onSubmit(e)}>Search</button>
      <button className='button' onClick={() => onClearForm()}>Clear</button>
    </form>
  );
}

SearchFormCar.propTypes = {
  onSubmitForm: func,
  preselectedRequest: object,
};

export default SearchFormCar;
