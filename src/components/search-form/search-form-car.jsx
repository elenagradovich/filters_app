import React,  {useRef, useState} from 'react';
import CountrySelector from '../country-selector/country-selector';
import DataSelect from '../data-select/data-select';
import Calendar from '../calendar/calendar';
import { DateFormat } from '../../constants/calendar';
import {getDateInFormat} from '../../utils/dates';
import {validateForm} from '../../utils/validate';
import searchForm from './search-form.module.scss';
import { resetResponseData } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { func, object } from 'prop-types';

const initialFormData = {
  country: null,
  city: null,
  dateRange: [],
  serviceСlass: null,
};

function SearchFormCar({submitForm, preselectedRequest, clearData}) {
  const formRef = useRef();
  const dispatch = useDispatch();
  const serviceСlasses = ['economy', 'business'];
  const [errors, setErrors] = useState({
    dateStart: '',
    dateEnd: '',
    country: '',
    city: '',
    serviceСlass: '',
  });

  const getDefaultDate = () => {
    if(preselectedRequest?.dateStart && preselectedRequest?.dateEnd) {
      return [preselectedRequest?.dateStart, preselectedRequest?.dateEnd];
    }
    return initialFormData.dateRange;
  };

  const [country, setCountryFrom] = useState(preselectedRequest?.country || initialFormData.country);
  const [city, setActiveCityFrom] = useState(preselectedRequest?.city || initialFormData.activeCityFrom);
  const [dateRange, setDateRange] = useState(getDefaultDate());
  const [serviceСlass, setServiceСlass] = useState(preselectedRequest?.serviceСlass || initialFormData.serviceСlass);
  
  const onClearForm = (e) => {
    e.preventDefault();
    setCountryFrom(initialFormData.country);
    setActiveCityFrom(initialFormData.city);
    setDateRange(initialFormData.dateRange);
    setServiceСlass(initialFormData.serviceСlass);
    clearData();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(resetResponseData());
    const request = {
      country,
      city: city && city.toLowerCase(),
      dateStart: getDateInFormat(dateRange[0], DateFormat.DATE_FULL),
      dateEnd: getDateInFormat(dateRange[1],DateFormat.DATE_FULL),
      serviceСlass,
    };
    const isFormValid = validateForm(setErrors, errors, request);
    isFormValid && submitForm(request);
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
        typeSelect='serviceСlass'
        errors={errors}
      />
      <button className='button' onClick={(e) => onSubmit(e)}>Search</button>
      <button className='button' onClick={(e) => onClearForm(e)}>Clear</button>
    </form>
  );
}

SearchFormCar.propTypes = {
  submitForm: func,
  preselectedRequest: object,
  clearData: func,
};

export default SearchFormCar;
