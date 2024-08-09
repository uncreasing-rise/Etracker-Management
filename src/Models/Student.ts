import mongoose, { Schema, Document } from 'mongoose'
import User from './User'

interface IStudent extends Document {
  userId: string
  name: string
  email: string
  password: string
  phoneNumber: string
  userType: 'student'
  dateOfBirth?: Date
  gradeLevel: number
  enrolledCourses: string[]
}

const StudentSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  userType: { type: String, enum: ['student'], required: true },
  dateOfBirth: { type: Date },
  gradeLevel: { type: Number, required: true },
  enrolledCourses: { type: [String], required: true },
})

const Student = User.discriminator<IStudent>('Student', StudentSchema)

export default Student
export { IStudent }
