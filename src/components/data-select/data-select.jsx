import React from 'react';
import { arrayOf, func, string } from 'prop-types';
import dataSelect from './data-select.module.scss';

function DataSelect ({ setValue, title, options, typeSelect, value, errors }) {

  return (
    <div className={dataSelect.wrapper}>
      <p><b>{title}</b></p>
      <div className={dataSelect.fieldsWrapper}>
        <label className={dataSelect.label}>
          <span className='error'>{errors[typeSelect]}</span>
          <select
            required
            className={dataSelect.field}
            defaultValue={value || ''}
            onChange={(e) => setValue(e.target.value)}
            name={title}
          >
            <option value='' disabled>Select {title}</option>
            {options?.length>0 && options.map((item)=> <option key={item} value={item}>{item} {typeSelect==='amenity' && 'stars'}</option>)}
          </select>
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
};

export default DataSelect;
