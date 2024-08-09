import mongoose, { Schema, Document } from 'mongoose'

interface IAttendance extends Document {
  studentId: string
  classId: string
  date: Date
  status: 'present' | 'absent' | 'late'
}

const AttendanceSchema: Schema = new Schema({
  studentId: { type: String, required: true },
  classId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['present', 'absent', 'late'], required: true },
})

const Attendance = mongoose.model<IAttendance>('Attendance', AttendanceSchema)

export default Attendance
export { IAttendance }
