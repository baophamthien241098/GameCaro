/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable radix */
import { connect } from 'react-redux';
import React from 'react';
import './Board.css';
import Square from '../../components/square/Square';
import * as actionTypes from '../../store/actions/actions';

class Board extends React.Component {
 
  render() {
    const { squares, ChooseHistory } = this.props;
    const matrixSize = 20;
    const rows = Array(matrixSize).fill(null); 
    const cols = rows;
    const board = rows.map((row,i) => {
      const squares1 = cols.map((col,j) => {
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
              click={() => this.props.handleClick(squareKey)}
            />
          );
        }
        return (
          <Square
            ClassSquare={NonCheck}
            keyInx={squareKey}
            value={squares[squareKey]}
            click={() => this.props.handleClick(squareKey)}
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
      <div className="container">
        <h1 className="d-flex justify-content-center m-4">GAME CARO</h1>

        <div className="ContainerGame ">
          <div className="board">{board}</div>
          <div className="bg-dark Menu text-white">
            <div className="d-flex justify-content-center m-1 p-1">
              <button
                className="btn btn-danger"
                onClick={this.props.clickRestart}>
                New game
              </button>
            </div>
            <div className="d-flex justify-content-center p-2">
              <h3 className=" mr-2 p-1">Player</h3>
            </div>
            <div className="d-flex justify-content-center p-2">
              <img src={this.props.ImageTurn} alt="xxx" />
            </div>
            <div className="d-flex justify-content-between">
              <h4 className="m-1 ">Lịch sử đánh</h4>
              <select defaultValue={this.props.XapXep} onChange={(e) => this.props.clickSort(e.target.value)}>
                <option value="tangdan" selected>
                  Tăng dần
                </option>
                <option value="giamdan">Giảm dần</option>
              </select>
            </div>

            <div className="History">
              <div className="list-group m-1">
                {(this.props.ListHistory || []).map(item => (
                  <button
                    className={item.classname}
                    onClick={() => this.props.clickHistory(item.ViTri)}
                    key={item.ViTri}>
                    #{item.LuotDanh} Player {item.player} [
                    {parseInt(item.ViTri / 20) + 1},
                    {item.ViTri - parseInt(item.ViTri / 20) * 20 + 1}]
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapSateToProps = state => {
  return {
    squares: state.squares,
    IsFinish: state.IsFinish,
    ListHistory: state.ListHistory,
    LuotDanh: state.LuotDanh,
    ChooseHistory: state.ChooseHistory,
    ImageTurn: state.ImageTurn,
    Player: state.Player,
    XapXep: state.XapXep
  };
};
const mapDispathToProps = dispatch =>{
  return {
    clickHistory: (value) => dispatch(actionTypes.clickHistory(value)),
    handleClick:(id) => dispatch (actionTypes.handleClick(id)),
    clickRestart:() => dispatch(actionTypes.clickreset()),
    clickSort:(value) =>dispatch(actionTypes.clicksort(value)),
  };
};

export default connect(mapSateToProps,mapDispathToProps)(Board);
