import {
  findStudentByEmail,
  findStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
} from '../DALs/StudentDAL'
import { IStudent } from '../Models/Student'

export const getAllStudentsService = async (): Promise<IStudent[]> => {
  return await getAllStudents()
}

export const getStudentByIdService = async (
  userId: string
): Promise<IStudent | null> => {
  return await findStudentById(userId)
}

export const createStudentService = async (
  studentData: Partial<IStudent>
): Promise<IStudent> => {
  return await createStudent(studentData)
}

export const updateStudentService = async (
  userId: string,
  updateData: Partial<IStudent>
): Promise<IStudent | null> => {
  return await updateStudent(userId, updateData)
}

export const deleteStudentService = async (
  userId: string
): Promise<IStudent | null> => {
  return await deleteStudent(userId)
}
