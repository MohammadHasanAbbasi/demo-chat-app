const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http =require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('User connected');
    socket.emit('newMessage',"Welcome to chat room");

    socket.broadcast.emit('newMessage',{
      text:"New user joined"
    })

    socket.on('createMessage',function(message){
          console.log(message);
          io.emit('newMessage',{
             text: message.text,
              name:message.name,
              createdAt: new Date().getUTCDate()
          });
    });

    socket.on('disconnect',()=>{
      console.log("User disconnected.")

    });

  });


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
