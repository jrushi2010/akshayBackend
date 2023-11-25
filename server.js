const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
}).then(con => {
    //console.log(con.connections);
    console.log('DB connection successfull');
});


//console.log(process.env);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});