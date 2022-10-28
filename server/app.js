const express = require('express');
const app = express();;
const server = require('http').createServer(app);
const io = require('socket.io')(server,{cors:{origin:"*"}});
io.on('connection',(socket)=>{
    console.log('Connected '+socket.id);
    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log(`User with ID:${socket.id} joined room:${data}`)
    })
    socket.on('send_message',(data)=>{
        
    })
})
server.listen(3001,()=>{
    console.log('App is running on port....')
})