const { ChatRoom } = require('./models/chatRoom');

exports = module.exports = io => { 

    io.on('connection', function(socket) {

    console.log('a user established a connection');

        socket.on('new message', function(data) {
            console.log('hello from the new message event!');
            console.log('The newest of the messages to add');
            console.log(data.msgData.body);
            // io.sockets.in(data.roomId).emit('receive new message', data.msgData.body);
            // Push the new message onto the array for the chatroom (server-side)
            ChatRoom
                .findByIdAndUpdate(
                    data.roomId,
                    { $push: { messages: data.msgData } },
                    { safe: true, upsert: true, new: true }
                )
                .exec()
                .then(room => {
                    console.log('db success');
                    console.log(room.messages);
                })
                .catch(err => console.error(err));

            io.sockets.in(data.roomId).emit('receive new message', data.msgData.body);
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