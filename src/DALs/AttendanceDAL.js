const AttendanceModel = require('../Models/Attendance');

class AttendanceDAL {
  // Create or update attendance for a session and class
  async createOrUpdateAttendance(attendanceData) {
    const { classId, sessionId, attendanceRecords } = attendanceData;

    // Validate that the required fields are present
    if (
      !classId ||
      !sessionId ||
      !attendanceRecords ||
      !Array.isArray(attendanceRecords)
    ) {
      throw new Error(
        'Invalid data: classId, sessionId, and attendanceRecords are required.'
      );
    }

    // Prepare the attendance document data
    const attendanceDoc = {
      classId,
      sessionId,
      records: attendanceRecords.map((record) => {
        const { studentId, status, date } = record;
        if (!studentId || !status || !date) {
          throw new Error('Missing required fields in attendance record.');
        }

        return {
          studentId,
          status,
          date: new Date(date),
        };
      }),
    };

    // Upsert the attendance document (create if not exists, update if exists)
    const updatedAttendance = await AttendanceModel.findOneAndUpdate(
      { classId, sessionId },
      attendanceDoc,
      {
        upsert: true, // Create the document if it doesn't exist
        new: true, // Return the updated document
        runValidators: true, // Run validators on the update operation
      }
    );

    return {
      success: true,
      message: 'Attendance records created/updated successfully.',
      data: updatedAttendance,
    };
  }

  // Get attendance for a specific session and class
  async getAttendanceBySession(classId, sessionId) {
    const attendance = await AttendanceModel.findOne({
      classId,
      sessionId,
    }).populate({
      path: 'records.studentId',
      select: 'profile.fullName',
    });

    if (!attendance) {
      throw new Error('No attendance records found for this session.');
    }

    return attendance;
  }

  // Update specific attendance records for a session
  async updateAttendance(classId, sessionId, updatedRecords) {
    // Validate input parameters
    if (
      !classId ||
      !sessionId ||
      !Array.isArray(updatedRecords) ||
      updatedRecords.length === 0
    ) {
      throw new Error(
        'Invalid input: classId, sessionId, and non-empty updatedRecords are required.'
      );
    }

    // Fetch the existing attendance document
    const attendanceDoc = await AttendanceModel.findOne({
      classId,
      sessionId,
    });
    if (!attendanceDoc) {
      throw new Error('Attendance record not found.');
    }

    // Update the records
    for (const updatedRecord of updatedRecords) {
      const { studentId, status, date } = updatedRecord;
      if (!studentId || !status || !date) {
        throw new Error(
          'Missing required fields in updated attendance record.'
        );
      }

      const recordIndex = attendanceDoc.records.findIndex(
        (record) => record.studentId.toString() === studentId
      );
      if (recordIndex !== -1) {
        // Update existing record
        attendanceDoc.records[recordIndex].status = status;
        attendanceDoc.records[recordIndex].date = new Date(date);
      } else {
        // Add new record if not found
        attendanceDoc.records.push({
          studentId,
          status,
          date: new Date(date),
        });
      }
    }

    // Save the updated document
    const updatedAttendance = await attendanceDoc.save();

    return {
      success: true,
      message: 'Attendance record updated successfully.',
      data: updatedAttendance,
    };
  }

  // Get attendance for a specific student in a specific class
  async getAttendanceByStudent(studentId, classId) {
    return await AttendanceModel.find({
      classId,
      'records.studentId': studentId,
    }).populate({
      path: 'records.studentId',
      select: 'profile.fullName',
    });
  }
}

module.exports = new AttendanceDAL();
