require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;

const { passport } = require('./auth');
const { User } = require('./models/user');

// require the routers
const { translateRouter } = require('./routers/translateRouter');
const { authRouter } = require('./routers/authRouter');

// OAuth, set up passport middleware
app.use(passport.initialize());

// pass API routers to app
app.use('/api/auth', authRouter);
app.use('/api/translate', translateRouter);

// Get the current user if they are authenticated w/ token
app.get('/api/me', passport.authenticate('bearer', {session: false}), 
    (req, res) => {
        return res.json({
            googleId: req.user.googleId,
            displayName: req.user.displayName
        });
});

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        return mongoose.connect(process.env.DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            console.log('Database connected');        
            server = app.listen(port, () => {
                return resolve();
            }).on('error', reject);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
