import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Toe from "./toe.png";
import Tich from "./tic.png";

function CheckCheoTrai(squares,value,idx) {
  const arr =[]
  arr[0] = idx
  const MaxLengh = 19
  const row = parseInt(idx/20,100)
  const col = idx - row*20
  let i=row
  let j = col
  let Dem =1
  let BiChanTren = false
  let BiChanDuoi = false
 
  while(i>=0){
    i -=1
    j -=1
    if(i<0 || j <0){
      BiChanDuoi = true
      break
    }
    const index = i*20+j
     if(squares[index] === null){
      break
     }else if(squares[index] === value){   
       arr[Dem] = index
        Dem += 1
    }else{
      BiChanDuoi = true;
    }
  }
  i=row
   j = col
  while(i<20){
    i +=1
    j +=1
    if(j>MaxLengh){
      break
    }
    const index = i*20+j
    if(squares[index] === null){
     break
    }else if(squares[index] === value){   
      arr[Dem] = index
       Dem +=1
   }else{
    BiChanTren = true;
   }
  }
  if(Dem===5){
    if(BiChanTren===false ||  BiChanDuoi === false){
      return arr
    }
  }
  if(Dem>5){
    return arr
  }
  return null
  
}
function CheckCot(squares,value,idx) {
  let Dem =1
  const arr =[]
  arr[0] = idx
  const row = parseInt(idx/20,1000);
  const col = idx - row*20;
  let i=row
  const j = col
  
  let BiChanTren = false;
  let BiChanDuoi = false;
  while(i>=0){
    i -=1;
     const index = i*20+j;
     if(squares[index] === null){
      break;
     }else if(squares[index] === value){   
      arr[Dem]=index
        Dem +=1;
    }else{
      BiChanDuoi = true;
      break;
    }
  }
   i=row;
  while(i<20){
    i +=1;
    if(j<0){
      break;
    }
    const index = i*20+j;
    if(squares[index] === null){
     break;
    }else if(squares[index] === value){ 
      arr[Dem]=index  
       Dem +=1
     
   }else{
    BiChanTren = true;
    break;
   }
  }
  if(Dem===5){
    if(BiChanTren===false ||  BiChanDuoi === false){
      return arr;
    }
  }
  if(Dem>5){
    return arr;
  }
  return null;
}
function CheckHang(squares,value,idx) {
  let Dem =1
  const arr =[]
  arr[0] = idx
  const row = parseInt(idx/20,1000);
  const col = idx - row*20;
  const i=row
  let j = col
  let BiChanTren = false;
  let BiChanDuoi = false;
  while(j>=0){
    j -=1;
    const index = i*20+j;
     if(squares[index] === null){
      break;
     }else if(squares[index] === value){   
        arr[Dem]=index 
        Dem +=1
    }else{
      BiChanDuoi = true;
      break;
    }
  }
  j=col;
  while(j< 20){
    j +=1
    if(j<0){
      break;
    }
    const index = i*20+j;
    if(squares[index] === null){
     break;
    }else if(squares[index] === value){   
      arr[Dem]=index
       Dem +=1
   }else{
    BiChanTren = true;
    break;
   }
  }
  if(Dem === 5){
    if(BiChanTren === false ||  BiChanDuoi === false){
      return arr;
    }
  }
  if(Dem>5){
    return arr;
  }
  return null;
}
function CheckCheoPhai(squares,value,idx) {
  let Dem =1
  const arr =[]
  arr[0] = idx
  const row = parseInt(idx/20,1000);
  const col = idx - row*20;
  let i=row
  let  j = col;
  
  let BiChanTren = false;
  let BiChanDuoi = false;
  while(i>=0){
    i -=1
    j +=1
    if(i<0 || j >19){
      break;
    }
     const index = i*20+j;
     if(squares[index] === null){
      break;
     }else if(squares[index] === value){   
        Dem +=1
        arr[Dem]=index 
    }else{
      BiChanDuoi = true;
      break;
    }
  }
   i=row;
   j = col;
  while(i<20){
    i +=1;
    j -=1;
    if(j<0){
      break;
    }
     const index = i*20+j;
    if(squares[index] === null){
     break;
    }else if(squares[index] === value){   
      arr[Dem]=index
       Dem +=1
   }else{
    BiChanTren = true;
    break;
   }
  }
  if(Dem===5){
    if(BiChanTren===false ||  BiChanDuoi === false){
      return arr;
    }
  }
  if(Dem>5){
    return arr;
  }
  return null;
}
function  CheckWingGame(squares,value,i) {
    let Temp =[]

     if( (Temp = CheckCheoTrai(squares,value,i)) !=null ){
      return Temp
     }else if ((Temp = CheckCheoPhai(squares,value,i)) !=null) {
           return Temp
      }else if ((Temp = CheckCot(squares,value,i)) !=null) {
        return Temp
      }else if  ((Temp = CheckHang(squares,value,i)) !=null) {
        return Temp
      }
        return Temp
}
function Checked(id,arr) {
  const Temp = arr.slice()
  for(let i =0;i<Temp.length;i+=1){
    if( Temp[i].ViTri !== id){
      Temp[i].classname="list-group-item list-group-item-action mt-1"
    }else{
      Temp[i].classname="list-group-item list-group-item-action mt-1 active"
    }
  }
  return Temp
  
}

  class Board extends React.Component{
    constructor(props){
      super(props)
      this.state = {  
        squares: Array(400).fill(null),
        IsFinish:false,
        ListHistory :[],
        LuotDanh:0,
        ChooseHistory:[],
        ImageTurn:Tich,
        Player:'X',
        XapXep:'tangdan',
      }
      this.handleClick = this.handleClick.bind(this);
      this.ClickNewGame = this.ClickNewGame.bind(this);
      this.HandleXapXep = this.HandleXapXep.bind(this);
      this.ClickHistory = this.ClickHistory.bind(this);
      
    }

      HandleXapXep(e){
        let HistorySlice = this.state.ListHistory.slice();  
        if(e.target.value === "tangdan"){
         HistorySlice.sort((a,b) =>{
           return a.LuotDanh  - b.LuotDanh;
         }) 
        }else if(e.target.value === "giamdan"){
          HistorySlice.sort((a,b) =>{
            return b.LuotDanh- a.LuotDanh ;
          }) 
        }
        this.setState({
          ListHistory:HistorySlice,
          XapXep:e.target.value,
        })
       
      }
      ClickNewGame(){
       this.setState({
        squares: Array(400).fill(null),
        //Cho choi tiep hay ko
        ListHistory:[],
        CheckList:[],
        LuotDanh:0,
        IsFinish:false,
        ChooseHistory:[],
        Player:'X',
        XapXep:"giamdan",
        ImageTurn:Tich,
       })
        
      }
    handleClick(i){
       if (!this.state.IsFinish){
        
        const squaresImp = this.state.squares.slice();
        let historyL = this.state.ListHistory.slice().filter((item)=>{
          return item.LuotDanh <= this.state.LuotDanh
        });
        const LD = this.state.LuotDanh+1;
        let TichToe = Tich;
        let PlayerNext='';
        if(squaresImp[i]==null){
          if(this.state.Player ==='X'){
            squaresImp[i] = 'X';
            PlayerNext = '0';
            TichToe = Toe;
          }else{
            squaresImp[i] = '0';
            PlayerNext = 'X';
            TichToe = Tich;
          }
         
          const Temp = { 
            player:this.state.Player,
            LuotDanh: LD,
             ViTri:i,
             imagePlayer:TichToe,
             classname:"list-group-item list-group-item-action mt-1 active"
            };
            console.log(Temp)
          historyL.push(Temp);
          let NewCheck = Checked(Temp.ViTri,historyL)
          if(this.state.XapXep ==="tangdan"){
            NewCheck.sort((a,b) =>{
              return a.LuotDanh  - b.LuotDanh;
            }) 
          }else{
            NewCheck.sort((a,b) =>{
              return b.LuotDanh  - a.LuotDanh;
            }) 
          }
          this.setState({squares: squaresImp,
            Player:PlayerNext,
            ImageTurn:TichToe,
            ListHistory: NewCheck,
            LuotDanh:LD,
          });
        }
        let check = CheckWingGame(this.state.squares,squaresImp[i],i)
        if(check != null){
          this.setState({
            IsFinish:true,
            ChooseHistory:check,
          })
          alert(squaresImp[i] + ' win ! ')
        }
        
       }
     
    }
    ClickHistory(id){
       const  historyL  = Checked(id,this.state.ListHistory.slice());
       for(let i =0;i<historyL.length;i=i+1){
              if( historyL[i].ViTri !== id){
                historyL[i].classname="list-group-item list-group-item-action mt-1"
              }else{
                historyL[i].classname="list-group-item list-group-item-action mt-1 active"
              }
       }
 
      let temp =  historyL.find(()=>(element)=>{
            if( element.ViTri === id){
              return element
            }})
          let Choose = historyL.filter((number)=>{
            return number.LuotDanh <= temp.LuotDanh
          })
          const square = Array(400).fill(null)
          Choose.forEach((item)=>{
            console.log(item)
              square[item.ViTri]= item.player
          })
            let PlayerNext = 'X'
            if (temp.player === 'X'){
              PlayerNext='Y'
            }
            console.log(temp.player)
            console.log(PlayerNext)
          this.setState({
            squares:square,
            Player:PlayerNext,
            LuotDanh:temp.LuotDanh,
            ImageTurn:temp.imagePlayer,
          })
    }
   
    render(){
     
      const matrixSize = 20; // Lấy kích cỡ của ma trận bằng props gửi từ Game qua
      const rows = Array(matrixSize).fill(null); // Tạo rows là một Array để tiện sử dụng hàm map()
      const cols = rows; // Ma trận vuông nên cols = rows
      const board = rows.map((row, i) => {
        const squares = cols.map((col, j) => {
          let squareKey = i * matrixSize + j;
          const Check1 ="squareCheck";
          const NonCheck ="square";
          let value = this.state.ChooseHistory.slice().find((element)=>{
            return element === squareKey
          })
            if(typeof value !=="undefined"){
              return <Square ClassSquare={Check1} keyInx={squareKey}  value={this.state.squares[squareKey]}
            onClick={() => this.handleClick(squareKey)}
            ></Square>; 
            }else{
              return <Square ClassSquare={NonCheck} keyInx={squareKey}  value={this.state.squares[squareKey]}
              onClick={() => this.handleClick(squareKey)}
              ></Square>; 
            }
        });
        return <div className="board-row" key={i}>{squares}</div> 
      });
      return(
        <div  class="container" >
        <h1 class="d-flex justify-content-center m-4">GAME CARO</h1>
       
        <div class="ContainerGame ">
          <div class="board">
            {board}
          </div>
          <div class="bg-dark Menu text-white" >
            <div class="d-flex justify-content-center m-1 p-1">
              <button class="btn btn-danger" onClick = {() => this.ClickNewGame()}>New game</button>
            </div>
                    <div class="d-flex justify-content-center p-2">
                    <h3 class=" mr-2 p-1">Player</h3>
                    </div>  
                    <div class="d-flex justify-content-center p-2">
                        <img  src={this.state.ImageTurn} alt="xxx"/> 
                    </div>        
                    <div class="d-flex justify-content-between">
                    <h4 class="m-1 ">Lịch sử đánh</h4> 
                    <select value={this.state.XapXep} onChange={this.HandleXapXep}>
                      <option value="tangdan" selected >Tăng dần</option>
                      <option value="giamdan">Giảm dần</option>
                    </select>
                    </div>                 
                     
                  <div class="History">
                  <div class="list-group m-1" >
                  {(this.state.ListHistory || []).map(item =>(
                       <button class={item.classname}  onClick={this.ClickHistory.bind(this,item.ViTri)} key={item.ViTri}>#{item.LuotDanh} Player {item.player}  [{parseInt(item.ViTri/20)+1},{ (item.ViTri - parseInt(item.ViTri/20)*20)+1}]</button>
                  ))}
                  
            
                </div>
                  </div>
                        
               
              </div>
          </div>
       
         
        </div>
      );
    }
  }
 class Square extends React.Component{
   render(){
     const value = this.props.value;
     const keyInx = this.props.keyIndex;
     return( 
        <button key={keyInx}  className={this.props.ClassSquare}  onClick={() => this.props.onClick()} >
         {value}
       </button> 
     );
   }
   
 }
  
ReactDOM.render(<Board/>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
