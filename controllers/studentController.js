const express = require('express');
const fs = require('fs');

const students = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data.json`)
);

exports.checkID = (req, res, next, val) => {

    console.log(`Student id is : ${val}`);

    const id = req.params.id * 1;

    if (id > students.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }

    next();
}

exports.checkBody = (req, res, next) => {
    if (!req.body.studentFirstName || req.body.TotalFees) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or fees'
        })
    }

    next();
}

//apis
exports.getAllStudents = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: students.length,
        data: {
            students
        }
    });
}

exports.getStudent = (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;

    const student = students.find(el => el.id === id);

    res.status(200).json({
        status: 'success',
        data: {
            student
        }
    });
}

exports.createStudent = (req, res) => {
    //console.log(req.body);
    const newId = students[students.length - 1].id + 1;

    const newStudent = Object.assign({ id: newId }, req.body);

    students.push(newStudent);

    fs.writeFile(`${__dirname}/dev-data/data.json`, JSON.stringify(students), err => {
        res.status(201)
            .json({
                status: 'success',
                data: {
                    student: newStudent
                }
            })
    })
}

exports.updateStudent = (req, res) => {

    res.status(200)
        .json({
            status: 'success',
            data: {
                student: '<updated students is here...>'
            }
        })
}

exports.deleteStudent = (req, res) => {

    res.status(204)
        .json({
            status: 'success',
            data: null
        });
}
