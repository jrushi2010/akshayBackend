const express = require('express');
const fs = require('fs');
const Student = require('./../models/studentModel');
const APIFeatures = require('./../utils/apiFeatures');


exports.TopStudents = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-selectedCourse,TotalFees';
    req.query.fields = 'studentRollNo,selectedCourse,TotalFees,discount,studentFirstName,studentLastName'
    next();
};


//apis
exports.getAllStudents = async (req, res) => {
    try {
        //EXECUTE QUERY
        const features = new APIFeatures(Student.find(), req.query)
            .filter()
            .sort()
            .limit()
            .paginate();
        const students = await features.query;

        //SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: students.length,
            data: {
                students
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

}

exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                student
            }
        });

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }
}

exports.createStudent = async (req, res) => {

    try {
        const newStudent = await Student.create(req.body);

        res.status(201)
            .json({
                status: 'success',
                data: {
                    student: newStudent
                }
            })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

}

exports.updateStudent = async (req, res) => {
    try {

        const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200)
            .json({
                status: 'success',
                data: {
                    student
                }
            })
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

}

exports.deleteStudent = async (req, res) => {
    try {

        await Student.findByIdAndDelete(req.params.id);

        res.status(204)
            .json({
                status: 'success',
                data: null
            });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err
        })
    }

}
