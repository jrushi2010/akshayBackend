const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

const students = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`)
);

app.get('/api/v1/students', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: students.length,
        data: {
            students
        }
    });
});

app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});