import React, { useEffect } from 'react';
import { func, string } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getCitiesByCountry } from '../../store/actions';
import { CountryDropdown } from 'react-country-region-selector';
import location from './location.module.scss';

function Location ({ setCountry, country, setActiveCity, activeCity, title }) {

  const dispatch = useDispatch();
  const cities = useSelector((state) => state.DATA.citiesByCountry);

  useEffect(() => {
    if(country) {
      dispatch(getCitiesByCountry(country.toLowerCase()));
    }
  }, [country]);

  const onChangeCountry = (value) =>  {
    setCountry(value);
  };

  return (
    <div className={location.wrapper}>
      <p><b>{title}</b></p>
      <div className={location.fieldsWrapper}>
        <label className={location.label}>
          <span>Country</span>
          <CountryDropdown
            className={location.field}
            value={country}
            onChange={(val) => onChangeCountry(val)}
          />
        </label>
        <label className={location.label}>
          <span>City</span>
          <select
            className={location.field}
            value={activeCity}
            onChange={(e) => setActiveCity(e.target.value)}
            name='city'
          >
            <option value="" disabled selected>Select City</option>
            {cities?.length>0 && cities.map((item)=> <option key={item} value={item}>item</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

Location.propTypes = {
  setCountry: func,
  setActiveCity: func,
  country: string,
  activeCity: string,
};

export default Location;
