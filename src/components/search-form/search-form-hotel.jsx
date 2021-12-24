import React,  {useRef, useState} from 'react';
import CountrySelector from '../country-selector/country-selector';
import DataSelect from '../data-select/data-select';
import Calendar from '../calendar/calendar';
import { DateFormat } from '../../constants/calendar';
import {getDateInFormat} from '../../utils/dates';
import searchForm from './search-form.module.scss';
import { func } from 'prop-types';


const initialFormData = {
  countryFrom: null,
  activeCityFrom: null,
  dateRange: [],
  amenity: null,
};

function SearchFormHotel({onSubmitForm, preselectedRequest}) {
  const formRef = useRef();
  const amenities = ['5', '4', '3', '2', '1'];
  const [formIsValid, changeFormIsValid] = useState(false);
  const [errors, setErrors] = useState({
    dateStart: '',
    dateEnd: '',
    country: '',
    city: '',
    amenity: '',
  });

  const [countryFrom, setCountryFrom] = useState(preselectedRequest?.countryFrom || initialFormData.countryFrom);
  const [activeCityFrom, setActiveCityFrom] = useState(preselectedRequest?.activeCityFrom || initialFormData.activeCityFrom);
  const [dateRange, setDateRange] = useState([preselectedRequest?.dateStart, preselectedRequest?.dateEnd]  || initialFormData.dateRange);
  const [amenity, setAmenity] = useState(preselectedRequest?.amenity || initialFormData.amenity);

  const onClearForm = (e) => {
    e.preventDefault();
    setCountryFrom(initialFormData.countryFrom);
    setActiveCityFrom(initialFormData.activeCityFrom);
    setDateRange(initialFormData.dateRange);
    setAmenity(initialFormData.amenity);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const request = {
      countryFrom,
      activeCityFrom: activeCityFrom && activeCityFrom.toLowerCase(),
      dateFrom: getDateInFormat(dateRange[0], DateFormat.DATE_FULL),
      dateTo: getDateInFormat(dateRange[1],DateFormat.DATE_FULL),
      amenity,
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
        title='Amenities'
        setValue={setAmenity}
        options={amenities}
        typeSelect='amenity'
        value={amenity}
        errors={errors}
      />
      <button className='button' onClick={(e) => onSubmit(e)}>Search</button>
      <button className='button' onClick={(e) => onClearForm(e)}>Clear</button>
    </form>
  );
}

SearchFormHotel.propTypes = {
  onSubmitForm: func,
};

export default SearchFormHotel;
