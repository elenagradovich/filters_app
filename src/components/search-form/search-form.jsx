import React,  {useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchFormFlight from './search-form-flight';
import SearchFormHotel from './search-form-hotel';
import SearchFormCar from './search-form-car';
import { getDataByRequest, resetRequestData, resetResponseData } from '../../store/actions';
import { MenuItems } from '../../constants/menu';
import { isObjEmpty, deleteKeys } from '../../utils/obj';
import Spinner from '../spinner/spinner';

const getComponentByType = (type, submitForm, preselectedRequest, clearData) => {
  const requestType = preselectedRequest?.type;
  switch (type) {
    case MenuItems.FLIGHT: {
      const request = (requestType === MenuItems.FLIGHT) ? preselectedRequest : {};
      return (<SearchFormFlight
        submitForm={submitForm}
        preselectedRequest={request}
        clearData={clearData}
      />);
    }
    case MenuItems.HOTEL:{
      const request = (requestType === MenuItems.HOTEL) ? preselectedRequest : {};
      return (<SearchFormHotel
        submitForm={submitForm}
        preselectedRequest={request}
        clearData={clearData}
      />);
    }
    case MenuItems.CAR: {
      const request = (requestType === MenuItems.CAR) ? preselectedRequest : {};
      return (<SearchFormCar
        submitForm={submitForm}
        preselectedRequest={request}
        clearData={clearData}
      />);
    }
    default: return '';
  }
};


function SearchForm() {
  const dispatch = useDispatch();
  const menuType = useSelector((state) => state.DATA.menuType);
  const loading = useSelector((state) => state.DATA.dataLoading);
  const preselectedRequest = useSelector((state) => state.DATA.preselectedRequest);
  const submitForm = (request) => {
    dispatch(getDataByRequest(request, menuType));
  };

  const clearData = () => {
    dispatch(resetRequestData());
    dispatch(resetResponseData());
  };

  useEffect(() => {
    if(preselectedRequest && !isObjEmpty(preselectedRequest)) {
      const query = deleteKeys(preselectedRequest, ['type', 'requestDate', 'id']);
      dispatch(getDataByRequest(query, menuType, false));
    }
  }, [preselectedRequest]);

  return (
    <Fragment>
      {loading && <Spinner />}
      {getComponentByType(menuType, submitForm, preselectedRequest, clearData)}
    </Fragment>
  );
}

export default SearchForm;
