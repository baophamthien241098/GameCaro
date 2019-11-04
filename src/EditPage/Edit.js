/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
import React,{useReducer} from 'react';
import { useHistory } from 'react-router-dom';



const Edit = props => {
  
  const {user,handleUpdate}= props

  
  const [userinput,setUserinput]=  useReducer(
    (state,NewState) =>({...state, ...NewState}),
    {
     image: user ? user.urlimage : '',
     isLoading: true,
     firtname: user ? user.firtname : '' ,
     lastname:  user ? user.lastname : '' ,
     userpassword:  user ? user.userpassword : ''

    }
  )
  
  const history = useHistory();
  if (JSON.parse(localStorage.getItem('token')) === null) {
    history.push('/login');
    return <></>;
  }
  if (user === null) {
    history.push("/")
    return <></>;
  }

  
 const handleChange = (event)=>{
  event.preventDefault()
  const name = event.target.name;
  const newValue = event.target.value;
  setUserinput({[name]:newValue})
 }
  
  const submitform = async  () =>{

      const updateuser = await handleUpdate({
        id:user.id,
        firtname:userinput.firtname,
        lastname:userinput.lastname,
        Newuserpassword: userinput.userpassword,
        urlimage:userinput.image,
        userpassword:user.userpassword
      })
    
    
   
  }
  const pStyle = {
    width: "500px",
    height: "340px"
 };
 const pStyle2 = {
  width: "400px",
};
  const handleBack = () =>{
    history.push("/")
  }
  const UploadImage = async event => {
    console.log("upload");
    event.preventDefault();
    const files = event.target.files
   
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'nnoikrj5');
    data.append('cloud_name', 'thienbao')
    data.append('api_key', '765755184676358');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/thienbao/image/upload',
      {
        method: 'POST',
        body: data
      }
    );
    if (!res.ok){
      return 
    }
    const file = await res.json();
    console.log(file);
    
    setUserinput({image:file.secure_url})
    setUserinput({isLoading:false})
  
    
  };

  return (
    <div className="row jumbotron">
      <div className="col-md-6">
        <img style={pStyle} className="img-thumbnail" name="image" src={userinput.image } alt="Error"
        />
        <div className="input-group mt-1">
          <div className="input-group-prepend">
            <span className="input-group-text" id="inputGroupFileAddon01">
              Upload
            </span>
          </div>
          <div  className="custom-file ">
            <input
              onChange={UploadImage}
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              encType="multipart/form-data"
              aria-describedby="inputGroupFileAddon01"
            />
            <label className="custom-file-label" htmlFor="inputGroupFile01">
              Choose file
            </label>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <form  onSubmit={submitform}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">UserName</label>
            <input
              type="text"
              name="username"
              className="form-control"
              readOnly
              defaultValue={user.username}
            />
            
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              name="userpassword"
              onChange={handleChange}
              defaultValue={userinput.userpassword}
              placeholder="Password"
              required
            />
             {!userinput.userpassword &&
                            <div className="help-block text-danger">Password is required</div>
                        }
          </div>
          <div className="form-group">
            <label >First Name</label>
            <input
              type="text"
              className="form-control"
              name="firtname"
              onChange={handleChange}
              defaultValue={userinput.firtname}
              required
            />
             {!userinput.firtname &&
                            <div className="help-block text-danger">First Name is required</div>
                        }
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastname"
              onChange={handleChange}
              defaultValue={user.lastname}
              required
            />
             {!userinput.lastname &&
                            <div className="help-block text-danger">Last name is required</div>
                        }
          </div>
          <div className="row mx-md-n5">
          <div className="col px-md-5">
          <button type="submit"  className="btn btn-block btn-danger ">
            Submit
          </button>
          </div>
          <div className="col px-md-5">
          <button type="button" onClick={handleBack} className="btn btn-block btn-danger">
            Cancel
          </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
