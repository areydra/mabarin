import Axios from 'axios';

export const getEventList = () => {
  return {
    type: 'GET_EVENT_LIST',
    payload: Axios.get(`http://13.229.124.25:6969/api/events`),
  };
};
