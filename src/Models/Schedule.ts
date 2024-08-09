import mongoose, { Schema, Document } from 'mongoose'

interface ISchedule extends Document {
  teacherId: string // ID của giáo viên
  courseId: string // ID của khóa học
  dayOfWeek: number // Ngày trong tuần (0-6, với 0 là Chủ nhật)
  startTime: Date // Thời gian bắt đầu
  endTime: Date // Thời gian kết thúc
}

const ScheduleSchema: Schema = new Schema({
  teacherId: { type: String, required: true },
  courseId: { type: String, required: true },
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
})

const Schedule = mongoose.model<ISchedule>('Schedule', ScheduleSchema)

export default Schedule
export { ISchedule }
