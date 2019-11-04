import React,{useReducer} from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import Board from '../containers/board/Board';
import PlayOnline from '../PlayOnline/PlayOnline';


const Lobby  =  (props)=>{
  const [InputUser,SetUnputUser] = useReducer(
    (state,NewState) =>({...state, ...NewState}),
    {
      username:'',
      urlimage:'',
      IsFinding:true,
    }
  )

    const  {socket,user} = props;
        socket.on('connectToRoom', response => {
          console.log(response);
          const info = {
            username : user.username,
            urlimage : user.urlimage
          }
          socket.emit('send_infoUser',info);
     });
   socket.on('revice_infoUser', response => {
        console.log("send_infoUser = ",response);
        SetUnputUser(
          {
            username : response.username,
            urlimage :response.urlimage,
            IsFinding:false
          }
        )
        
    });
  return (
         
    <div>
             {InputUser.IsFinding 
            ? <div className="container jumbotron">
            <div className="d-flex  justify-content-center">
              <div className="d-block p-2">
              <div class="spinner-grow text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow text-secondary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow text-success" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow text-danger" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow text-info" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="spinner-grow text-dark" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              </div>
               </div>
            </div>
            :
            <PlayOnline playerDoiThu={InputUser} socket={socket}/>
             }
          </div>
      
  );
}
  
const mapStateToProps = state => ({
  user: state.user,
  socket:state.socket
});



export default connect(mapStateToProps,null)(Lobby);
// class Lobby extends Component {
//   constructor() {
//     super();
//     this.state = {
//       text: '',
//       IsFinding:true,
//     };
//     this.socket = null;
//   }

//   componentWillMount() {
//     this.socket = io('localhost:8080');
//     this.socket.on('connectToRoom', response => {
//       this.socket.emit("")
//       this.setState({
//         IsFinding: false,
//       });
//     });
//     this.socket.on('chat_2_clients', response => {
//       console.log('message ', response);
//       const mess = this.state.text + response;
//       this.setState({
//         text: response
//       });
//     });
//   }

//   handleSend = () => {
//     this.socket.emit('chat_message', 'Hello fuck you !!!!!!!!! ');
//   };

//   // sending sockets

//   render() {
//     // testing for socket connections
//     const { IsFinding,text } = this.state;
//     return (
//       <div>
//         {IsFinding 
//         ? <div className="container jumbotron">
//           <h3>{text}</h3>
//           <button className ="btn btn-info" onClick={this.handleSend}>Send Message</button>
//         <div className="d-flex  justify-content-center">
//           <div className="d-block p-2">
//           <div class="spinner-grow text-primary" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           <div class="spinner-grow text-secondary" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           <div class="spinner-grow text-success" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           <div class="spinner-grow text-danger" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           <div class="spinner-grow text-warning" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           <div class="spinner-grow text-info" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           <div class="spinner-grow text-light" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           <div class="spinner-grow text-dark" role="status">
//             <span class="sr-only">Loading...</span>
//           </div>
//           </div>
//            </div>
//         </div>
//         :
//         <Board/>
//          }
//       </div>
      

//     );
//   }
// }
// export default Lobby;
