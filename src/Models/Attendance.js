const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the structure for the attendance document
const AttendanceSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
});

// Create and export the attendance model
const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
