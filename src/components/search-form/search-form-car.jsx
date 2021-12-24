import React,  {useRef, useState} from 'react';
import {string} from 'prop-types';
import CountrySelector from '../country-selector/country-selector';
import DataSelect from '../data-select/data-select';
import Calendar from '../calendar/calendar';
import { DateFormat } from '../../constants/calendar';
import {getDateInFormat} from '../../utils/dates';
import searchForm from './search-form.module.scss';

const initialFormData = {
  countryFrom: null,
  activeCityFrom: null,
  dateRange: [],
  type: null,
};

function SearchFormCar({onSubmitForm, preselectedRequest}) {
  debugger
  const formRef = useRef();
  const types = ['economy', 'business'];
  const [formIsValid, changeFormIsValid] = useState(false);
  const [errors, setErrors] = useState({
    dateStart: '',
    dateEnd: '',
    country: '',
    city: '',
    type: '',
  });

  const [countryFrom, setCountryFrom] = useState(preselectedRequest?.countryFrom || initialFormData.countryFrom);
  const [activeCityFrom, setActiveCityFrom] = useState(preselectedRequest?.activeCityFrom || initialFormData.activeCityFrom);
  const [dateRange, setDateRange] = useState([preselectedRequest?.dateStart, preselectedRequest?.dateEnd]  || initialFormData.dateRange);
  const [type, setType] = useState(preselectedRequest?.type || initialFormData.type);

  const onClearForm = () => {
    setCountryFrom(initialFormData.countryFrom);
    setActiveCityFrom(initialFormData.activeCityFrom);
    setDateRange(initialFormData.dateRange);
    setType(initialFormData.type);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const request = {
      countryFrom,
      activeCityFrom: activeCityFrom && activeCityFrom.toLowerCase(),
      dateFrom: getDateInFormat(dateRange[0], DateFormat.DATE_FULL),
      dateTo: getDateInFormat(dateRange[1],DateFormat.DATE_FULL),
      type,
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
        country={countryFrom}
        activeCity={activeCityFrom}
        errors={errors}
      />
      <DataSelect
        title='Type'
        setValue={setType}
        value={type}
        options={types}
        errors={errors}
      />
       <button className='button' onClick={(e) => onSubmit(e)}>Search</button>
      <button className='button' onClick={() => onClearForm()}>Clear</button>
    </form>
  );
}

SearchFormCar.propTypes = {
  onSubmitForm: string,
};

export default SearchFormCar;
