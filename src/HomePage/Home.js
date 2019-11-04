import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = props => {
  const { user,handleLogOut,RequireSocket} = props;
  const history = useHistory();
  if (JSON.parse(localStorage.getItem('token')) === null) {
    history.push('/login');
    return <></>;
  }
  if (user === null) {
    return <></>;
  }
  const LogOut  = ()=>{
    handleLogOut()
    history.push('/login');
  }
  const PlayVsCom = ()=>{
    history.push('/Play');
  }
  const handleEdit = (event) =>{
    event.preventDefault()
    history.push("/Edit")
  }
  const PlayVsOnline = (event) =>{
    event.preventDefault()
    RequireSocket()
    history.push("/TestConnect")
  }

  
  return (
    <div className="container  ">
      <div className="row d-flex justify-content-center ">
        <div className="col-md-4">
            <div className="card">
              <img src={user.urlimage} className="card-img-top img-thumbnail" alt="..."/>
              <div className="card-body">
                <h4 className="d-flex justify-content-center">{user.username}</h4>
                <button type="button"  className="btn btn-danger btn-block" onClick={handleEdit}>Chỉnh sửa</button>
              </div>
            </div>
        </div>
        <div className="col-md-4 mt-5">
          <div className="  flex-column  align-items-start">
            <div className="mb-2">
            <button type="button" className="btn btn-danger btn-lg btn-block" onClick={PlayVsCom} >
              Chơi với máy
            </button>
            </div>
            <div className="mb-2">
            <button type="button" onClick={PlayVsOnline} className="btn btn-danger btn-lg btn-block " >
              Chơi online
            </button>
            </div>
            <div className="mb-2">
            <button type="button" className="btn btn-danger btn-lg btn-block "  onClick={LogOut}>
              Đăng xuất
            </button>
            </div>

           
           
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
