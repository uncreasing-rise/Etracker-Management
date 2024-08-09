import { AttendanceDAL } from '../DALs/AttendanceDAL'

const attendanceDAL = new AttendanceDAL()

export const getAllAttendanceRecords = async () => {
  return attendanceDAL.findAll()
}

export const getAttendanceById = async (attendanceId: string) => {
  return attendanceDAL.findById(attendanceId)
}

export const getAttendanceByClassId = async (classId: string) => {
  return attendanceDAL.findByClassId(classId)
}

export const createAttendanceRecord = async (attendanceData: any) => {
  return attendanceDAL.create(attendanceData)
}

export const updateAttendanceRecord = async (
  attendanceId: string,
  updateData: any
) => {
  return attendanceDAL.update(attendanceId, updateData)
}

export const deleteAttendanceRecord = async (attendanceId: string) => {
  return attendanceDAL.delete(attendanceId)
}
