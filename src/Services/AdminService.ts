import Admin, { IAdmin } from '../Models/Admin'

// Lấy tất cả quản trị viên
export const getAllAdminsService = async (): Promise<IAdmin[]> => {
  return Admin.find()
}

// Lấy quản trị viên theo ID
export const getAdminByIdService = async (
  userId: string
): Promise<IAdmin | null> => {
  return Admin.findOne({ userId })
}

// Tạo mới quản trị viên
export const createAdminService = async (
  data: Partial<IAdmin>
): Promise<IAdmin> => {
  const admin = new Admin(data)
  return admin.save()
}

// Cập nhật thông tin quản trị viên
export const updateAdminService = async (
  userId: string,
  data: Partial<IAdmin>
): Promise<IAdmin | null> => {
  return Admin.findOneAndUpdate({ userId }, data, { new: true })
}

// Xóa quản trị viên theo ID
export const deleteAdminService = async (
  userId: string
): Promise<IAdmin | null> => {
  return Admin.findOneAndDelete({ userId })
}
