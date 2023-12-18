const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { Socket } = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const data = require('./routes/data');
const bodyParser = require('body-parser');

//Database
const DBconnection = require('./config/database');
DBconnection();


io.on('connection', (socket) => {

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        var data = msg;
    });

    socket.on('disconnect', () => {
        console.log(`Users Disconnected`);
    });
    socket.on('joinRoom', (data) => {
        socket.join(data);
    })
});

//Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(data);

http.listen(3434, () => {
    console.log("At 3434");
})