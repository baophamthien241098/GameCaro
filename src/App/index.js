import React from '../../node_modules/react';
import { connect } from '../../node_modules/react-redux';
import { BrowserRouter as Router, Switch, Route } from '../../node_modules/react-router-dom';
import  Login  from '../LoginPage/Login';
import  HomeC  from '../HomePage/HomeC';
import  Lobby  from '../lobbyPage/Lobby';
import  PlayOnline  from '../PlayOnline/PlayOnline';
import EditPage from '../EditPage/EditC';
import Board from '../containers/board/Board'
import RegisterPage  from '../RegisterPage/Register';
import * as actionTypes from '../store/actions/actions';

const app  = props =>  {
  const { alert } = props;

  return (
   
      <div className="container-fluid mt-5 ">
        <div className="">
        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
          <Router>
            <div>
              <Switch>
                <Route exact path="/">
                  <HomeC />
                </Route>
                <Route path="/Login">
                  <Login />
                </Route>
                <Route path="/Register">
                  <RegisterPage />
                </Route>
                <Route path="/Edit">
                  <EditPage />
                </Route>
                <Route path="/Play">
                  <Board />
                </Route>
                <Route path="/PlayOnline">
                  <PlayOnline />
                </Route>
                <Route path="/TestConnect">
                  <Lobby />
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </div>
   
  );
}
const MapToState = state =>{
    const { alert } = state;
    return { alert };
}
const actionCreators = {
    clearAlerts: actionTypes.clear
};
export default connect(MapToState,actionCreators)(app);
