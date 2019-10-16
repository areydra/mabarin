import {combineReducers} from 'redux';

import user from './user';
import gameList from './gameList';
import eventList from './eventList';

const reducers = combineReducers({
  user,
  gameList,
  eventList,
});

export default reducers;
