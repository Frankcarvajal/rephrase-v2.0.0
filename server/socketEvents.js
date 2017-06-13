exports = module.exports = io => { 

    io.on('connection', function(socket) {

    console.log('a user established a connection');

        socket.on('new message', function(data) {
            console.log(data);
            io.sockets.in(data.roomId).emit('receive new message', data.msg);
            //   socket.broadcast.to(data.roomId)
            //       .emit('receive new message', data.msg);
        });

        /*
            The server will respond by "joining" the room, 
            which establishes a room-specific channel layered over 
            our socket connection.
        */

        socket.on('join room', function(data) {
            console.log('a user connected to '+ data.roomId);
            socket.join(data.roomId);
        });

        socket.on('leave room', function(data) {
            socket.leave(data.roomId);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}