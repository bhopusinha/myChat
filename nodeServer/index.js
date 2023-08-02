// node server which will handle socket io connection 
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');

app.use(cors());

const users = {};

io.on('connection', socket => {
   socket.on('new-user-joined', name => {
      console.log('new user', name);
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
   });

   socket.on('send', message => {
      socket.broadcast.emit('recieve', { message: message, name: users[socket.id] })
   });

   socket.on('disconnect', message => {
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
   });
})

const PORT = process.env.PORT || 8700;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
