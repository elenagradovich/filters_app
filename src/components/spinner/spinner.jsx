import React from 'react';
import spinner from './spinner.module.scss';

function Spinner () {
  return (
    <div className={spinner.wrapper}>
      <svg className={spinner.element} viewBox="0 0 50 50">
        <circle className={spinner.path} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
      </svg>
      <p className={spinner.text}>Loading...</p>
    </div>
  );
}

export default Spinner;
