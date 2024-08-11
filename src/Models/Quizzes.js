const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for quiz questions
const QuestionSchema = new Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  score: { type: Number, required: true },
});

// Define the schema for attempts related to the quiz
const AttemptSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  attemptDate: {
    type: Date,
    required: true,
  },
  answers: [
    {
      type: String,
      required: true,
    },
  ],
  score: {
    type: Number,
    required: true,
  },
});

// Define the schema for the quiz document
const QuizSchema = new Schema({
  title: { type: String, required: true },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  questions: [QuestionSchema],
  timeLimit: { type: Number, required: true },
  attempts: [AttemptSchema],
  createdDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

// Create and export the quiz model
const QuizModel = mongoose.model('Quiz', QuizSchema);

module.exports = QuizModel;
