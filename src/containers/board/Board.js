/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable radix */
import { connect } from 'react-redux';
import React from 'react';
import { Modal,Button,Image } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Board.css';
import Square from '../../components/square/Square';
import * as actionTypes from '../../store/actions/actions';

const Board = props => {
  const history = useHistory();
  const {
    user,
    squares,
    ChooseHistory,
    handleClick,
    clickRestart,
    IsWin,
    hirepoppc,
    ShowPop,
    XapXep,
    clickSort,
    clickHistory,
    ListHistory,
    clickUndo
  } = props;
  const handleBack = ()=>{
    history.push('/');
  }
  const HandleClose = ()=>{
    hirepoppc()
  }
  if (JSON.parse(localStorage.getItem('token')) === null) {
    history.push('/login');
    return <></>;
  }
  if (user === null) {
    handleBack()
    return <></>;
  }
  

  const UndoPlayer = () => {
    let id = -1;
    for (let i = 0; i < ListHistory.length; i++) {
      if (
        ListHistory[i].classname ===
        'list-group-item list-group-item-action mt-1 active'
      ) {
        id = i;
        break;
      }
    }
    if (id !== -1) {
      clickUndo(ListHistory[id]);
    }
  };
  const pStyle = {
    width: '100px',
    height: '100px'
  };
  const pStyle2 = {
    width: '930px',
    height: '720px'
  };
  const matrixSize = 20;
  const rows = Array(matrixSize).fill(null);
  const cols = rows;
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
            click={() => handleClick(squareKey)}
          />
        );
      }
      return (
        <Square
          ClassSquare={NonCheck}
          keyInx={squareKey}
          value={squares[squareKey]}
          click={() => handleClick(squareKey)}
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
    <div style={pStyle2} className="container rounded border border-black">
      <div className="bg-danger mb-1 row justify-content-center ">
        <div className="col-md-10 ">
          <div className="d-flex justify-content-center ">
            <h1 className=" p-2 m-2 text-light font-weight-bold ">GAME CARO</h1>
          </div>
        </div>
        <div className="col-md-2 ">
        <div className="d-flex justify-content-center ">  
          <button onClick ={handleBack} className=" p-2 mt-3 text-light font-weight-bold  bg-danger">BACK MENU</button>
          </div>
           
        
        </div>
      </div>
      <div className="ContainerGame ">
        <div className="board">{board}</div>
        <div className="bg-dark Menu text-white">
          <div className="d-flex justify-content-center">
            <h3 className=" mr-2 p-1">{user.username}</h3>
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
            <button className="btn btn-danger" onClick={clickRestart}>
              New game
            </button>
            <button className="btn btn-info ml-2" onClick={UndoPlayer}>
              Undo
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <h4 className="m-1 ">Lịch sử đánh</h4>
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
                <button
                  className={item.classname}
                  onClick={() => clickHistory(item.ViTri)}
                  key={item.ViTri}
                >
                  #{item.LuotDanh} Player {item.player} [
                  {parseInt(item.ViTri / 20) + 1},
                  {item.ViTri - parseInt(item.ViTri / 20) * 20 + 1}]
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <Modal show={ShowPop}>
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
    squares: state.game.squares,
    IsFinish: state.game.IsFinish,
    ListHistory: state.game.ListHistory,
    LuotDanh: state.game.LuotDanh,
    ChooseHistory: state.game.ChooseHistory,
    ImageTurn: state.game.ImageTurn,
    Player: state.game.Player,
    XapXep: state.game.XapXep,
    user: state.user,
    IsWin:state.game.IsWin,
    ShowPop:state.game. ShowPop
  };
};
const mapDispathToProps = dispatch => {
  return {
    clickHistory: value => dispatch(actionTypes.clickHistory(value)),
    handleClick: id => dispatch(actionTypes.handleClick(id)),
    clickRestart: () => dispatch(actionTypes.clickreset()),
    clickSort: value => dispatch(actionTypes.clicksort(value)),
    clickUndo: value => dispatch(actionTypes.clickUndo(value)),
    hirepoppc: () => dispatch(actionTypes.hirepoppc()),
    
  };
};

export default connect(
  mapSateToProps,
  mapDispathToProps
)(Board);

