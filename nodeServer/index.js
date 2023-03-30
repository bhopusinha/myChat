const io= require('socket.io')(8000);

const users={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log('new-user',name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    })
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{massage:message,name: user[socket.id]})
    })
})

// console.log("hello")