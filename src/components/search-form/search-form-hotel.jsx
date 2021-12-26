import React,  {useRef, useState} from 'react';
import CountrySelector from '../country-selector/country-selector';
import DataSelect from '../data-select/data-select';
import Calendar from '../calendar/calendar';
import { DateFormat } from '../../constants/calendar';
import {getDateInFormat} from '../../utils/dates';
import searchForm from './search-form.module.scss';
import { func } from 'prop-types';


const initialFormData = {
  country: null,
  city: null,
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

  const getDefaultDate = () => {
    if(preselectedRequest?.dateStart && preselectedRequest?.dateEnd) {
      return [preselectedRequest?.dateStart, preselectedRequest?.dateEnd];
    }
    return initialFormData.dateRange;
  };

  const [country, setCountryFrom] = useState(preselectedRequest?.country || initialFormData.country);
  const [city, setActiveCityFrom] = useState(preselectedRequest?.city || initialFormData.city);
  const [dateRange, setDateRange] = useState(getDefaultDate());
  const [amenity, setAmenity] = useState(preselectedRequest?.amenity || initialFormData.amenity);

  const onClearForm = (e) => {
    e.preventDefault();
    setCountryFrom(initialFormData.country);
    setActiveCityFrom(initialFormData.city);
    setDateRange(initialFormData.dateRange);
    setAmenity(initialFormData.amenity);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const request = {
      country,
      city: city && city.toLowerCase(),
      dateStart: getDateInFormat(dateRange[0], DateFormat.DATE_FULL),
      dateEnd: getDateInFormat(dateRange[1],DateFormat.DATE_FULL),
      amenity,
    };
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
