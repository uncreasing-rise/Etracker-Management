import Student from '../Models/Student'
import { IStudent } from '../Models/Student'

export const findStudentByEmail = async (
  email: string
): Promise<IStudent | null> => {
  return await Student.findOne({ email })
}

export const findStudentById = async (
  userId: string
): Promise<IStudent | null> => {
  return await Student.findOne({ userId })
}

export const createStudent = async (
  studentData: Partial<IStudent>
): Promise<IStudent> => {
  const student = new Student(studentData)
  return await student.save()
}

export const updateStudent = async (
  userId: string,
  updateData: Partial<IStudent>
): Promise<IStudent | null> => {
  return await Student.findOneAndUpdate({ userId }, updateData, { new: true })
}

export const deleteStudent = async (
  userId: string
): Promise<IStudent | null> => {
  return await Student.findOneAndDelete({ userId })
}

export const getAllStudents = async (): Promise<IStudent[]> => {
  return await Student.find()
}
