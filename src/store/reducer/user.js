/* eslint-disable import/newline-after-import */
import * as actionTypes from '../actions/actions';
const init = null;
const reducer = (state = init, action) => {
  console.log("user state ==== ",state);
  
   let user = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case actionTypes.USER_FROM_TOKEN: { 
      user = action.val;      
      return user;
    }

    default:
      break;
  }

  return state;
};
export default reducer;
