require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const jsonParser = require('body-parser').json();

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketEvents = require('./socketEvents');

mongoose.Promise = global.Promise;

const { passport } = require('./auth');
const { User } = require('./models/user');

// Set up the socket.io events
socketEvents(io);

// require the routers
const { translateRouter } = require('./routers/translateRouter');
const { authRouter } = require('./routers/authRouter');
const { chatRoomRouter } = require('./routers/chatRoomRouter');

// OAuth, set up passport middleware
app.use(passport.initialize());

// pass API routers to app
app.use('/api/auth', authRouter);
app.use('/api/translate', translateRouter);
app.use('/api/chat', chatRoomRouter);

// Get the current user if they are authenticated w/ token
app.get('/api/me', passport.authenticate('bearer', {session: false}), 
    (req, res) => {
        return res.json({
            googleId: req.user.googleId,
            displayName: req.user.displayName,
            id: req.user._id,
            defaultLanguage: req.user.defaultLanguage
        });
});

app.get('/api/users', (req, res) => {
    return User
        .find()
        .exec()
        .then(users => { 
            // Need to update this so sensitive data is not sent to client
            return res.status(200).json(users); 
        })
        .catch(err => console.error(err));
})

app.put('/api/me', passport.authenticate('bearer', {session: false}), jsonParser,  (req, res) => {
    return User.findByIdAndUpdate(
            req.user._id, 
            { $set: { defaultLanguage: req.body.defaultLanguage}}, 
            {upsert: true, new: true}
        ) 
        .then(user => {
            const _user = user.apiRepr();
            return res.status(200).json(_user);
        })
        .catch(err => console.error(err));    
})

// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

function runServer(port=3001) {
    return new Promise((resolve, reject) => {
        return mongoose.connect(process.env.DATABASE_URL, err => {
            if (err) {
                return reject(err);
            }
            console.log('Database connected');        
            return server.listen(port, () => {
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
