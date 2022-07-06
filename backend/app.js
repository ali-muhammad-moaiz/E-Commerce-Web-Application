const express = require('express');
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

//Route Imports
const product = require('./routes/productRoutes.js');

app.use('/api/product/', product);



module.exports = app;
