import * as apiUrls from '../constants/api-urls';
import * as baseService from './base-service';

export const getData = async (query) => {
  const url = apiUrls.getOffersLink(query);
  return baseService.get(url);
};

export const getCities = async (country, headers) => {
  const url = apiUrls.getCitiesLink(country);
  return baseService.get(url, headers);
};
