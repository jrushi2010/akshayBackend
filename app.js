const express = require('express');
const studentRouter = require('./routes/studentRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/students', studentRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
