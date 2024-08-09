import Attendance, { IAttendance } from '../Models/Attendance'

export class AttendanceDAL {
  public async findAll(): Promise<IAttendance[]> {
    return Attendance.find()
  }

  public async findById(attendanceId: string): Promise<IAttendance | null> {
    return Attendance.findById(attendanceId)
  }

  public async findByClassId(classId: string): Promise<IAttendance[]> {
    return Attendance.find({ classId })
  }

  public async create(attendanceData: any): Promise<IAttendance> {
    const attendance = new Attendance(attendanceData)
    return attendance.save()
  }

  public async update(
    attendanceId: string,
    updateData: any
  ): Promise<IAttendance | null> {
    return Attendance.findByIdAndUpdate(attendanceId, updateData, { new: true })
  }

  public async delete(attendanceId: string): Promise<IAttendance | null> {
    return Attendance.findByIdAndDelete(attendanceId)
  }
}
