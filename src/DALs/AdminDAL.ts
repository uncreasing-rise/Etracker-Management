import Admin from '../Models/Admin'
import { IAdmin } from '../Models/Admin'

export const findAdminByEmail = async (
  email: string
): Promise<IAdmin | null> => {
  return await Admin.findOne({ email })
}

export const findAdminById = async (userId: string): Promise<IAdmin | null> => {
  return await Admin.findOne({ userId })
}

export const createAdmin = async (
  adminData: Partial<IAdmin>
): Promise<IAdmin> => {
  const admin = new Admin(adminData)
  return await admin.save()
}

export const updateAdmin = async (
  userId: string,
  updateData: Partial<IAdmin>
): Promise<IAdmin | null> => {
  return await Admin.findOneAndUpdate({ userId }, updateData, { new: true })
}

export const deleteAdmin = async (userId: string): Promise<IAdmin | null> => {
  return await Admin.findOneAndDelete({ userId })
}
