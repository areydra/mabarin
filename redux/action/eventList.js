import Axios from 'axios';

export const getEventList = () => {
  return {
    type: 'GET_EVENT_LIST',
    payload: Axios.get(`http://54.251.151.41:7584/api/events`),
  };
};
