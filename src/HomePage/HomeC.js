/* eslint-disable camelcase */
import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import * as actionTypes from '../store/actions/actions';

export class HomeC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    UNSAFE_componentWillMount() {
      const { GetUserFromToken } = this.props;
      GetUserFromToken();
    }
   
    render() {
      const { user,LogOut,RequireSocket } = this.props;
      return (
        <div>
          <Home user={user} handleLogOut ={LogOut} RequireSocket={RequireSocket} />
        </div>
      );
    }
  }
  
const mapStateToProps = state => ({
    user: state.user
  });
  const MapDisPathToProps = dispatch =>{
      return {
          GetUserFromToken: () =>{
              return dispatch(actionTypes.GetToken())
          },
          LogOut : () =>{
            return dispatch(actionTypes.logout())
          },  RequireSocket: () => {
            return dispatch(actionTypes.requiresocket());
          },
      }
  }
  export default connect(mapStateToProps,MapDisPathToProps)(HomeC);
