import { combineReducers } from 'redux';
import game from './game';
import user from './user';
import alert from './alert_reducer';
import authentication from './authentication';
import gameonline from './gameonline';
import socket from './socket';

const reducers = combineReducers({
  game,
  user,
  alert,
  authentication,
  socket,
  gameonline
});

export default reducers;
