//API
export const CITIES = 'https://countries-cities.p.rapidapi.com/location/country/:query/city/list?population=100000';
export const getCitiesLink = (country) => CITIES.replace(':query', country);

export const OFFERS = 'http://localhost:3003/:type?:query';
export const getOffersLink = (params, type) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => {
      switch(key) {
        case 'date_from': return `${key}_gte=${value}`;
        case 'date_to': return `${key}_lte=${value}`;
        default: return `${key}=${value}`;
      }})
    .join('&');
  return OFFERS.replace(':type', type).replace(':query', queryParams);
};
