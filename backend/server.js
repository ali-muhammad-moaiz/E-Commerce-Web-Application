const app = require('./app.js');
const express = require('./app.js');
const dotenv = require('dotenv');


dotenv.config({path:'backend/config/.env'});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
})