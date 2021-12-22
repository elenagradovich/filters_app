export const get = async (url, headerData) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  };
  return await fetch(url, {...requestOptions, headers: {...requestOptions.headers, ...headerData}});
};
