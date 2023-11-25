const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(con => {
    //console.log(con.connections);
    console.log('DB connection successfull');
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A student must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    fees: {
        type: Number,
        required: [true, 'A student must have a fees']
    }
});

const Student = mongoose.model('Student', studentSchema);

const testStudent = new Student({
    name: 'Rohit patil',
    rating: 4.7,
    fees: 497
});

testStudent.save().then(doc => {
    console.log(doc);
}).catch(err => {
    console.log('error : ', err)
})

//console.log(process.env);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});