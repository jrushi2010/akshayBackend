const express = require('express');
const fs = require('fs');
const Student = require('./../models/studentModel');


exports.TopStudents = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-selectedCourse,TotalFees';
    req.query.fields = 'studentRollNo,selectedCourse,TotalFees,discount,studentFirstName,studentLastName'
    next();
}

//apis
exports.getAllStudents = async (req, res) => {
    try {
        //console.log(req.query, queryObj)

        //BUILD QUERY
        //filtering
        const queryObj = { ...req.query };

        const excludedFields = ['page', 'sort', 'limit', 'fields'];

        excludedFields.forEach(el => delete queryObj[el]);

        //advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b{gte|gt|lt|lte}\b/g, (match) => `$${match}`);
        console.log(JSON.parse(queryStr));

        let query = Student.find(JSON.parse(queryStr));

        //sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join * (' ');
            console.log(sortBy)
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        //field limiting
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //pagination

        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        //page=2&limit=10, 1-10 on page 1 and 11-20 on page 2 and 21-30on page 3
        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numStudents = await Student.countDocuments();
            if (skip > numStudents) throw new Error('This page is does not exist');
        }

        //EXECUTE QUERY
        const students = await query;

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
