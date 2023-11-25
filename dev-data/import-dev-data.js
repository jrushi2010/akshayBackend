const mongoose = require('mongoose');
const fs = require('fs');
const Student = require('./../models/studentModel');

const dotenv = require('dotenv');
const { Console } = require('console');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
}).then(con => {
    //console.log(con.connections);
    console.log('DB connection successfull');
});

//read json file

const student = JSON.parse(fs.readFileSync(`${__dirname}/data.json`, 'utf-8'));

//import data into db

const importData = async () => {
    try {
        await Student.create(student);
        console.log('DATA SUCCESSFULLY LOADED');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

//delete all data from db

const deleteData = async () => {
    try {
        await Student.deleteMany();
        console.log('DATA SUCCESSFULLY DELETED');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

// console.log(process.argv);