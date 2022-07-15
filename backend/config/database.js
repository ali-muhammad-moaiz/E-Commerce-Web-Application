const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {}).then( (data) => {
        console.log(`MongoDB connected with server at host ${data.connection.host}!`)}).catch( (err) => {
        console.log(err); });
}

module.exports.connectDatabase = connectDatabase;