const express = require('express')
const app = express();
const path = require('path');
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
  socket.emit('message','Welcome to Chatcord!');
  socket.broadcast.emit('message','A user has joined the chat');
  socket.on('disconnect',()=>{
    io.emit('message','A user has left the chat')
  })
})
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
