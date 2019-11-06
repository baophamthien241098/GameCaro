/* eslint-disable import/newline-after-import */
import io from 'socket.io-client';
import * as actionTypes from '../actions/actions';

const init = null;
const reducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.REQUIRE_SOCKET: { 
      //https://server-game-caro.herokuapp.com
    const  socket = io('http://localhost:8080');
      return socket;
    }
    case actionTypes.RESET_SOCKET:{
      return null;
    }

    default:
      break;
  }

  return state;
};
export default reducer;
