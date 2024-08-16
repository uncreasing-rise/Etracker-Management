const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttendanceRecordSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Excused'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v instanceof Date && !isNaN(v);
        },
        message: (props) => `${props.value} is not a valid date!`,
      },
    },
  },
  {
    _id: false, // Disables creation of _id for subdocuments
  }
);

const AttendanceSchema = new Schema(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: true,
    },
    records: {
      type: [AttendanceRecordSchema],
      required: true,
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: () => `Attendance records should not be empty!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for performance optimization
AttendanceSchema.index({ classId: 1, sessionId: 1 });
AttendanceSchema.index({ 'records.studentId': 1, classId: 1 });

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;
