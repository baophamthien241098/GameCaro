/* eslint-disable import/newline-after-import */
import io from 'socket.io-client';
import * as actionTypes from '../actions/actions';

const init = null;
const reducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.REQUIRE_SOCKET: { 
    const  socket = io('localhost:8080');
      return socket;
    }

    default:
      break;
  }

  return state;
};
export default reducer;
