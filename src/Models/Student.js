const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for assignment details
const AssignmentSchema = new Schema({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  submissionDate: { type: Date },
  grade: { type: Number },
  feedback: { type: String },
});

// Define the schema for quiz details
const QuizSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  attemptDate: { type: Date },
  score: { type: Number },
  answers: [{ type: String }],
});

// Define the schema for material access details
const MaterialAccessedSchema = new Schema({
  materialId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  accessDate: { type: Date },
});

// Define the schema for notifications
const NotificationSchema = new Schema({
  notificationId: {
    type: Schema.Types.ObjectId,
    ref: 'Notification',
  },
  date: { type: Date },
  message: { type: String },
  read: { type: Boolean },
});

// Define the schema for the student document
const StudentSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  enrolledClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
  ],
  assignments: [AssignmentSchema],
  quizzes: [QuizSchema],
  materialsAccessed: [MaterialAccessedSchema],
  notifications: [NotificationSchema],
});

// Create and export the student model
const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
