/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prefer-destructuring */
import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';


import * as actionTypes from '../store/actions/actions';
import * as alert from '../store/actions/alert_action';

import './login.css';

const Login = props => {
  const [userinput, setUserinput] = useReducer(
    (state, NewState) => ({ ...state, ...NewState }),
    {
      IsLogin: false,
      username: '',
      userpassword: ''
    }
  );

  const { handleLogin } = props;
  const history = useHistory();

  const handleBack = () => {
    history.push('/register');
    props.clear();
  };
  const Handlechange = event => {
    event.preventDefault();
    const name = event.target.name;
    const newValue = event.target.value;
    setUserinput({ [name]: newValue });
  };
  const responseFacebook = response => {
    console.log(response);
  };
  
  const handleSubmit = async event => {
    event.preventDefault();
    const { username, userpassword } = event.target.elements;
    const user = {
      username: username.value,
      userpassword: userpassword.value
    };
    const check = await handleLogin(user);
    if (check) {
      history.push('/');
    }
  };
  return (
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img
                src="http://cdn.marketplaceimages.windowsphone.com/v8/images/7aa31780-7d9f-4636-905c-133eb2ca85a3?imageType=ws_icon_medium"
                className="brand_logo"
                alt="Logo"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form method="POST" onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  name="username"
                  onChange={Handlechange}
                  className="form-control input_user"
                  value={userinput.username}
                  placeholder="username"
                />
              </div>
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  name="userpassword"
                  onChange={Handlechange}
                  className="form-control input_pass"
                  value={userinput.userpassword}
                  placeholder="password"
                />
              </div>
              <div className="d-flex justify-content-center mt-3 login_container">
                <button type="submit" name="button" className="btn login_btn">
                  Login
                </button>
              </div>
            </form>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              Don't have an account?
              <a className="text-primary ml-2 l ink" onClick={handleBack}>
                Sign Up
              </a>
            </div>
   
            {/* <FacebookLogin
             
             appId="395153851430941"
             fields="name,email,picture"
             callback={responseFacebook}
                /> */}
     
                 
            <div className="d-flex justify-content-center p-1">
            <GoogleLogin
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Login"
                cookiePolicy={'single_host_origin'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  
  );
};

// const mapStateToProps = state => ({
//   user: state.user
// });

const mapToProps = state => {
  const { loggingIn } = state.authentication;
  return loggingIn;
};
const mapDispathToProps = dispatch => {
  return {
    logout: actionTypes.logout,
    handleLogin: value => {
      return dispatch(actionTypes.Login(value));
    },
    clear: value => {
      return dispatch(alert.clear(value));
    }
  };
};
export default connect(
  mapToProps,
  mapDispathToProps
)(Login);
