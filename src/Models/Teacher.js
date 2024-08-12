const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

// Define the schema for materials created by the teacher
const MaterialSchema = new Schema({
  materialId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  uploadDate: {
    type: Date,
    required: false,
  },
});

// Define the schema for assignments created by the teacher
const AssignmentSchema = new Schema({
  assignmentId: {
    type: Schema.Types.ObjectId,
    ref: 'Assignment',
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  dueDate: {
    type: Date,
    required: false,
  },
});

// Define the schema for quizzes created by the teacher
const QuizSchema = new Schema({
  quizId: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  timeLimit: {
    type: Number,
    required: false,
  },
});

// Define the schema for the teacher document
const TeacherSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure uniqueness
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'Teacher', // Set a default value
  },
  profile: {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure uniqueness
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
      required: false,
    },
  },
  createdClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: false,
    },
  ],
  materials: [MaterialSchema],
  assignments: [AssignmentSchema],
  quizzes: [QuizSchema],
});

// Middleware to hash password before saving
TeacherSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

// Create and export the teacher model
const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
