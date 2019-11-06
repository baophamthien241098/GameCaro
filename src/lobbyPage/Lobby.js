import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import PlayOnline from '../PlayOnline/PlayOnline';
import * as actionTypes from '../store/actions/actions';
import { useHistory } from 'react-router-dom';
const Lobby = props => {
  const [InputUser, SetUnputUser] = useReducer(
    (state, NewState) => ({ ...state, ...NewState }),
    {
      username: '',
      urlimage: '',
      IsFinding: true,
      Reconnect: false,
      RoomID: '',
      playerDoiThu: '',
      IdSocketDoiThu:''
    }
  );
  const history = useHistory();
  const { socket, user } = props;
    
  const { handleReconnect,resetstate } = props;

  const handleClose = () => {
    SetUnputUser({ Reconnect: false });
    localStorage.removeItem("laststate")
    localStorage.removeItem("lastroom")
    socket.emit('ready_to_connect', "");
  };
  const BtnReconnect = () => {
    const item = localStorage.getItem('laststate')
    const data = JSON.parse(item);
    SetUnputUser({ 
      username: data.playerDoiThu.username,
      urlimage: data.playerDoiThu.urlimage
    });
    handleReconnect(data);
    SetUnputUser({ Reconnect: false });
   
    socket.emit('Reconnect', InputUser.RoomID);
  };
  useEffect(() => {
    if(socket === null || typeof socket === "undefined" ){
    
      history.push("/")
      return
    }
    socket.on('reconnect_success', () => {
          SetUnputUser({
          IsFinding: false
        });
    });
    socket.on('reconnect_fail', () => {
      localStorage.removeItem("laststate")
      localStorage.removeItem("lastroom")
      resetstate()
      history.push("/")
});
    socket.on('connected', () => {
      console.log("------------Connected -------------");
        const idRoom = localStorage.getItem('lastroom');
        console.log("GETID === ",idRoom);
        if (idRoom !== null) {
          SetUnputUser({ Reconnect: true, RoomID: idRoom });
        }else{
          socket.emit('ready_to_connect', "");
        }
      
    });
    socket.on('connectToRoom', response => {
     
      const info = {
        username: user.username,
        urlimage: user.urlimage,
        idsocket:socket.id,
      };
      localStorage.setItem('lastroom', response);
      socket.emit('send_infoUser', info);
    });
    socket.on('revice_infoUser', response => {
      console.log('send_infoUser = ', response);
      SetUnputUser({
        username: response.username,
        urlimage: response.urlimage,
        IsFinding: false,
        IdSocketDoiThu:response.idsocket
      });
    });
  }, []);

  return (
    <div>
      <Modal show={InputUser.Reconnect} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kết nối lại room {InputUser.RoomID}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn kết nối lại !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Không
          </Button>
          <Button variant="primary" onClick={BtnReconnect}>
            Có
          </Button>
        </Modal.Footer>
      </Modal>

      {InputUser.IsFinding ? (
        <div className="container jumbotron">
          <div className="d-flex  justify-content-center">
            <div className="d-block p-2">
              <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-info" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <div className="spinner-grow text-dark" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PlayOnline playerDoiThu={InputUser} socket={socket} />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  socket: state.socket
});
const mapDispathToProps = dispatch => {
  return {
    handleReconnect: value => dispatch(actionTypes.reconnect(value)),
    RequireSocket: () => dispatch(actionTypes.requiresocket()),
    resetstate: () =>dispatch(actionTypes.resetstate()),
  };
};
export default connect(
  mapStateToProps,
  mapDispathToProps
)(Lobby);
