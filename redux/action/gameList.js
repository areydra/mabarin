import Axios from 'axios';

export const getGameList = () => {
  return {
    type: 'GET_GAME_LIST',
    payload: Axios.get(`http://54.251.151.41:7584/api/games`),
  };
};
