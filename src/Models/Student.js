const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

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
  read: { type: Boolean, default: false },
});

// Define the schema for the student document
const StudentSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'Student' },
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
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Password hashing middleware
StudentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password for login
StudentSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create and export the student model
const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
