/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable radix */
import Toe from '../../toe.png';
import Tich from '../../tic.png';
import * as actionTypes from '../actions/actions'



const initialState = {
  squares: Array(400).fill(null),
  IsFinish: false,
  YourTurn:true,
  ListHistory: [],
  LuotDanh: 0,
  IsWin:false,
  ImageTurn: Tich,
  ChooseHistory:[],
  Player: 'X',
  XapXep: 'tangdan',
  ChatMessages:[],
  message:'',
  popMenu:false,
  IsUndo:false,
  XinHoa:false,
  DaHoa:false,
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
    case actionTypes.HANDLEXINHOA:{
      if(action.val === true){
        return {
          ...state,
          DaHoa:true,
          XinHoa:false,
          IsFinish:true,
          YourTurn:false,
        }
      }
      return {
        ... state,
        XinHoa:false,
      }
    
    }
    case actionTypes.XINHOA:{
      console.log("reducer xin hoa");
      return {
        ... state,
        XinHoa:true,
      }
    }
    case actionTypes.SURRENDER:{
      if(action.val === true){
        return {
          ...state,
          IsFinish:true,
          IsWin:false,
          popMenu:true,
          YourTurn:false,
        }
      }
      return {
        ...state,
        IsFinish:true,
        IsWin:true,
        popMenu:true,
        YourTurn:false,
      }
    }
    case actionTypes.REQUIRE_UNDO:{
      return {
        ... state,
        IsUndo:true,
      }
    }
    case actionTypes.HANDLE_UNDO:{
  
      if (action.val === true){
        const {ListHistory} = state;
        const historyL = ListHistory.slice()
        if(historyL.length !== 0){
          historyL.splice(historyL.length-1,1)
          const squareNew = Array(400).fill(null);
        historyL.forEach(item => {
          squareNew[item.ViTri] = item.Player;
      });
        return {
          ... state,
          squares:squareNew,
          IsUndo:false,
          YourTurn:false,
          ListHistory:historyL,
        }
        } 
      
        
      }
      return {...state,
        IsUndo:false,
      }
    }
    case actionTypes.HIRE_POPMENU:{
      return {
        ...state,
        popMenu:false
      }
    }
    case actionTypes.RESPONSE_FINISHGAME:{
    
      if(state.IsFinish === false){
        return {
          ... state,
          IsWin:false,
          ChooseHistory:action.val,
          IsFinish:true,
          YourTurn:false,
          popMenu:true,
        }
      }
      return state
      
    }
    case actionTypes.MESSAGE:{
    
      return {
        ...state,
        message:action.val
      }

    }
   
    case actionTypes.CHAT_MESSAGE:{
      const Chat = state.ChatMessages.slice()
      Chat.push(action.val)
      return {
        ...state,
        ChatMessages:Chat
      }
      
    }
    case actionTypes.RESPONSE_CLICK:{
      const i=  action.val;
      const {squares,ListHistory,LuotDanh,XapXep} = state;  
      const squaresImp = squares.slice();
        const historyL = ListHistory.slice()
      const LD = LuotDanh + 1;
      let TichToe = Tich;
      if (squaresImp[i] == null) {
        squaresImp[i] = '0';
        TichToe = Tich;
      
        const Temp = {
          LuotDanh: LD,
          ViTri: i,
          imagePlayer: TichToe,
          classname: 'list-group-item list-group-item-action mt-1 ',
          Player:"0",
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
        return {
            ...state,
            squares: squaresImp,
            ImageTurn: TichToe,
            ListHistory: NewCheck,
            LuotDanh: LD,
            YourTurn:true,
        } 
      }
      return state
    }
    case actionTypes.HANDLE_CLICK:{
     
        const i=  action.val;
        let handle = {
           ... state,
        }
        const {squares,IsFinish,ListHistory,LuotDanh,XapXep,YourTurn} = state;  
     if (!IsFinish && YourTurn) {
        const squaresImp = squares.slice();
        const historyL = ListHistory.slice()
      const LD = LuotDanh + 1;
      let TichToe = Tich;
      if (squaresImp[i] == null) {
        squaresImp[i] = 'X';
        TichToe = Toe;
      
        const Temp = {
          LuotDanh: LD,
          ViTri: i,
          imagePlayer: TichToe,
          classname: 'list-group-item list-group-item-action mt-1 ',
          Player:"X",
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
            ImageTurn: TichToe,
            ListHistory: NewCheck,
            LuotDanh: LD,
            YourTurn:false,
          
        } 
        const check = CheckWingGame(squares, squaresImp[i], i);
        if (check != null) {
          handle.IsFinish =  true;
          handle.ChooseHistory = check;
          handle.IsWin = true;
          handle.popMenu =true;
          return handle;
        }
       return handle;
      }
    } 
    return state;  
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
    case actionTypes.HANDLE_UNOPLAYER:{
      
      const { ListHistory } = state;

      const historyL  = ListHistory.slice()
      const temp = historyL.pop()
          if( typeof temp !== "undefined"){
            if(temp.Player === "X"){
              const squareNew = Array(400).fill(null);
              historyL.forEach(item => {
                console.log(item.ViTri);
                squareNew[item.ViTri] = item.Player;
            });
            
            
            return {
              ...state,
              ListHistory:historyL,
              squares:squareNew,
              YourTurn:true,
            }
          }
      }
    return state
  }
    default: {
      break;
    }
  }
  return state;
};
export default reducer;
