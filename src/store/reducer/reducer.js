/* eslint-disable prefer-template */
/* eslint-disable radix */
import Toe from '../../toe.png';
import Tich from '../../tic.png';
import * as actionTypes from '../actions/actions'

const initialState = {
  squares: Array(400).fill(null),
  IsFinish: false,
  ListHistory: [],
  LuotDanh: 0,
  ChooseHistory: [],
  ImageTurn: Tich,
  Player: 'X',
  XapXep: 'tangdan'
};
function CheckCheoTrai(squares, value, idx) {
    const arr = [];
    arr[0] = idx;
    const MaxLengh = 19;
    const row = parseInt(idx / 20);
    const col = idx - row * 20;
    let i = row;
    let j = col;
    let Dem = 1;
    let BiChanTren = false;
    let BiChanDuoi = false;
  
    while (i >= 0) {
      i -= 1;
      j -= 1;
      if (i < 0 || j < 0) {
        BiChanDuoi = true;
        break;
      }
      const index = i * 20 + j;
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        arr[Dem] = index;
        Dem += 1;
      } else {
        BiChanDuoi = true;
      }
    }
    i = row;
    j = col;
    while (i < 20) {
      i += 1;
      j += 1;
      if (j > MaxLengh) {
        break;
      }
      const index = i * 20 + j;
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        arr[Dem] = index;
        Dem += 1;
      } else {
        BiChanTren = true;
      }
    }
    if (Dem === 5) {
      if (BiChanTren === false || BiChanDuoi === false) {
        return arr;
      }
    }
    if (Dem > 5) {
      return arr;
    }
    return null;
  }
  function CheckCot(squares, value, idx) {
    let Dem = 1;
    const arr = [];
    arr[0] = idx;
    const row = parseInt(idx / 20);
    const col = idx - row * 20;
    let i = row;
    const j = col;
  
    let BiChanTren = false;
    let BiChanDuoi = false;
    while (i >= 0) {
      i -= 1;
      const index = i * 20 + j;
  
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        arr[Dem] = index;
        Dem += 1;
      } else {
        BiChanDuoi = true;
        break;
      }
    }
    i = row;
    while (i < 20) {
      i += 1;
      if (j < 0) {
        break;
      }
      const index = i * 20 + j;
  
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        arr[Dem] = index;
        Dem += 1;
      } else {
        BiChanTren = true;
        break;
      }
    }
    if (Dem === 5) {
      if (BiChanTren === false || BiChanDuoi === false) {
        return arr;
      }
    }
    if (Dem > 5) {
      return arr;
    }
    return null;
  }
  function CheckHang(squares, value, idx) {
    let Dem = 1;
    const arr = [];
    arr[0] = idx;
    const row = parseInt(idx / 20);
    const col = idx - row * 20;
    const i = row;
    let j = col;
    let BiChanTren = false;
    let BiChanDuoi = false;
    while (j >= 0) {
      j -= 1;
      const index = i * 20 + j;
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        arr[Dem] = index;
        Dem += 1;
      } else {
        BiChanDuoi = true;
        break;
      }
    }
    j = col;
    while (j < 20) {
      j += 1;
      if (j < 0) {
        break;
      }
      const index = i * 20 + j;
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        arr[Dem] = index;
        Dem += 1;
      } else {
        BiChanTren = true;
        break;
      }
    }
  
    if (Dem === 5) {
      if (BiChanTren === false || BiChanDuoi === false) {
        return arr;
      }
    }
    if (Dem > 5) {
      return arr;
    }
    return null;
  }
  function CheckCheoPhai(squares, value, idx) {
    let Dem = 1;
    const arr = [];
    arr[0] = idx;
    const row = parseInt(idx / 20);
    const col = idx - row * 20;
    let i = row;
    let j = col;
  
    let BiChanTren = false;
    let BiChanDuoi = false;
    while (i >= 0) {
      i -= 1;
      j += 1;
      if (i < 0 || j > 19) {
        break;
      }
      const index = i * 20 + j;
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        Dem += 1;
        arr[Dem] = index;
      } else {
        BiChanDuoi = true;
        break;
      }
    }
    i = row;
    j = col;
    while (i < 20) {
      i += 1;
      j -= 1;
      if (j < 0) {
        break;
      }
      const index = i * 20 + j;
      if (squares[index] === null) {
        break;
      } else if (squares[index] === value) {
        arr[Dem] = index;
        Dem += 1;
      } else {
        BiChanTren = true;
        break;
      }
    }
    if (Dem === 5) {
      if (BiChanTren === false || BiChanDuoi === false) {
        return arr;
      }
    }
    if (Dem > 5) {
      return arr;
    }
    return null;
  }
  function CheckWingGame(squares, value, i) {
    if (CheckCheoTrai(squares, value, i) != null) {
      return CheckCheoTrai(squares, value, i);
    }
    if (CheckCheoPhai(squares, value, i) != null) {
      return CheckCheoPhai(squares, value, i);
    }
    if (CheckCot(squares, value, i) != null) {
      return CheckCot(squares, value, i);
    }
    if (CheckHang(squares, value, i) != null) {
      return CheckHang(squares, value, i);
    }
    return null;
  }
function Checked(id, arr) {
  const Temp = arr.slice();
  for (let i = 0; i < Temp.length; i += 1) {
    if (Temp[i].ViTri !== id) {
      Temp[i].classname = 'list-group-item list-group-item-action mt-1';
    } else {
      Temp[i].classname = 'list-group-item list-group-item-action mt-1 active';
    }
  }
  return Temp;
}

const reducer = (state = initialState, action) => {
    
  switch (action.type) {
    case actionTypes.CLICK_HISTORY: {
        const id=  action.val;

    const { ListHistory } = state;
      const historyL = Checked(id, ListHistory.slice());
      for (let i = 0; i < historyL.length; i += 1) {
        if (historyL[i].ViTri !== id) {
          historyL[i].classname = 'list-group-item list-group-item-action mt-1';
        } else {
          historyL[i].classname =
            'list-group-item list-group-item-action mt-1 active';
        }
      }
      const temp = historyL.filter(item => {
        return item.ViTri === id;
      });
      const temp2 = temp[0];
      const Choose = historyL.filter(number => {
        return number.LuotDanh <= temp2.LuotDanh;
      });
      const square = Array(400).fill(null);
      Choose.forEach(item => {
        square[item.ViTri] = item.player;
      });
      let PlayerNext = 'X';
      if (temp.player === 'X') {
        PlayerNext = 'Y';
      }
      return {
        ... state,
        squares: square,
        Player: PlayerNext,
        LuotDanh: temp2.LuotDanh,
        ImageTurn: temp2.imagePlayer
      }
  
    }
    case actionTypes.HANDLE_CLICK:{
        const i=  action.val;
        let handle = {
           ... state,
        }
        const {squares,IsFinish,ListHistory,LuotDanh,Player,XapXep} = state;  
     if (!IsFinish) {
        const squaresImp = squares.slice();
        const historyL = ListHistory.slice().filter(item => {
             return item.LuotDanh <= LuotDanh;
               });
      const LD = LuotDanh + 1;
      let TichToe = Tich;
      let PlayerNext = '';
      if (squaresImp[i] == null) {
        if (Player === 'X') {
          squaresImp[i] = 'X';
          PlayerNext = '0';
          TichToe = Toe;
        } else {
          squaresImp[i] = '0';
          PlayerNext = 'X';
          TichToe = Tich;
        }
        const Temp = {
          player: Player,
          LuotDanh: LD,
          ViTri: i,
          imagePlayer: TichToe,
          classname: 'list-group-item list-group-item-action mt-1 active'
        };

        historyL.push(Temp);
        const NewCheck = Checked(Temp.ViTri, historyL);
        if (XapXep === 'tangdan') {
          NewCheck.sort((a, b) => {
            return a.LuotDanh - b.LuotDanh;
          });
        } else {
          NewCheck.sort((a, b) => {
            return b.LuotDanh - a.LuotDanh;
          });
        }
        handle = {
            ...state,
            squares: squaresImp,
            Player: PlayerNext,
            ImageTurn: TichToe,
            ListHistory: NewCheck,
            LuotDanh: LD
        } 
        const check = CheckWingGame(squares, squaresImp[i], i);
        if (check != null) {
          window.alert(squaresImp[i] + ' win ! ');
          handle.IsFinish =  true;
          handle.ChooseHistory =  check;
          return handle;
        }
       return handle;
      }
    } 
    return state;  
    }
    case actionTypes.CLICK_RESET:{
        return {
            ...state,
            squares: Array(400).fill(null),
            ListHistory: [],
            LuotDanh: 0,
            IsFinish: false,
            ChooseHistory: [],
            Player: 'X',
            XapXep: 'giamdan',
            ImageTurn: Tich
        }
    }
    case actionTypes.CLICK_SORT:{
        const sortv = action.val;
         const {ListHistory} = state;
        const HistorySlice = ListHistory.slice();
        if (sortv === 'tangdan') {
          HistorySlice.sort((a, b) => {
            return a.LuotDanh - b.LuotDanh;
          });
        } else if (sortv === 'giamdan') {
          HistorySlice.sort((a, b) => {
            return b.LuotDanh - a.LuotDanh;
          });
        }
        return {
            ...state,
            ListHistory: HistorySlice,
            XapXep: sortv,

        }
    }
    default: {
      break;
    }
  }
  return state;
};
export default reducer;
