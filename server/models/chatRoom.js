const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const chatRoomSchema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now },
	messages: [{
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
        body: { type: String, required: true } 
    }]
});

//createdBy: { type: String, required: true },

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = { ChatRoom };