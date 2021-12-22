import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import 'flatpickr/dist/themes/material_green.css';
import calendar from './calendar.module.scss';

function Calendar ({ setDateRange, dateRange }) {
  const dateRef = useRef();
  const flatpickrRef = useRef();
  const [range, setRange] = useState([]);

  const clearDate = () => {
    flatpickrRef.current.flatpickr.clear();
  };

  useEffect(() => {
    if(range?.length === 1) {
      setRange(dateRef.current.value);
      setDateRange(range[0], dateRef.current.value);
    } else {
      setDateRange(range);
    }
  }, [range]);

  useEffect(() => {
    if(dateRange === []) {
      clearDate();
    }
  }, [dateRange]);

  return (
    <div className={calendar.wrapper}>
      <div className={calendar.field}>
        <label><b>Start Date</b>
          <Flatpickr
            ref={flatpickrRef}
            style={{ border: 'none'}}
            onChange={(date) => setRange(date)}
            placeholder = {'Choose date...'}
            options={{
              plugins: [new rangePlugin({ input: '#secondRangeInput' })],
              minDate: 'today',
              dateFormat: 'Y-m-d',
            }}
          />
        </label>
      </div>
      <div className={calendar.field}>
        <label><b>End Date</b>
          <input
            ref={dateRef}
            onChange={(date) => setRange(date)}
            style={{ border: 'none'}}
            placeholder='Choose date...'
            type="text"
            id="secondRangeInput"
            data-fp-omit=""
            allowinput= 'false'
          />
        </label>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  setDateRange: PropTypes.func,
  dateRange: PropTypes.array,
};

export default Calendar;

