import Teacher, { ITeacher } from '../Models/Teacher'

// Lấy tất cả giáo viên
export const getAllTeachersService = async (): Promise<ITeacher[]> => {
  return Teacher.find()
}

// Lấy giáo viên theo ID
export const getTeacherByIdService = async (
  userId: string
): Promise<ITeacher | null> => {
  return Teacher.findOne({ userId })
}

// Tạo mới giáo viên
export const createTeacherService = async (
  data: Partial<ITeacher>
): Promise<ITeacher> => {
  const teacher = new Teacher(data)
  return teacher.save()
}

// Cập nhật thông tin giáo viên
export const updateTeacherService = async (
  userId: string,
  data: Partial<ITeacher>
): Promise<ITeacher | null> => {
  return Teacher.findOneAndUpdate({ userId }, data, { new: true })
}

// Xóa giáo viên theo ID
export const deleteTeacherService = async (
  userId: string
): Promise<ITeacher | null> => {
  return Teacher.findOneAndDelete({ userId })
}
