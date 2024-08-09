import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IStudent extends Document {
  userId: string
  name: string
  email: string
  password: string
  phoneNumber?: string
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

// Mã hóa mật khẩu trước khi lưu
StudentSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10)
      // Kiểm tra và ép kiểu `this.password` nếu cần
      const hashedPassword = await bcrypt.hash(this.password as string, salt)
      this.password = hashedPassword
      next()
    } catch {
      // Handle the error if needed
    }
  } else {
    next()
  }
})

const Student = mongoose.model<IStudent>('Student', StudentSchema)

export default Student
export { IStudent }
