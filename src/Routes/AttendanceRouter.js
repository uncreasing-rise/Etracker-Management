const express = require('express');
const attendanceController = require('../Controllers/AttendanceController');

const router = express.Router();

// Get attendance records for a specific class and session
router.get(
  '/class/:classId/session/:sessionId/attendance',
  attendanceController.getAttendanceBySession
);

// Create or update attendance records for a specific class and session
router.post(
  '/class/:classId/session/:sessionId/attendance',
  attendanceController.createOrUpdateAttendance
);

// Update specific attendance records within a session
router.put(
  '/class/:classId/session/:sessionId/attendance',
  attendanceController.updateAttendance
);

// Get attendance records for a specific student in a specific class
router.get(
  '/student/:studentId/class/:classId/attendance',
  attendanceController.getAttendanceByStudent
);

module.exports = router;
