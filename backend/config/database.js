const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, {}).then( (data) => {
        console.log(`MongoDB connected with server at host ${data.connection.host}!`)}).catch( (err) => {
        console.log('Error occured while conecting MongoDB with host!'+ err); });
}

module.exports.connectDatabase = connectDatabase;