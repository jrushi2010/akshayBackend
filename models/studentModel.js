const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentRollNo: {
        type: Number,
        unique: true,
        required: [true, 'A student must have a ROLL NO'],
    },
    studentFirstName: {
        type: String,
        required: [true, 'A student must have a first name'],
        trim: true
    },
    studentLastName: {
        type: String,
        required: [true, 'A student must have a last name'],
        trim: true

    },
    parentName: {
        type: String,
        required: [true, 'A student must have a parent name'],
        trim: true

    },
    MothersName: {
        type: String,
        required: [true, 'A student must have a mothers name'],
        trim: true
    },
    schoolName: {
        type: String,
        required: [true, 'A student must have a school name'],
        trim: true
    },
    gender: {
        type: String,
        required: [true, 'A student must have a gender'],
    },
    image: {
        type: String,
        required: [true, 'A student must have a image'],
    },
    sign: {
        type: String,
        required: [true, 'A student must have a sign'],
    },
    address: {
        type: String,
        required: [true, 'A student must have a address'],
        trim: true

    },
    mobileNo: {
        type: Number,
        required: [true, 'A student must have a mobileNo'],
    },
    parentMobileNo: {
        type: Number,
        required: [true, 'A student must have a parent mobileNo'],
    },
    addharNo: {
        type: Number,
        required: [true, 'A student must have a Adhar no'],
        unique: true
    },
    isHandicaped: {
        type: Boolean,
        required: [true, 'A student must have a handicap status'],
    },
    HandicapIn: {
        type: String,
        required: [true, 'A student must have a handicap description'],
    },
    education: {
        type: String,
        required: [true, 'A student must have a education'],
    },
    selectedCourse: {
        type: [String],
    },
    isAdmitted: {
        type: Boolean,
        required: [true, 'A student must have a admission confirmation status'],
    },
    TotalFees: {
        type: Number,
        required: [true, 'A student must have a Total Fees']
    },
    feesWhileAdmission: {
        type: Number,
        required: [true, 'A student must have a Fees while admission']
    },
    discount: {
        type: Number,
        default: 0,
    },
    isFeesCompleted: {
        type: Boolean,
        required: [true, 'A student must have a Fees completed status']
    },
    courseStartDate: {
        type: Date
    },
    admissionDate: {
        type: Date,
        default: Date.now(),
    },
    inquiryDate: {
        type: Date,
        default: Date.now(),
    },
    inquiryFollowup: {
        type: [Date],
    },
    Status: {
        type: String,
        default: 'Inquiry',
        required: [true, 'A student must have a Current status']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;