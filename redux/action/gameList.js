import Axios from 'axios';

export const getGameList = () => {
  return {
    type: 'GET_GAME_LIST',
    payload: Axios.get(`http://18.141.12.25:6969/api/games`),
  };
};
