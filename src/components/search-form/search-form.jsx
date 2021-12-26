import React,  {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {string} from 'prop-types';
import SearchFormFlight from './search-form-flight';
import SearchFormHotel from './search-form-hotel';
import SearchFormCar from './search-form-car';
import { getDataByRequest } from '../../store/actions';
import { MenuItems } from '../../constants/menu';
import { isObjEmpty, deleteKeys } from '../../utils/obj';

const getComponentByType = (type, submitForm, preselectedRequest) => {
  const requestType = preselectedRequest?.type;
  switch (type) {
    case MenuItems.FLIGHT: {
      const request = (requestType === MenuItems.FLIGHT) ? preselectedRequest : {};
      return <SearchFormFlight onSubmitForm={submitForm} preselectedRequest={request} />;
    }
    case MenuItems.HOTEL:{
      const request = (requestType === MenuItems.HOTEL) ? preselectedRequest : {};
      return <SearchFormHotel onSubmitForm={submitForm} preselectedRequest={request} />;
    }
    case MenuItems.CAR: {
      const request = (requestType === MenuItems.CAR) ? preselectedRequest : {};
      return <SearchFormCar onSubmitForm={submitForm} preselectedRequest={request} />;
    }
  }
};


function SearchForm() {
  const dispatch = useDispatch();
  const menuType = useSelector((state) => state.DATA.menuType);
  const preselectedRequest = useSelector((state) => state.DATA.preselectedRequest);
  const submitForm = (request) => {
    dispatch(getDataByRequest(request, menuType));
  };

  useEffect(() => {
    if(preselectedRequest && !isObjEmpty(preselectedRequest)) {
      const query = deleteKeys(preselectedRequest, ['type', 'requestDate', 'id']);
      dispatch(getDataByRequest(query, menuType, false));
    }
  }, [preselectedRequest]);

  return getComponentByType(menuType, submitForm, preselectedRequest);
}

SearchForm.propTypes = {
  menuType: string,
};

export default SearchForm;
