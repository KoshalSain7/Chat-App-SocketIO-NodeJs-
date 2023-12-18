const otpGen = require('otp-generator');
const Chat = require('../models/chat-model.js');
const bcrypt = require('bcrypt');
exports.createRooms = async (req, res) => {
    try {
        res.render('home')
    } catch (error) {
        console.log("error in contro", error);
    }
}
exports.chat = async (req, res) => {
    try {
        const { roomType, userName, password } = req.body;
        const randomId = otpGen.generate(8, { specialChars: false, lowerCaseAlphabets: false, upperCaseAlphabets: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const chatCreation = await Chat.create({
            users: userName,
            admin: userName,
            password: hashedPassword,
            chatType: roomType,
            roomId: randomId
        });
        res.render('index', { roomId: chatCreation.roomId, userName: userName })
    } catch (error) {
        console.log("error in chat creation{POST}", error);
    }
}
exports.joinchat = async (req, res) => {
    try {
        const { roomId, password, userName } = req.body;
        //check if the room exists or not
        let isValidUser = await Chat.findOne({ roomId });

        if (!isValidUser) {
            return res.sendStatus(403).json({ message: "Invalid Room Id" })
        }
        const validPass = await bcrypt.compare(password, isValidUser.password);

        if (!validPass) {
            return res.status(401).json({ message: "Auth failed" });
        } else {
            if (isValidUser.users.length > 2 && isValidUser.chatType == 'One-to-One') {
                return res.json({
                    success: false,
                    message: "This Chat is Private Type Or Expired"
                })
            }
            const addUser = await Chat.findOneAndUpdate({ roomId: roomId }, { $push: { users: userName } })
            res.render('chat', { roomId: roomId, userName: userName });
        }
    } catch (error) {
        console.log("error in join chat", error);
    }

}