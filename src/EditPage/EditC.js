import React from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actions/actions';
import Edit from './Edit';
import * as alerAction from '../store/actions/alert_action'
export class HomeC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
  
    UNSAFE_componentWillMount() {
      this.props.GetUserFromToken();
    }
  
    render() {
      const { user,handleUpdate,alert } = this.props;
      return (
        <div>
          <Edit user={user} handleUpdate= {handleUpdate}
            alert= {alert}
          />
        </div>
      );
    }
  }
  const mapStateToProps = state => ({
    user: state.user
  });
const mapToDispatch =  dispatch =>{
  return {
    handleUpdate: (value) => {
        return dispatch(actionTypes.UpdateData(value))
    },GetUserFromToken: () =>{
        return dispatch(actionTypes.GetToken())
    },
    alert:(value) =>{
        return dispatch(alerAction.error(value))
    }
  }
}

  export default connect(mapStateToProps,mapToDispatch)(Edit);