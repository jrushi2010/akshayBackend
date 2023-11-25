const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A student must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    fees: {
        type: Number,
        required: [true, 'A student must have a fees']
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;