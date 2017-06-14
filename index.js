const express = require('express');
const proxy = require('http-proxy-middleware');
const socketEvents = require('./server/socketEvents');
// const mongoose = require('mongoose');
const rp = require('request-promise-native');


const app = express();

if (process.env.NODE_ENV === 'production') {
    // Change the cwd to server to mimic running directly
    process.chdir('server');
    // Only require inside the if block so we don't run the server code twice
    // in development
    const runServer = require('./server').runServer;
    // Just run the server
    runServer(process.env.PORT || 8080);
}
else {
    // Proxy everything through to Create React App
    app.use(proxy('http://localhost:3000/', {
        logLevel: 'warn', // Keep the logs clean
        ws: true, // Proxy websockets too
        router: {
            // Anything to /api goes to our backend
            'localhost:8080/api': 'http://localhost:3001'
        }
    }));
    
    // require('dotenv').config(); // 

    const server = require('http').createServer(app);
    // mongoose.connect(process.env.DATABASE_URL, err => {
    //     if (err) {
    //         console.error(err)
    //     }
    
    server.listen(process.env.PORT || 8080);
    const io = require('socket.io')(server);
    socketEvents(io);
    // });
}
