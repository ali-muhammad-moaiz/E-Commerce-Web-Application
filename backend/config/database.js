const mongoose = require('mongoose');

const connectDatabase = () => {
    if(process.env.PRODUCTION == "YES"){
        mongoose.connect(process.env.TEST_URI, {}).then( (data) => {
            console.log(`MongoDB connected with server at ${data.connection.host}!`)}).catch( (err) => {
            console.log(err); });
    }else{
        mongoose.connect(process.env.DEPLOYMENT_URI, {}).then( (data) => {
            console.log(`MongoDB connected with server at ${data.connection.host}!`)}).catch( (err) => {
            console.log(err); });
    }
}

module.exports.connectDatabase = connectDatabase;
