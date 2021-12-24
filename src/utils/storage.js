import { v4 as uuid } from 'uuid';

export const saveToLocalStorage = (params, type) => {
  const requestDate = new Date();
  const id = uuid();
  const requests = JSON.parse(localStorage.getItem('requests'));
  if(requests) {
    localStorage.setItem('requests', JSON.stringify([...requests, {...params, type, requestDate, id}]));
  } else {
    localStorage.setItem('requests', JSON.stringify([{...params, type, requestDate, id}]));
  }
};
