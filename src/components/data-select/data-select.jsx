import React from 'react';
import { arrayOf, func, string } from 'prop-types';
import dataSelect from './data-select.module.scss';

function DataSelect ({ setValue, title, options }) {

  return (
    <div className={dataSelect.wrapper}>
      <p><b>{title}</b></p>
      <div className={dataSelect.fieldsWrapper}>
        <label className={dataSelect.label}>
          <select
            className={dataSelect.field}
            defaultValue=""
            onChange={(e) => setValue(e.target.value)}
            name={title}
          >
            <option value="" disabled>Select {title}</option>
            {options?.length>0 && options.map((item)=> <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>
    </div>
  );
}

DataSelect.propTypes = {
  setValue: func,
  options: arrayOf,
  value: string,
  title: string,
};

export default DataSelect;
