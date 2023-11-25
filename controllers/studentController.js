const express = require('express');
const fs = require('fs');
const Student = require('./../models/studentModel');

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
