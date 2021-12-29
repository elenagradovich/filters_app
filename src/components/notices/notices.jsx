import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteErrorMessage } from '../../store/actions';

function Notices () {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.DATA.error);

  const onCloseNotice = () => {
    dispatch(deleteErrorMessage());
  };
  return (error && <div className='overlay'>
    <div className='modal-window'>
      <h2 className='modal-window__title'>{error?.code || 'ERROR'}</h2>
      <p className='modal-window__content'>{error?.message || 'Something went wrong'}</p>
      <input className='modal-window__btn' value='Close' type='button'
        onClick={() => onCloseNotice()} />
    </div>
  </div>)
}
export default Notices;

