/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal,Button,Image } from 'react-bootstrap';
import './Board.css';
import Square from '../components/square/Square';
import * as actionTypes from '../store/actions/actions';

const PlayOnline = props => {
  const history = useHistory();
  const {
    user,
    IsFinish,
    socket,
    playerDoiThu,
    squares,
    handleClick,
    XapXep,
    clickSort,
    ListHistory,
    clickUndo,
    IsUndo,
    ChatMessages,
    handlesendmessage,
    message,
    savemess,
    responsemessage,
    YourTurn,
    IsWin,
    ChooseHistory,
    responsefinish,
    hirepop,
    PopMenu,
    requireundo,
    handleundo,
    surrender,
    XinHoa,
    handleXinHoa,
    handleHoaOrKhong,
  } = props;

  const handleChangeMsg = event => {
    handlesendmessage(event.target.value);
  };
  const HandleDongY = ()=>{
    socket.emit("sent_undo",true)
    handleundo(true)
  }
  const HandleHuy = ()=>{
    socket.emit("sent_undo",false)
    handleundo(false)
  }
  
  console.log("XinHoa = ",XinHoa);
  
  const GetDate = () => {
    const today = new Date();
    return today.getHours() + ':' + today.getMinutes();
  };
  const HandleChat = () => {
    socket.emit('chat_message', message);
    const info = {
      mes: message,
      IsComming: false,
      player: user,
      datemes: GetDate()
    };
    savemess(info);
    handlesendmessage('');
  };
  useEffect(() => {
    socket.on('chat_2_clients', data => {
      const info = {
        mes: data,
        IsComming: true,
        player: playerDoiThu,
        datemes: GetDate()
      };
      savemess(info);
    });
    socket.on('Respone_ClickSquare', data => {
      responsemessage(data);
    });
    socket.on('Respone_Finishgame', data => {
      responsefinish(data);
    });
    socket.on('Response_undo', () => {
      requireundo()
    });
    socket.on('result_undo', data => {
        if(data ===true){
          clickUndo()
        }
    });
    socket.on('Response_Surrender', () => {
      surrender(false)
        });
        
  socket.on('Response_XinHoa', () => {
        console.log("Response_XinHoa = ");
        handleXinHoa()
      });
      socket.on('Response_HoaOrKhong', (value) => {
        handleHoaOrKhong(value)
  });
  }, []);
  const handleBack = () => {
    history.push('/');
  };

  const UndoPlayer = () => {
    if( !IsFinish){
      socket.emit("UNDO_MESSAGE","undo")
    }
  };
  const pStyle = {
    width: '100px',
    height: '100px'
  };
  const ClickSquare = value => {
    console.log("Click square =  ",YourTurn);
    if (YourTurn) {
      handleClick(value);
      socket.emit('Click_square', value);
    }
  };
  if (IsFinish === true) {
    socket.emit('Finish_game',ChooseHistory);
  }
  const handleSurrender= ()=>{
    if (IsFinish === false) {
      console.log("press handleSurrender  ");
      
      socket.emit('Surrender',true);
      surrender(true)
    }
  }
  const HandleXinHoa = ()=>{
    socket.emit('Xin_Hoa',true);
    
  }
  const HandleDongyHoa = ()=>{
    handleHoaOrKhong(true)
    socket.emit('handle_Hoa',true);
  }
  const HandleHuyHoa = ()=>{
    handleHoaOrKhong(false)
    socket.emit('handle_Hoa',false);
  }
  const matrixSize = 20;
  const rows = Array(matrixSize).fill(null);
  const cols = rows;
  const HandleClose = ()=>{
    hirepop()
  }
  const board = rows.map((row, i) => {
    const squares1 = cols.map((col, j) => {
      const squareKey = i * matrixSize + j;
      const Check1 = 'squareCheck';
      const NonCheck = 'square';
      const value = ChooseHistory.slice().find(element => {
        return element === squareKey;
      });
      if (typeof value !== 'undefined') {
        return (
          <Square
            ClassSquare={Check1}
            keyInx={squareKey}
            value={squares[squareKey]}
            click={() => ClickSquare(squareKey)}
          />
        );
      }
      return (
        <Square
          ClassSquare={NonCheck}
          keyInx={squareKey}
          value={squares[squareKey]}
          click={() => ClickSquare(squareKey)}
        />
      );
    });

    return (
      <div className="board-row" key={i}>
        {squares1}
      </div>
    );
  });
  return (
    <div className="container-fluid">
      <div className=" mb-1 row justify-content-center ">
        <div className="col-md-10 ">
          <div className="d-flex justify-content-center ">
            <h1 className=" p-2 m-2 text-light font-weight-bold ">GAME CARO</h1>
          </div>
        </div>
        <div className="col-md-2 ">
          <div className="d-flex justify-content-center ">
            <button
              onClick={handleBack}
              className=" p-2 mt-3 text-light font-weight-bold  bg-danger"
            >
              BACK MENU
            </button>
          </div>
        </div>
      </div>
      <div className="ContainerGame  bg-dark ">
        <div className="Menu mr-2 ">
          <div className="d-flex justify-content-center">
            <h3 className=" mr-2 p-1 text-light  font-weight-bold ">
              {playerDoiThu.username}
            </h3>
          </div>
          <div className="d-flex justify-content-center text-center mb-1">
            <img
              className="rounded-circle"
              style={pStyle}
              src={playerDoiThu.urlimage}
              alt="xxx"
            />
          </div>
          <h4 className="m-1 text-light font-weight-bold ">CHAT</h4>
          <div className="History border">
            <div className="list-group m-1">
              {(ChatMessages || []).map(item =>
                item.IsComming ? (
                  <div className="incoming_msg">
                    <div className="incoming_msg_img">
                      
                      <img src={item.player.urlimage} alt="sunil" />
                    </div>
                    <div className="received_msg">
                      <div className="received_withd_msg">
                        <p>{item.mes}</p>
                        <span className="time_date">{item.datemes}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="outgoing_msg">
                    <div className="sent_msg">
                      <p>{item.mes}</p>
                      <span className="time_date">{item.datemes}</span>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="row ChatBox">
            <div className="col-md-8">
              <textarea
                name="msgtext"
                onChange={handleChangeMsg}
                maxLength="100"
                rows="4"
                cols="40"
                value={message}
              />
            </div>
            <button
              onClick={HandleChat}
              className="col-md-3 ml-4  btn-success btn  "
            >
              <p className="mb-4 font-weight-bold text-light ">Send</p>
            </button>
          </div>
        </div>

        <div className="board">{board}</div>
        <div className="Menu ">
          <div className="d-flex justify-content-center">
            <h3 className=" mr-2 p-1 font-weight-bold text-light ">
              {user.username}
            </h3>
          </div>
          <div className="d-flex justify-content-center text-center mb-1">
            <img
              className="rounded-circle"
              style={pStyle}
              src={user.urlimage}
              alt="xxx"
            />
          </div>
          <div className="d-flex justify-content-center m-1 p-1">
            <button disabled={YourTurn} className="btn btn-info ml-2" onClick={UndoPlayer}>
              Đi lại
            </button>
            <button className="btn btn-danger ml-2" onClick={handleSurrender}>
              Đầu hàng
            </button>
            <button className="btn btn-info ml-2" onClick={HandleXinHoa}>
              Xin hòa
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <h4 className="m-1  text-light font-weight-bold ">Lịch sử đánh</h4>
            <select
              defaultValue={XapXep}
              onChange={e => clickSort(e.target.value)}
            >
              <option value="tangdan" selected>
                Tăng dần
              </option>
              <option value="giamdan">Giảm dần</option>
            </select>
          </div>

          <div className="History">
            <div className="list-group m-1">
              {(ListHistory || []).map(item => (
                <button className={item.classname} key={item.ViTri}>
                  #{item.LuotDanh} Player {item.player} [
                  {parseInt(item.ViTri / 20) + 1},
                  {item.ViTri - parseInt(item.ViTri / 20) * 20 + 1}]
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal show={IsUndo}>
        <Modal.Header closeButton>
        <Modal.Title variant="success" > Đối thủ xin đi lại </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleDongY} >
            Đồng ý
          </Button>
          <Button variant="secondary" onClick={HandleHuy} >
            Không
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={XinHoa}>
        <Modal.Header closeButton>
        <Modal.Title variant="success" > Đối thủ xin hòa</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleDongyHoa} >
            Đồng ý
          </Button>
          <Button variant="secondary" onClick={HandleHuyHoa} >
            Không
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={PopMenu}>
        <Modal.Header closeButton>
        <Modal.Title variant="success" >FINISH</Modal.Title>
        
          
        </Modal.Header>
        {IsWin ?(
        <Modal.Body>
            <Image src={process.env.PUBLIC_URL + '/trophy.png'}  roundedCircle />
            </Modal.Body>
          ):(
            <Modal.Body>
             YOU LOSE
            </Modal.Body>
          )}
        <Modal.Footer>
          <Button variant="secondary" onClick={HandleClose} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapSateToProps = state => {
  return {
    squares: state.gameonline.squares,
    IsFinish: state.gameonline.IsFinish,
    ListHistory: state.gameonline.ListHistory,
    LuotDanh: state.gameonline.LuotDanh,
    ChooseHistory: state.gameonline.ChooseHistory,
    ImageTurn: state.gameonline.ImageTurn,
    Player: state.gameonline.Player,
    XapXep: state.gameonline.XapXep,
    ChatMessages: state.gameonline.ChatMessages,
    message: state.gameonline.message,
    user: state.user,
    YourTurn: state.gameonline.YourTurn,
    IsWin:state.gameonline.IsWin,
    PopMenu:state.gameonline.popMenu,
    IsUndo:state.gameonline.IsUndo,
    XinHoa:state.gameonline.XinHoa,
    DaHoa:state.gameonline.DaHoa,
  };
};
const mapDispathToProps = dispatch => {
  return {
    clickHistory: value => dispatch(actionTypes.clickHistory(value)),
    handleClick: id => dispatch(actionTypes.handleClick(id)),
    clickRestart: () => dispatch(actionTypes.clickreset()),
    clickSort: value => dispatch(actionTypes.clicksort(value)),
    clickUndo: () => dispatch(actionTypes.clickUndoPlayer()),
    handlesendmessage: value => dispatch(actionTypes.message(value)),
    savemess: value => dispatch(actionTypes.chatmessage(value)),
    responsemessage: value => dispatch(actionTypes.responsemessage(value)),
    responsefinish:value =>dispatch(actionTypes.responsefinish(value)),
    hirepop:value =>dispatch(actionTypes.hirepop(value)),
    requireundo: () =>dispatch(actionTypes.requireundo()),
    handleundo:(value)=> dispatch(actionTypes.handleundo(value)),
    surrender:(value)=> dispatch(actionTypes.surrender(value)),
    handleXinHoa:()=> dispatch(actionTypes.xinhoa()),
    handleHoaOrKhong: (value) =>dispatch(actionTypes.handleHoa(value)),
    
  };
};

export default connect(
  mapSateToProps,
  mapDispathToProps
)(PlayOnline);
