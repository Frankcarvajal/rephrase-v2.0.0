const express = require('express');
const { ChatRoom } = require('../models/chatRoom');
const router = express.Router();
const jsonParser = require('body-parser').json();

router.get('/', (req, res) => {
    return ChatRoom
        .find()
        .exec()
        .then(rooms => {
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
