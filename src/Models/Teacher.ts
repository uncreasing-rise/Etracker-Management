import mongoose, { Schema, Document } from 'mongoose'
import User from './User'

interface ITeacher extends Document {
  userId: string
  name: string
  email: string
  password: string
  phoneNumber: string
  userType: 'teacher'
  dateOfBirth?: Date
  subjects: string[]
  yearsOfExperience: number
}

const TeacherSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  userType: { type: String, enum: ['teacher'], required: true },
  dateOfBirth: { type: Date },
  subjects: { type: [String], required: true },
  yearsOfExperience: { type: Number, required: true },
})

const Teacher = User.discriminator<ITeacher>('Teacher', TeacherSchema)

export default Teacher
export { ITeacher }
