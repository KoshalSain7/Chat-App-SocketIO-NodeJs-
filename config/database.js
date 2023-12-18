const mongoose = require('mongoose');

const DBconnection = function db() {
    mongoose.connect('mongodb://localhost:27017').then(() => {
        console.log("DB Connected");
    }).catch((e) => {
        console.log('Error in DB Connection', e);
    });
}
module.exports = DBconnection;