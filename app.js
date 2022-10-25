const express = require('express')
const app = express();
const path = require('path');
const formatMessage = require('./utils/message');
const {userJoin,getCurrentUser} = require('./utils/users'); 
app.use(express.static(path.join(__dirname,'public')));
const server = require('http').createServer(app);

const io = require('socket.io')(server,{cors:{origin:"*"}});

const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT||5000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
io.on('connection',(socket)=>{
  console.log('New Connection'+socket.id);
  
  socket.on('joinRoom',({username,room})=>{
    const user = userJoin(socket.id,username,room);
    socket.join(user.room);
    socket.emit('message',formatMessage('ChatCord Bot','Welcome to Chatcord!'));
    socket.broadcast.to(user.room).emit('message',formatMessage('ChatCord Bot',`${user.username} has joined the chat`));

  })
  socket.on('disconnect',()=>{
    io.emit('message',formatMessage('ChatCord Bot','A user has left the chat'))
  })
  socket.on('chatMessage',(msg)=>{
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message',formatMessage(user.username,msg))

  })
})
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
