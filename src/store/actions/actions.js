/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import * as alerAction from './alert_action'

export const CLICK_HISTORY = 'CLICK_HISTORY';
export const HANDLE_CLICK = 'HANDLE-CLICK';
export const UNDO_CLICK = 'UNDO-CLICK';
export const CLICK_RESET ='CLICK_RESET';
export const CLICK_SORT ='CLICK_SORT';
export const LOGIN ='LOGIN';
export const SIGNUP ='SIGNUP';
export const SUCCESS =  'ALERT_SUCCESS';
export const ERROR =  'ALERT_ERROR';
export const CLEAR =  'ALERT_CLEAR';
export const REGISTER_REQUEST= 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS= 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE= 'USERS_REGISTER_FAILURE';
export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS =  'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE =  'USERS_LOGIN_FAILURE';
export const LOGOUT =   'USERS_LOGOUT';
export const USER_FROM_TOKEN = "USER_FROM_TOKEN"
export const REQUIRE_SOCKET = 'REQUIRE_SOCKET';
export const CHAT_MESSAGE = 'CHAT_MESSAGE';
export const MESSAGE = 'MESSAGE';
export const RESPONSE_CLICK = 'RESPONSE_CLICK';
export const RESPONSE_FINISHGAME = 'RESPONSE_FINISHGAME';
export const HIRE_POPMENU = 'HIRE_POPMENU';
export const REQUIRE_UNDO = 'REQUIRE_UNDO';
export const HANDLE_UNDO = 'HANDLE_UNDO';
export const HANDLE_UNOPLAYER = 'HANDLE_UNOPLAYER';
export const SURRENDER = 'SURRENDER';
export const XINHOA = 'XINHOA';
export const HANDLEXINHOA = 'HANDLEXINHOA';
export const DISCONNECT = 'DISCONNECT';
export const RESETSTATE = 'RESETSTATE';
export const RECONECT = 'RECONECT';
export const HIRE_POPMENUPC = 'HIRE_POPMENUPC';
export const RESET_SOCKET = 'RESET_SOCkET';

export const resetsocket = () => {
  return { type: RESET_SOCKET
      };
}
export const surrender = (value) => {
  return { type: SURRENDER,
            val:value
      };
}
export const hirepoppc = () => {
  return { type: HIRE_POPMENUPC
      };
}
export const reconnect = (value) => {
  return { type: RECONECT,
            val:value
      };
}
export const resetstate = () => {
  return { type: RESETSTATE
      };
}
export const disconnect = (value) => {
  return { type: DISCONNECT,
    val:value
      };
}
export const handleHoa = (value) => {
  return { type: HANDLEXINHOA,
            val:value
      };
}
export const xinhoa = () => {
  console.log("action xin hoa");
  return { 
    type: XINHOA
      };
}
export const chatmessage = (value) => {
  return { type: CHAT_MESSAGE,
            val:value
      };
}
export const handleundo = (value) => {
  return { type: HANDLE_UNDO,
            val:value
      };
}
export const requireundo = () => {
  return { 
    type: REQUIRE_UNDO
      };
}
export const hirepop = () => {
  return { type: HIRE_POPMENU
      };
}
export const responsefinish = (value) => {
  return { type: RESPONSE_FINISHGAME,
            val:value
      };
}
export const responsemessage = (value) => {
  return { type: RESPONSE_CLICK,
            val:value
      };
}
export const message = (value) => {
  return { type: MESSAGE,
            val:value
      };
}

export const clear = () => {
  return { type: CLEAR };
}
export const requiresocket = () => {
  return { type: REQUIRE_SOCKET };
}
export const clickHistory = (value) => {
    return {
        type: CLICK_HISTORY,
        val:value,
    };
};
export const handleClick = (value) => {
    return {
        type: HANDLE_CLICK,
        val:value,
    };
};
export const clickreset = () => {
    return {
        type: CLICK_RESET
    };
};
export const clicksort = (value) => {
    return {
        type: CLICK_SORT,
        val:value,
    };
};
export const UserToken = (value)=>{
  return {
    type: USER_FROM_TOKEN,
    val:value,
};
}
export const  logout = () =>{
  // remove user from local storage to log user out
    localStorage.removeItem('token');
     return { type: LOGOUT };
}
function request(user) { return { type: LOGIN_REQUEST, user } }
export const Login = (value) =>{
   return dispatch =>{
       dispatch(request({ value }));
     return fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
      })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(data =>{
        localStorage.setItem('token', JSON.stringify(data.token));
        dispatch(alerAction.error(""));
        dispatch(UserToken(value))
        return true
      })
        .catch((error) => {
          console.log('Looks like there was a problem: \n', error);
          dispatch(alerAction.error("Username or password is incorrect"));
          return false
        });
      }     
};
export const GetToken = () =>{
  return dispatch => {
    return fetch('http://localhost:8080/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
      .then(res => {
        if( !res.ok){
          throw Error(res.statusText);
        }
        return res.json()
      })
      .then(data => {
        dispatch(UserToken(data))
      })
      .catch( (err) =>{
          
      })
  };

}


export const Signup = (value) =>{
    return dispatch =>{
        return fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
          })
          .then(res => res.json() )
          .then(data =>{
            if(Number.isNaN(data.id)){
              dispatch(alerAction.error("Registration fail"));
                return false
            }
            dispatch(alerAction.success('Registration successful'))
                return true
          })
    }
};
export const clickUndo = (value)=>{
  return {
    type:UNDO_CLICK,
    val:value
  }
}
export const clickUndoPlayer = ()=>{
  return {
    type:HANDLE_UNOPLAYER,

  }
}
//https://server-game-caro.herokuapp.com
export const UpdateData = (value)=>{
  return dispatch =>{
      return fetch("http://localhost:8080/user/update",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(value)
      })
      .then(res =>{
        
        return res.json()
      })
      .then(data =>{
          console.log(data);
          return true  
      })
     
  }
}


