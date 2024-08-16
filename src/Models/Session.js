const mongoose = require('mongoose');
const { Schema } = mongoose;

const SessionSchema = new Schema(
  {
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    sessionName: { type: String, required: true },
    day: { type: String, required: true }, // E.g., ['Monday', 'Wednesday', 'Friday']
    startTime: { type: String, required: true }, // E.g., '08:00 AM'
    endTime: { type: String, required: true }, // E.g., '10:00 AM'
    instructor: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  },
  { timestamps: true }
);

const SessionModel = mongoose.model('Session', SessionSchema);
module.exports = SessionModel;
