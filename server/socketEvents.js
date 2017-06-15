const requestPromise = require('request-promise-native');

let origin = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production') {
    origin = 'https://re-phrase.herokuapp.com';
}

exports = module.exports = io => { 

    io.on('connection', socket => {

    console.log('a user established a connection');

        socket.on('new message', data => {

            // Send API a request to add the incoming message to the db and then
            // emit a 'receive new message' event for the client with the new message
            // data.

            const options = {
                method: 'POST',
                uri: `${origin}/api/chat/chatRoom/${data.roomId}`,
                body: {
                    newMessage: data.msgData.body,
                    createdBy: data.msgData.createdBy
                },
                json: true // Automatically stringifies the body to JSON 
            };

            requestPromise(options)
                .then(updatedMessages => {
                    console.log('POST succeeded...'); 
                    io.sockets.in(data.roomId).emit('receive new message', updatedMessages);
                })
                .catch(err => console.error(err));
                
        });

        // If the server-side socket connection receives the 'join room event' defined
        // client-side, the server will respond by "joining" the room with .join method. 
        // This establishes a room-specific channel layered over our socket connection.

        socket.on('join room', data => {
            console.log('a user connected to '+ data.roomId);
            socket.join(data.roomId);
        });

        socket.on('leave room', data => {
            socket.leave(data.roomId);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

    });

}