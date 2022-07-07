const app = require('./app.js');
const express = require('./app.js');
const dotenv = require('dotenv');
const {connectDatabase} = require('./config/database.js');

// Config
dotenv.config({path:'backend/config/.env'});

connectDatabase();


app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})