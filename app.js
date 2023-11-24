const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

const students = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`)
);

app.use(express.json());

app.get('/api/v1/students', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: students.length,
        data: {
            students
        }
    });
});

app.post('/api/v1/students', (req, res) => {
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
});

app.get('/api/v1/students/:id', (req, res) => {
    console.log(req.params);

    const id = req.params.id * 1;

    const student = students.find(el => el.id === id);

    // if (id > students.length) {
    if (!student) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }


    res.status(200).json({
        status: 'success',
        data: {
            student
        }
    });
});

app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});