import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  userId: string
  name: string
  email: string
  password: string // Mã hóa
  phoneNumber: string
  userType: 'admin' | 'teacher' | 'student' // Phân quyền
  dateOfBirth?: Date
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  userType: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    required: true,
  },
  dateOfBirth: { type: Date },
})

const User = mongoose.model<IUser>('User', UserSchema)

export default User
export { IUser }
