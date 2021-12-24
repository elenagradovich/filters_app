import humps from 'humps';

export const get = async (url, headerData) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Accept': '*/*',
    },
  };
  if(headerData) {
    requestOptions.headers = {...requestOptions.headers, ...headerData};
  }
  return processResponse(await fetch(url, requestOptions));
};

const processResponse = async (response) => {
  if (response && response.ok) {
    const data = await response.json();
    return {response: humps.camelizeKeys({ ...data })};
  } else if (response) {
    try {
      return humps.camelizeKeys(await response.json());
    } catch (e) {
      return { error: { code: response.statusText }};
    }
  }
  return { error: { code: 'Unknown Error' } };
};
