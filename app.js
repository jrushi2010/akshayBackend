const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

const students = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data.json`)
);

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//apis
const getAllStudents = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: students.length,
        data: {
            students
        }
    });
}

const getStudent = (req, res) => {
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
}

const createStudent = (req, res) => {
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

const updateStudent = (req, res) => {

    const id = req.params.id * 1;

    if (id > students.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }

    res.status(200)
        .json({
            status: 'success',
            data: {
                student: '<updated students is here...>'
            }
        })
}

const deleteStudent = (req, res) => {

    const id = req.params.id * 1;

    if (id > students.length) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID'
        });
    }

    res.status(204)
        .json({
            status: 'success',
            data: null
        });
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const createUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};
const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    });
};






// app.get('/api/v1/students', getAllStudents);
// app.get('/api/v1/students/:id', getStudent);
// app.post('/api/v1/students', createStudent);
// app.patch('/api/v1/students/:id', updateStudent);
// app.delete('/api/v1/students/:id', deleteStudent);

//api routes
const studentRouter = express.Router();

const userRouter = express.Router();

studentRouter
    .route('/')
    .get(getAllStudents)
    .post(createStudent);

studentRouter
    .route('/:id')
    .get(getStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

userRouter.route('/')
    .get(getAllUsers)
    .post(createUsers)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

app.use('/api/v1/students', studentRouter);
app.use('/api/v1/users', userRouter);


app.listen(port, () => {
    console.log(`app running on port ${port}...`);
});