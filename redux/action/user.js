import Axios from 'axios';

export const getUser = uid => {
  return {
    type: 'GET_USER',

    payload: Axios.get(`http://54.251.151.41:7584/api/users/uid/${uid}`),
  };
};
export const postUser = data => {
  return {
    type: 'POST_USER',
    payload: Axios.post(`http://54.251.151.41:7584/api/users/register`, data),
  };
};
export const sendHistory = (uid, data) => {
  return {
    type: 'PATCH_HISTORY',

    payload: Axios.patch(
      `http://54.251.151.41:7584/api/users/addhistory/${uid}`,
      data,
    ),
  };
};
export const sendRatingFriend = (uid, data) => {
  return {
    type: 'POST_RATING',
    payload: Axios.patch(
      `http://54.251.151.41:7584/api/users/addrating/${uid}`,
      data,
    ),
  };
};
