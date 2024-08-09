import mongoose, { Schema, Document } from 'mongoose'

interface IAdmin extends Document {
  userId: string
  name: string
  email: string
  password: string
  phoneNumber?: string
  userType: 'admin'
  dateOfBirth?: Date
  permissions: string[]
}

const AdminSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  userType: { type: String, enum: ['admin'], required: true },
  dateOfBirth: { type: Date },
  permissions: { type: [String], required: true },
})

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema)

export default Admin
export { IAdmin }
