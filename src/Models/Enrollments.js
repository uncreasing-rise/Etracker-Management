const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for the enrollment document
const EnrollmentSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  enrollmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create and export the enrollment model
const EnrollmentModel = mongoose.model('Enrollment', EnrollmentSchema);

module.exports = EnrollmentModel;
