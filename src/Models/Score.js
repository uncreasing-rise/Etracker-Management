const mongoose = require('mongoose');
const { Schema } = mongoose;

const ScoreSchema = new Schema(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    scoreType: {
      type: String,
      enum: ['quiz', 'inClassTest', 'assignment', 'exam'],
      required: true,
    },
    scoreName: { type: String, required: true }, // e.g., "Midterm Exam", "Quiz 1"
    score: { type: Number, required: true, min: 0, max: 100 }, // The actual score with range
    date: { type: Date, default: Date.now }, // Date of the test/quiz
    createdBy: { type: Schema.Types.ObjectId, ref: 'Admin' }, // Admin who created
    updatedBy: { type: Schema.Types.ObjectId, ref: 'Admin' }, // Admin who last updated
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    strictPopulate: false, // Allow population of non-schema fields
  }
);

// Indexes for better performance
ScoreSchema.index({ studentId: 1, classId: 1, date: 1 });
ScoreSchema.index({ scoreType: 1, date: -1 }); // Example index

// Static method example
ScoreSchema.statics.findByStudentAndClass = function (studentId, classId) {
  return this.find({ studentId, classId }).exec();
};

// Virtual field example
ScoreSchema.virtual('formattedDate').get(function () {
  return this.date.toDateString(); // Example virtual field
});

const ScoreModel = mongoose.model('Score', ScoreSchema);

module.exports = ScoreModel;
