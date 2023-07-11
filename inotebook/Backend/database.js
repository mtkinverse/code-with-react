const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const ConnectToMongo = () => {

    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connection successfull");
    }).catch(() => {
        console.log("Cannot connect to the database");
    })

    mongoose.connection.on('error', (error) => {
        console.error('Connection error:', error);
    });
}

module.exports = ConnectToMongo;