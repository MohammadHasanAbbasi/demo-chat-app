const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http =require('http');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var {generateMessage}= require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('User connected');
    socket.emit('newMessage',generateMessage('Admin',"Welcome to chat room"));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined.'));

    socket.on('createMessage',(message,callback)=>{
          console.log(message);
          io.emit('newMessage', generateMessage(message.name,message.text));
          
          callback('This is from the server');
        
        }
         
    );

    socket.on('disconnect',()=>{
      console.log("User disconnected.")

    });

  });


server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
