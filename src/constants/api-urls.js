//API
export const CITIES = 'https://andruxnet-world-cities-v1.p.rapidapi.com/:query';
export const getCitiesLink = (city) => {
  const query = `?query=${city}&searchby=city`;
  debugger
  return CITIES.replace(':query', query);
};

export const OFFERS = '/db/:query';
export const getOffersLink = (params) => {
  debugger
  const query = Object.keys(params)
    .map((key) => {
      const keyValue = params[key];
      return Array.isArray(keyValue) ? keyValue.map((item) =>`${key}[]=${item}`).join('&') : `${key}=${keyValue}`;
    })
    .join('&');
  
  return OFFERS.replace(':query', query);
};
