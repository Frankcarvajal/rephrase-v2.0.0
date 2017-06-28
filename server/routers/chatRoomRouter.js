const express = require('express');
const { ChatRoom } = require('../models/chatRoom');
const router = express.Router();
const jsonParser = require('body-parser').json();
const { passport } = require('../auth');


// this endpoint gets all the chatrooms that a user is a participant in
// array.indexOf to find if req.params.userId is in the participants array for each item in the rooms array
//build out new array with all of the chats and send to frontend.
router.get('/:userId', passport.authenticate('bearer', {session: false}), (req, res) => {
    return ChatRoom
        .find({
            participants: { $in: [req.params.userId] }
        })
        .populate('participants')
        .exec()
        .then(rooms => res.status(200).json(rooms))
        .catch(err => console.error(err))
});

router.get('/chatRoom/:chatRoomId', passport.authenticate('bearer', {session: false}), (req, res) => {
    return ChatRoom
        .findById(req.params.chatRoomId)
        .populate('participants')
        .populate('messages.createdBy')
        .exec()
        .then(room => res.status(200).json(room))
        .catch(err => console.error(err));
});

router.post('/', passport.authenticate('bearer', {session: false}), jsonParser, (req, res) => {
    // Use the $all operator to check if a chat room with incoming participants already exists
    // https://stackoverflow.com/questions/12027636/whats-difference-between-in-and-all-operators-in-mongoose
    const { participants } = req.body;
    return ChatRoom.create({
        participants,
        messages: []
    })
    .then(newChatRoom => {
        return ChatRoom.findById(newChatRoom._id).populate('participants');
    })
    .then(populatedRoom => {
        return res.status(200).json(populatedRoom);
    })
    .catch(err => console.error(err))
});

router.post('/chatRoom/:chatRoomId', jsonParser, (req, res) => {
    const { newMessage } = req.body;
    const { createdBy } = req.body;
    return ChatRoom
        .findByIdAndUpdate(
            req.params.chatRoomId,
            { $push: { messages: { createdBy, body: newMessage } } },
            { safe: true, upsert: true, new: true }
        )
        .populate('participants')
        .populate('messages.createdBy')
        .exec()
        .then(room => {
            // we get the updated room here
            // We see how many messages are on room.messages
            if (room.messages.length <= 12) {
                return res.status(200).json(room); 
            }
            room.messages.shift(); // remove first array item
            ChatRoom
                .findByIdAndUpdate(
                    req.params.chatRoomId,
                    { $set: { messages: room.messages } },
                    { safe: true, upsert: true, new: true }
                )
                .populate('participants')
                .populate('messages.createdBy')
                .exec()
                .then(updatedRoom => {
                    return res.status(200).json(updatedRoom); 
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
});

module.exports = { chatRoomRouter: router };
