const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    },
  ],
  assignments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Assignment',
    },
  ],
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
    },
  ],
  materials: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Material',
    },
  ],
  classDetails: {
    type: ClassDetailsSchema,
    required: true,
  },
});

// Create and export the class model
const ClassModel = mongoose.model('Class', ClassSchema);

module.exports = ClassModel;
