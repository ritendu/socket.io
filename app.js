const express = require('express')
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server,{cors:{origin:"*"}});

const dotenv = require('dotenv');
dotenv.config({path:'./config/config.env'});
const connectDB = require('./config/db');
connectDB();
app.set('view engine','ejs')
app.get('/home',(req,res)=>{
res.render('home');
})
const PORT = process.env.PORT||5000;
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
io.on('connection',(socket)=>{
  console.log("User Connected"+socket.id);
  socket.on('message',(data)=>{
   socket.broadcast.emit('message',data)
  })
})