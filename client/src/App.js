
import './App.css';
import io from 'socket.io-client'
import {useState} from 'react'
const socket = io('http://localhost:3001/');
function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState('');  
  const joinRoom = ()=>{
if(username!==0 && room!==""){
  socket.emit('join_room',room)
}
  }
  return (
    <div>
      <h3>Join Room</h3>
<input type="text" placeholder="John" onChange={(e)=>{setUsername(e.target.value)}}/>
<input type="text" placeholder="Room ID" onChange={(e)=>{setRoom(e.target.value)}}/>
<button onClick={joinRoom}>Join A Room</button>  
    </div>

);
}

export default App;
