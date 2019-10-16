import Axios from 'axios';

export const getUser = uid => {
  return {
    type: 'GET_USER',
    payload: Axios.get(
      `http://18.141.12.25:6969/api/users/uid/pwdj337j3k3bj3b3rkrr`,
    ),
  };
};
