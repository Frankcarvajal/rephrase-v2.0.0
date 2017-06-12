const express = require('express');
const { ChatRoom } = require('../models/chatRoom');
const router = express.Router();
const jsonParser = require('body-parser').json();

router.get('/:userId', (req, res) => {
    return ChatRoom
        .find()
        .exec()
        .then(rooms => {
            // array.indexOf to find if req.params.userId is in the participants array for each item in the rooms array
            //build out new array with all of the chats and send to frontend.
            console.log(rooms);
            console.log(req.params.userId);
            // loop thru this and find all chats that user participates in
            return res.status(200).json(rooms)
        })
        .catch(err => console.error('the error'))
})

router.post('/', jsonParser, (req, res) => {
    return ChatRoom.create({
        participants: req.body.participantsIds,
        messages: []
    })
    .then(newChatroom => {
        return res.status(200).json(newChatroom)
    })
    .catch(err => console.error('the error'))
})

module.exports = { chatRoomRouter: router };
