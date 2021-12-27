import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import 'flatpickr/dist/themes/material_green.css';
import calendar from './calendar.module.scss';

function Calendar ({ setDateRange, dateRange, errors }) {
  const dateRef = useRef();
  const flatpickrRef = useRef();
  const [range, setRange] = useState(dateRange);

  const clearDate = () => {
    flatpickrRef.current.flatpickr.clear();
    dateRef.current.value = '';
  };

  useEffect(() => {
    if(range?.length === 1) {
      setRange(dateRef.current.value);
      setDateRange(range[0], dateRef.current.value);
    } else if (range?.length === 0) {
      setDateRange([]);
    } else {
      setDateRange(range);
    }
  }, [range]);

  useEffect(() => {
    flatpickrRef.current.flatpickr.value = dateRange[0] || '';
    dateRef.current.value = dateRange[1] || '';
  }, []);

  return (
    <div className={calendar.wrapper}>
      <div className={calendar.field}>
        <label className={calendar.fieldLabel}><b>Start Date</b>
          <Flatpickr
            ref={flatpickrRef}
            style={{ border: 'none'}}
            onChange={(date) => setRange(date)}
            placeholder = {'Choose date...'}
            options={{
              plugins: [new rangePlugin({ input: '#secondRangeInput' })],
              //minDate: 'today',
              dateFormat: 'Y-m-d',
              defaultDate: dateRange,
            }}
          />
        </label>
        <p className='error'>{errors['dateStart']}</p>
      </div>
      <div className={calendar.field}>
        <label><b>End Date</b>
          <input
            required
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
        <p className='error'>{errors['dateEnd']}</p>
      </div>
    </div>
  );
}

Calendar.propTypes = {
  setDateRange: PropTypes.func,
  dateRange: PropTypes.array,
  errors: PropTypes.object,
};

export default Calendar;

