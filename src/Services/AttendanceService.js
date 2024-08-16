const attendanceDal = require('../DALs/AttendanceDAL');

class AttendanceService {
  // Create or update attendance records for a specific class and session
  async createOrUpdateAttendance(classId, sessionId, attendanceRecords) {
    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      throw new Error('Invalid attendance records format or empty records.');
    }

    // Validate each record
    for (const record of attendanceRecords) {
      const { studentId, status, date } = record;
      if (!studentId || !status || !date) {
        throw new Error('Missing required fields in attendance records.');
      }

      // Ensure date is a valid Date object
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format.');
      }
    }

    try {
      // Create or update attendance records in the DAL
      return await attendanceDal.createOrUpdateAttendance({
        classId,
        sessionId,
        attendanceRecords,
      });
    } catch (err) {
      console.error('Error creating/updating attendance:', err.message);
      throw new Error('Failed to create/update attendance records.');
    }
  }

  // Update specific attendance records within a session
  async updateAttendance(classId, sessionId, updatedRecords) {
    if (!Array.isArray(updatedRecords) || updatedRecords.length === 0) {
      throw new Error('Invalid update records format or empty records.');
    }

    // Validate each record
    for (const record of updatedRecords) {
      const { studentId, status, date } = record;
      if (!studentId || !status) {
        throw new Error('Missing required fields in attendance records.');
      }
      if (date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
          throw new Error('Invalid date format.');
        }
      }
    }

    try {
      // Update the attendance records in the DAL
      return await attendanceDal.updateAttendance(
        classId,
        sessionId,
        updatedRecords
      );
    } catch (err) {
      console.error('Error updating attendance:', err.message);
      throw new Error('Failed to update attendance records.');
    }
  }

  // Get attendance records for a specific class and session
  async getAttendanceBySession(classId, sessionId) {
    try {
      return await attendanceDal.getAttendanceBySession(classId, sessionId);
    } catch (err) {
      console.error('Error fetching attendance by session:', err.message);
      throw new Error('Failed to fetch attendance records by session.');
    }
  }

  // Get attendance records for a specific student in a specific class
  async getAttendanceByStudent(studentId, classId) {
    if (!studentId || !classId) {
      throw new Error('Student ID and class ID are required.');
    }

    try {
      return await attendanceDal.getAttendanceByStudent(studentId, classId);
    } catch (err) {
      console.error('Error fetching attendance by student:', err.message);
      throw new Error('Failed to fetch attendance records by student.');
    }
  }
}

module.exports = new AttendanceService();
