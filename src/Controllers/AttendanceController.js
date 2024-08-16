const attendanceService = require('../Services/AttendanceService');
const {
  SuccessResponse,
  ErrorResponse,
} = require('../Interfaces/MessageResponse');
const {
  SUCCESS_CREATE,
  SUCCESS_UPDATE,
  ERROR_MISSING_FIELDS,
  ERROR_INVALID_DATE_FORMAT,
  ERROR_INTERNAL_SERVER,
} = require('../Constants/ResponseMessages');

class AttendanceController {
  // Create or update attendance records for a specific class and session
  async createOrUpdateAttendance(req, res) {
    try {
      const { classId, sessionId } = req.params;
      const attendanceRecords = req.body; // Expecting an array of records

      if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
        return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
      }

      // Validate each record
      for (const record of attendanceRecords) {
        const { studentId, status, date } = record;
        if (!studentId || !status || !date) {
          return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
        }

        // Ensure date is a valid Date object
        if (isNaN(new Date(date).getTime())) {
          return res
            .status(400)
            .json(new ErrorResponse(ERROR_INVALID_DATE_FORMAT));
        }
      }

      await attendanceService.createOrUpdateAttendance(
        classId,
        sessionId,
        attendanceRecords
      );
      return res.status(201).json(new SuccessResponse(SUCCESS_CREATE));
    } catch (err) {
      console.error('Error creating/updating attendance:', err);
      return res.status(500).json(new ErrorResponse(ERROR_INTERNAL_SERVER));
    }
  }

  // Update specific attendance records within a session
  async updateAttendance(req, res) {
    try {
      const { classId, sessionId } = req.params;
      const attendanceRecords = req.body; // Expecting an array of attendance records

      // Validate input
      if (
        !classId ||
        !sessionId ||
        !Array.isArray(attendanceRecords) ||
        attendanceRecords.length === 0
      ) {
        return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
      }

      // Validate each record
      for (const record of attendanceRecords) {
        const { studentId, status, date } = record;
        if (!studentId || !status) {
          return res.status(400).json(new ErrorResponse(ERROR_MISSING_FIELDS));
        }

        if (date) {
          const parsedDate = new Date(date);
          if (isNaN(parsedDate.getTime())) {
            return res
              .status(400)
              .json(new ErrorResponse(ERROR_INVALID_DATE_FORMAT));
          }
        }
      }

      await attendanceService.updateAttendance(
        classId,
        sessionId,
        attendanceRecords
      );
      return res.status(200).json(new SuccessResponse(SUCCESS_UPDATE));
    } catch (err) {
      console.error('Error updating attendance:', err.message);
      return res.status(500).json(new ErrorResponse(ERROR_INTERNAL_SERVER));
    }
  }

  // Get attendance records for a specific class and session
  async getAttendanceBySession(req, res) {
    try {
      const { classId, sessionId } = req.params;
      const attendance = await attendanceService.getAttendanceBySession(
        classId,
        sessionId
      );
      return res
        .status(200)
        .json(
          new SuccessResponse('Attendance retrieved successfully', attendance)
        );
    } catch (err) {
      console.error('Error getting attendance by session:', err);
      return res.status(500).json(new ErrorResponse(ERROR_INTERNAL_SERVER));
    }
  }

  // Get attendance records for a specific student in a specific class
  async getAttendanceByStudent(req, res) {
    try {
      const { studentId, classId } = req.params;
      const attendance = await attendanceService.getAttendanceByStudent(
        studentId,
        classId
      );
      return res
        .status(200)
        .json(
          new SuccessResponse('Attendance retrieved successfully', attendance)
        );
    } catch (err) {
      console.error('Error getting attendance by student:', err);
      return res.status(500).json(new ErrorResponse(ERROR_INTERNAL_SERVER));
    }
  }
}

module.exports = new AttendanceController();
