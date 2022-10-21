const path = require('path');
const fs = require('fs');
const https = require('https')
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/message');
const {userJoin, getCurrentUser} = require('./utils/users');

const app = express();

const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
  }, app);

  const io = socketio(server);
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//run when client connects
const serverbot = 'serverbot';
io.on('connection', socket=>{
    console.log('new connection...');

    socket.on('joinRoom', ({username, room})=>{

      const user = userJoin(socket.id, username, room);

      socket.emit('message', formatMessage(serverbot, 'Welcome. This is a message from server.'));

       //Broadcast when user connects
      socket.broadcast.emit('message', formatMessage(serverbot, 'A user joined the chat '));


    });


    
   
    //Listen for chat messages
    socket.on('chatMessage', (message)=>{
      console.log(message);
      //Broadcast to all connecteds users
      io.emit('message', formatMessage('USER', message));
    });
    
    //Run at disconnect time
    socket.on('disconnect', ()=>{
      io.emit('message', formatMessage(serverbot, 'A user as left the chat '));
    });

});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=>console.log(`server up and running at port ${PORT}`));
