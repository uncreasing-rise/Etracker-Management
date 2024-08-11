const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for assignments related to the class
const ClassAssignmentSchema = new Schema({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
});

// Define the schema for quizzes related to the class
const ClassQuizSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  timeLimit: { type: Number, required: true },
});

// Define the schema for materials related to the class
const ClassMaterialSchema = new Schema({
  materialId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  uploadDate: { type: Date, required: true },
});

// Define the schema for class details
const ClassDetailsSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  classDuration: { type: Number, required: true },
  classFrequency: { type: String, required: true },
  classCapacity: { type: Number, required: true },
  status: { type: String, required: true },
});

// Define the schema for the class document
const ClassSchema = new Schema({
  className: { type: String, required: true },
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
  studentIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
  ],
  assignments: [ClassAssignmentSchema],
  quizzes: [ClassQuizSchema],
  materials: [ClassMaterialSchema],
  classDetails: {
    type: ClassDetailsSchema,
    required: true,
  },
});

// Create and export the class model
const ClassModel = mongoose.model('Class', ClassSchema);

module.exports;
