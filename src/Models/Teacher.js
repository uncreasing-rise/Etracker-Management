const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for materials created by the teacher
const MaterialSchema = new Schema({
  materialId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: Date,
    required: true,
  },
});

// Define the schema for assignments created by the teacher
const AssignmentSchema = new Schema({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

// Define the schema for quizzes created by the teacher
const QuizSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeLimit: {
    type: Number,
    required: true,
  },
});

// Define the schema for the teacher document
const TeacherSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
  },
  createdClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
  ],
  materials: [MaterialSchema],
  assignments: [AssignmentSchema],
  quizzes: [QuizSchema],
});

// Create and export the teacher model
const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
