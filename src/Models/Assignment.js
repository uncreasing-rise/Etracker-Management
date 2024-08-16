const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the structure for submissions related to the assignment
const SubmissionSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
  submissionDate: { type: Date, required: true },
  content: { type: String, required: true },
  grade: { type: Number },
  feedback: { type: String },
});

// Define the structure for the assignment document
const AssignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  dueDate: { type: Date, required: true },
  submissions: [SubmissionSchema],
  status: {
    type: String,
    enum: ['Pending', 'Submitted', 'Graded'],
    required: true,
  },
  createdDate: { type: Date, default: Date.now },
});

// Create and export the assignment model
const AssignmentModel = mongoose.model('Assignment', AssignmentSchema);

module.exports = AssignmentModel;
