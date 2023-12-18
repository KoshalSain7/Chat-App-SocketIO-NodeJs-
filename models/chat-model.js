const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    users: Array,
    messages: String,
    roomId: String,
    admin: String,
    password: String,
    chatType: {
        type: String,
        enum: ['One-to-One', 'Group_Chat']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

const Chat = mongoose.model('chatschema', chatSchema);

module.exports = Chat;