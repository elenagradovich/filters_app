import React,  {useRef, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {string} from 'prop-types';
import Location from '../location/location';
import DataSelect from '../data-select/data-select';
import Calendar from '../calendar/calendar';
import { getDataByRequest } from '../../store/actions';
import { MenuItems } from '../../constants/menu';
import searchForm from './search-form.module.scss';

const initialFormData = {
  countryFrom: null,
  activeCityFrom: null,
  countryTo: null,
  activeCityTo: null,
  dateRange: [],
  amenity: null,
  type: null,
};

const cleanObject = (request) => Object.keys(request).forEach((key) => request[key]=== null && delete request[key]);

function SearchForm({ activeType }) {
  debugger
  const formRef = useRef();
  const dispatch = useDispatch();
  const amenities = ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'];
  const types = ['economy', 'business'];

  const [countryFrom, setCountryFrom] = useState(initialFormData.countryFrom);
  const [activeCityFrom, setActiveCityFrom] = useState(initialFormData.activeCityFrom);
  const [countryTo, setCountryTo] = useState(initialFormData.countryTo);
  const [activeCityTo, setActiveCityTo] = useState(initialFormData.activeCityTo);
  const [dateRange, setDateRange] = useState(initialFormData.dateRange);
  const [amenity, setAmenity] = useState(initialFormData.amenity);
  const [type, setType] = useState(initialFormData.type);

  const onClearForm = () => {
    setCountryFrom(initialFormData.countryFrom);
    setActiveCityFrom(initialFormData.activeCityFrom);
    setCountryTo(initialFormData.countryTo);
    setActiveCityTo(initialFormData.activeCityTo);
    setDateRange(initialFormData.dateRange);
    setAmenity(initialFormData.amenity);
    setType(initialFormData.type);
  };

  useEffect(() => {
    onClearForm();
  }, []);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const request = cleanObject({
      countryFrom: countryFrom && countryFrom.toLowerCase(),
      activeCityFrom: activeCityFrom && activeCityFrom.toLowerCase(),
      dateFrom: dateRange[0],
      dateTo: dateRange[1],
      countryTo: countryTo && countryTo.toLowerCase(),
      activeCityTo: activeCityTo && activeCityTo.toLowerCase(),
      amenity,
      type,
    });
    debugger
    dispatch(getDataByRequest(request));
    onClearForm();
  };
  return (
    <form ref={formRef} className={searchForm.form}>
      <Calendar setDateRange={setDateRange} dateRange={dateRange} />
      <Location
        title={activeType === MenuItems.FLIGHT ? 'From' : 'Location'}
        setCountry={setCountryFrom}
        setActiveCity={setActiveCityFrom}
        country={countryFrom}
        activeCity={activeCityFrom}
      />
      {activeType === MenuItems.FLIGHT && <Location
        title='To'
        setCountry={setCountryTo}
        setActiveCity={setActiveCityTo}
        country={countryTo}
        activeCity={activeCityTo}
      />}
      {activeType === MenuItems.HOTEL && <DataSelect
        title='Amenities'
        setValue={setAmenity}
        value={amenity}
        options={amenities}
      />}
      {activeType === MenuItems.CAR && <DataSelect
        title='Type'
        setValue={setType}
        value={type}
        options={types}
      />}
      <button className='button' onClick={(e) => onSubmitForm(e)}>Search</button>
      <button className='button' onClick={() => onClearForm()}>Clear</button>
    </form>
  );
}

DataSelect.propTypes = {
  activeType: string,
};

export default SearchForm;
