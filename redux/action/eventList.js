import Axios from 'axios';

export const getEventList = () => {
  return {
    type: 'GET_EVENT_LIST',
    payload: Axios.get(`http://18.141.12.25:6969/api/events`),
  };
};
