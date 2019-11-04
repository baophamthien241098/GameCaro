/* eslint-disable prefer-destructuring */
import React,{useReducer} from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actionTypes from '../store/actions/actions';
import * as alert from '../store/actions/alert_action';

import './register.css'

const Register = props => {
  const [userinput,setUserinput]=  useReducer(
    (state,NewState) =>({...state, ...NewState}),
    {
      username:'',
      userpassword:'',
      firtname:'',
      lastname:''
    }
  )
  const history = useHistory();
   const {clear} = props
  const handleBack = () => {
    history.push('/login');
    clear("asdaasdasdasd")
  };
  const Handlechange= (event)=>{
    event.preventDefault()
    const name = event.target.name;
    const newValue = event.target.value;
    setUserinput({[name]:newValue})
  }
  const handleSubmit = async (event) => {
        event.preventDefault();
        const {firstname,lastname,username,userpassword} = event.target.elements
        const {register} = props
        const check = await register({
          firtname:firstname.value,
          lastname: lastname.value,
          username:username.value,
          userpassword:userpassword.value
        })
        if(check){
          history.push("/Login")
        }
        
    }

        return (


          <div className="container h-100">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card2">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container">
						<img src="http://cdn.marketplaceimages.windowsphone.com/v8/images/7aa31780-7d9f-4636-905c-133eb2ca85a3?imageType=ws_icon_medium" className="brand_logo" alt="Logo"/>
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form method="POST" onSubmit={handleSubmit}>
          <div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"/></span>
							</div>
							<input required type="text" name="firstname" onChange={Handlechange} className="form-control input_user " value={userinput.firstname} placeholder="First name"/>
						</div>
            <div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"/></span>
							</div>
							<input required type="text" name="lastname" onChange={Handlechange} className="form-control input_user" value={userinput.lastname} placeholder="Last name"/>
						</div>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"/></span>
							</div>
							<input required type="text" name="username" onChange={Handlechange} className="form-control input_user" value={userinput.username} placeholder="username"/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"/></span>
							</div>
							<input required type="password" name="userpassword" onChange={Handlechange} className="form-control input_pass" value={userinput.userpassword} placeholder="password"/>
						</div>
						<div className="d-flex justify-content-center mt-3 login_container">
              <div className="form-group">
              <button type="submit" name="button" className="btn btn-danger">Register</button>
                <button type="button" className="btn btn-link" onClick={handleBack}>Cancel</button>
              </div>
				
				</div>
					</form>
				</div>
			</div>
		</div>
	</div>














        //   <div className="container">
        //   <form onSubmit={handleSubmit}>
        //   <FormGroup controlId="fistname" bsSize="large">
        //       <FormLabel>FirstName</FormLabel>
        //       <FormControl
        //         autoFocus
        //         name="firstname"
        //         type="text"
        //       />
        //     </FormGroup>
        //     <FormGroup controlId="lastname" bsSize="large">
        //       <FormLabel>LastName</FormLabel>
        //       <FormControl
        //         autoFocus
        //         name="lastname"
        //         type="text"
        //       />
        //     </FormGroup>
        //     <FormGroup controlId="username" bsSize="large">
        //       <FormLabel>Username</FormLabel>
        //       <FormControl
        //         autoFocus
        //         name="username"
        //         type="text"
        //       />
        //     </FormGroup>
        //     <FormGroup controlId="password" bsSize="large">
        //       <FormLabel>Password</FormLabel>
        //       <FormControl
        //         type="password"
        //         name="userpassword"
        //       />
        //     </FormGroup>
        //     <div class="form-group">
        //       <button  type="submit" class="btn btn-primary">Register</button>
        //       <button class="btn btn-link" onClick={handleBack}>Cancel</button>
        //       </div>
            
        //   </form>
        // </div>
        );
  };
  const mapDispatchToProps = dispatch => {
    return {
      register: user => {
        return dispatch(actionTypes.Signup(user));
      },
      clear: (value) =>{
        return dispatch(alert.clear(value));
      }
    };
  };

export default connect(null,mapDispatchToProps)(Register);