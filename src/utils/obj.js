export const deleteEmptyObjectFields = (request) => {
  Object.keys(request).forEach((key) => request[key]=== null && delete request[key]);
  return request;
};

export const deleteKeys = (object, keys = []) => keys.reduce(
  (o, k) => {const { [k]: _ , ...p } = o; return p;}, object);

