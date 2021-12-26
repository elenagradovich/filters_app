import React, { useMemo } from 'react';
import countryList from 'react-select-country-list';
import { func, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {getCitiesByCountry} from '../../store/actions';
import {toUpperFirstLetter} from '../../utils/common';

import countrySelector from './country-selector.module.scss';


function CountrySelector({ setCountry, setActiveCity, title, country, activeCity, errors}) {
  const countries = useMemo(() => countryList().getData(), []);
  const dispatch = useDispatch();
  const cities = useSelector((state) => title === 'To' ? state.DATA.citiesByCountryTo : state.DATA.citiesByCountry);

  const onChangeCountry = (value) => {
    setCountry(value);
    dispatch(getCitiesByCountry(value, title.toLowerCase()));
  };

  return (
    <div className={countrySelector.wrapper}>
      <p><b>{title}</b></p>
      <div className={countrySelector.fieldsWrapper}>
        <label className={countrySelector.label}>
          <span>Country</span>
          <span className='error'>{errors[`country${title}`]}</span>
          <select
            required
            className={countrySelector.field}
            value={country || ''}
            onChange={(e) => onChangeCountry(e.target.value)}
            name='country'
          >
            <option value='' disabled>Select Country</option>
            {countries?.length>0 && countries.map(({value, label})=> <option key={value} value={value} name={label}>{label}</option>)}
          </select>
        </label>
        <label className={countrySelector.label}>
          <span>City</span>
          <span className='error'>{errors[`city${title}`]}</span>
          <select
            required
            className={countrySelector.field}
            value={toUpperFirstLetter(activeCity)}
            onChange={(e) => setActiveCity(e.target.value)}
            name='city'
          >
            <option value='' disabled>Select City</option>
            {cities?.length>0 && cities.map((item)=> <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

CountrySelector.propTypes = {
  title: string,
  setCountry: func,
  setActiveCity: func,
  country: string,
  activeCity: string,
};

export default CountrySelector;
