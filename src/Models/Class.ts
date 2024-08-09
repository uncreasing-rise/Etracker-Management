import mongoose, { Schema, Document } from 'mongoose'

interface IClass extends Document {
  className: string
  teacherId: string
  schedule: {
    dayOfWeek: string
    startTime: string
    endTime: string
  }
  students: string[] // Array of student IDs
}

const ClassSchema: Schema = new Schema({
  className: { type: String, required: true },
  teacherId: { type: String, required: true },
  schedule: {
    dayOfWeek: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  students: [{ type: String }],
})

const ClassModel = mongoose.model<IClass>('Class', ClassSchema)

export default ClassModel
export { IClass }
