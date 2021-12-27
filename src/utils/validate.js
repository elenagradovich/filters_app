export const validateForm = (setErrors, errors, request, changeFormIsValid) => {
  let foormIsValid;
  const fieldValidationErrors = {...errors};

  const checkFieldValidity = (field, value) => {
    if(!value || value === '') {
      foormIsValid = false;
      fieldValidationErrors[field] = 'Field is empty';
    } else {
      foormIsValid = true;
      fieldValidationErrors[field] = '';
    }
  };

  Object.entries(request).forEach(([fieldName, value]) => {
    switch(fieldName) {
      case 'dateStart': {
        checkFieldValidity('dateStart', value);
        break;
      }
      case 'dateEnd': {
        checkFieldValidity('dateEnd', value);
        break;
      }
      case 'serviceСlass': {
        checkFieldValidity('serviceСlass', value);
        break;
      }
      case 'country': {
        checkFieldValidity('country', value);
        break;
      }
      case 'city': {
        checkFieldValidity('city', value);
        break;
      }
      case 'countryTo': {
        checkFieldValidity('countryTo', value);
        break;
      }
      case 'cityTo': {
        checkFieldValidity('cityTo', value);
        break;
      }
      case 'amenity': {
        checkFieldValidity('amenity', value);
        break;
      }
      default: break;
    }
  });
  setErrors(fieldValidationErrors);
  return foormIsValid;
};
