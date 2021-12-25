const baseRouteApi = 'https://filtersapp.herokuapp.com';
const baseRouteCities = 'https://countries-cities.p.rapidapi.com';

//API
export const CITIES = `${baseRouteCities}/location/country/:query/city/list?population=100000`;
export const getCitiesLink = (country) => CITIES.replace(':query', country);

export const OFFERS = `${baseRouteApi}/:type?:query`;
export const getOffersLink = (params, type) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => {
      switch(key) {
        case 'date_start': return `${key}_lte=${value}`;
        case 'date_end': return `${key}_gte=${value}`;
        default: return `${key}=${value}`;
      }})
    .join('&');
  return OFFERS.replace(':type', type).replace(':query', queryParams);
};
