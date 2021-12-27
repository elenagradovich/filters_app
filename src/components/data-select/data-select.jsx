import React from 'react';
import { arrayOf, func, string, object } from 'prop-types';
import dataSelect from './data-select.module.scss';

function DataSelect ({ setValue, title, options, typeSelect, value, errors }) {
  return (
    <div className={dataSelect.wrapper}>
      <p><b>{title}</b></p>
      <div className={dataSelect.fieldsWrapper}>
        <label className={dataSelect.label}>
          <select
            required
            className={dataSelect.field}
            value={value || ''}
            onChange={(e) => setValue(e.target.value)}
            name={title}
          >
            <option value='' disabled>Select {title}</option>
            {options?.length>0 && options.map((item)=> <option key={item} value={item}>{item} {typeSelect==='amenity' && 'stars'}</option>)}
          </select>
          <p className='error'>{errors[typeSelect]}</p>
        </label>
      </div>
    </div>
  );
}

DataSelect.propTypes = {
  setValue: func,
  options: arrayOf(string),
  title: string,
  typeSelect: string,
  value: string,
  errors: object,
};

export default DataSelect;
