import Teacher from '../Models/Teacher'
import { ITeacher } from '../Models/Teacher'

export const findTeacherByEmail = async (
  email: string
): Promise<ITeacher | null> => {
  return await Teacher.findOne({ email })
}

export const findTeacherById = async (
  userId: string
): Promise<ITeacher | null> => {
  return await Teacher.findOne({ userId })
}

export const createTeacher = async (
  teacherData: Partial<ITeacher>
): Promise<ITeacher> => {
  const teacher = new Teacher(teacherData)
  return await teacher.save()
}

export const updateTeacher = async (
  userId: string,
  updateData: Partial<ITeacher>
): Promise<ITeacher | null> => {
  return await Teacher.findOneAndUpdate({ userId }, updateData, { new: true })
}

export const deleteTeacher = async (
  userId: string
): Promise<ITeacher | null> => {
  return await Teacher.findOneAndDelete({ userId })
}
